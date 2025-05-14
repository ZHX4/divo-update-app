import { supabase } from './supabase';

/**
 * This file helps set up the Supabase database structure for the Divo application
 * Run this setup when starting with a fresh Supabase project
 */

export async function setupSupabaseDatabase() {
  let results = {
    success: false,
    errors: [],
    created: []
  };

  try {
    const { data: profilesExists, error: profilesCheckError } = await supabase
      .from('profiles')
      .select('count()', { count: 'exact', head: true });

    if (profilesCheckError && profilesCheckError.code === '42P01') {
      results.created.push('Creating profiles table');
      const { error: createProfilesError } = await supabase.rpc('create_profiles_table', {});
      
      if (createProfilesError) {
        results.errors.push(`Failed to create profiles table: ${createProfilesError.message}`);
      } else {
        results.created.push('Created profiles table successfully');
      }
    }

    const { data: appointmentsExists, error: appointmentsCheckError } = await supabase
      .from('appointments')
      .select('count()', { count: 'exact', head: true });

    if (appointmentsCheckError && appointmentsCheckError.code === '42P01') {
      results.created.push('Creating appointments table');
      const { error: createAppointmentsError } = await supabase.rpc('create_appointments_table', {});
      
      if (createAppointmentsError) {
        results.errors.push(`Failed to create appointments table: ${createAppointmentsError.message}`);
      } else {
        results.created.push('Created appointments table successfully');
      }
    }

    const { data: storageData, error: storageError } = await supabase
      .storage
      .listBuckets();

    const avatarBucketExists = storageData?.some(bucket => bucket.name === 'avatars');
    if (!avatarBucketExists) {
      results.created.push('Creating avatars storage bucket');
      const { error: createBucketError } = await supabase
        .storage
        .createBucket('avatars', {
          public: true,
          fileSizeLimit: 1024 * 1024 * 2,
          allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif']
        });
        
      if (createBucketError) {
        results.errors.push(`Failed to create avatars bucket: ${createBucketError.message}`);
      } else {
        results.created.push('Created avatars bucket successfully');
      }
    }



    results.success = results.errors.length === 0;
    return results;
  } catch (error) {
    results.errors.push(`Setup error: ${error.message}`);
    results.success = false;
    return results;
  }
}

/**
 * Use this function to create stored procedures in your Supabase database
 * These will be used for complex operations and table creation
 */
export async function setupDatabaseProcedures() {
  try {
    const createProfilesTableSQL = `
    CREATE OR REPLACE FUNCTION create_profiles_table()
    RETURNS void AS $$
    BEGIN
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        full_name TEXT,
        avatar_url TEXT,
        role TEXT CHECK (role IN ('admin', 'doctor', 'patient')),
        specialty TEXT,
        bio TEXT,
        phone TEXT,
        address TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', now()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', now())
      );

      -- Create a trigger to update the updated_at column
      CREATE OR REPLACE FUNCTION update_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = TIMEZONE('utc', now());
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
      
      CREATE TRIGGER update_profiles_updated_at
      BEFORE UPDATE ON profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
      
      -- Set up Row Level Security (RLS)
      ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
      
      -- Create policies
      CREATE POLICY "Users can view their own profile"
      ON profiles FOR SELECT
      USING (auth.uid() = id);
      
      CREATE POLICY "Users can update their own profile"
      ON profiles FOR UPDATE
      USING (auth.uid() = id);
      
      CREATE POLICY "Admin can view all profiles"
      ON profiles FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM profiles
          WHERE id = auth.uid() AND role = 'admin'
        )
      );
    END;
    $$ LANGUAGE plpgsql;
    `;

    const createAppointmentsTableSQL = `
    CREATE OR REPLACE FUNCTION create_appointments_table()
    RETURNS void AS $$
    BEGIN
      CREATE TABLE IF NOT EXISTS appointments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
        doctor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        time_slot TEXT NOT NULL,
        status TEXT CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show', 'rescheduled')) DEFAULT 'scheduled',
        reason TEXT,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', now()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', now())
      );

      -- Create index for faster queries
      CREATE INDEX IF NOT EXISTS appointments_patient_id_idx ON appointments (patient_id);
      CREATE INDEX IF NOT EXISTS appointments_doctor_id_idx ON appointments (doctor_id);
      CREATE INDEX IF NOT EXISTS appointments_date_idx ON appointments (date);
      CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments (status);
      
      -- Apply the same updated_at trigger
      DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
      
      CREATE TRIGGER update_appointments_updated_at
      BEFORE UPDATE ON appointments
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at();
      
      -- Set up Row Level Security (RLS)
      ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
      
      -- Create policies
      CREATE POLICY "Patients can view their own appointments"
      ON appointments FOR SELECT
      USING (auth.uid() = patient_id);
      
      CREATE POLICY "Doctors can view their assigned appointments"
      ON appointments FOR SELECT
      USING (auth.uid() = doctor_id);
      
      CREATE POLICY "Patients can update their own appointments"
      ON appointments FOR UPDATE
      USING (auth.uid() = patient_id);
      
      CREATE POLICY "Doctors can update their assigned appointments"
      ON appointments FOR UPDATE
      USING (auth.uid() = doctor_id);
      
      CREATE POLICY "Admin can view all appointments"
      ON appointments FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM profiles
          WHERE id = auth.uid() AND role = 'admin'
        )
      );
      
      CREATE POLICY "Admin can update all appointments"
      ON appointments FOR UPDATE
      USING (
        EXISTS (
          SELECT 1 FROM profiles
          WHERE id = auth.uid() AND role = 'admin'
        )
      );
    END;
    $$ LANGUAGE plpgsql;
    `;

    const { error: createProfilesProcError } = await supabase.rpc('exec_sql', { sql: createProfilesTableSQL });
    const { error: createAppointmentsProcError } = await supabase.rpc('exec_sql', { sql: createAppointmentsTableSQL });

    if (createProfilesProcError) {
      console.error("Failed to create profiles procedure:", createProfilesProcError);
      return { success: false, error: createProfilesProcError.message };
    }

    if (createAppointmentsProcError) {
      console.error("Failed to create appointments procedure:", createAppointmentsProcError);
      return { success: false, error: createAppointmentsProcError.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to set up database procedures:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Create a helper function to run raw SQL in Supabase via a stored procedure
 * This will need to be run first in the SQL editor in Supabase
 */
export async function createExecSQLFunction() {
  try {
    const sql = `
    CREATE OR REPLACE FUNCTION exec_sql(sql text)
    RETURNS void AS $$
    BEGIN
      EXECUTE sql;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;


    return {
      success: true,
      message: "Please run this SQL in the Supabase SQL Editor to create the exec_sql function",
      sql: sql
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}