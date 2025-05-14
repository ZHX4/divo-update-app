import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';
import {
    fetchAppointmentsStart,
    fetchAppointmentsSuccess,
    fetchAppointmentsFailure,
    addAppointment,
    updateAppointment,
    addMultipleAppointments,
} from '../store/slices/appointmentSlice';

export const useAppointments = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { appointments, loading, error } = useSelector(
        (state) => state.appointments
    );
    const [doctors, setDoctors] = useState([]);
    const [doctorsLoading, setDoctorsLoading] = useState(false);
    const [doctorsError, setDoctorsError] = useState(null);
    const [appointmentStats, setAppointmentStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(false);

    const fetchAppointments = useCallback(
        async () => {
            if (!user?.id) {
                dispatch(fetchAppointmentsSuccess([]));
                return { success: true, appointments: [] };
            }

            try {
                dispatch(fetchAppointmentsStart());
                const { data, error: fetchError } = await supabase
                    .from('appointments')
                    .select(`
            *,
            patient:patient_id ( id, full_name, avatar_url ),
            doctor:doctor_id ( id, full_name, avatar_url, specialty )
          `)
                    .or(`patient_id.eq.${user.id},doctor_id.eq.${user.id}`)
                    .order('appointment_time', { ascending: false });

                if (fetchError) {
                    throw fetchError;
                }

                const formattedAppointments = data.map(app => ({
                    ...app,
                    date: app.appointment_time ? new Date(app.appointment_time).toISOString().split('T')[0] : null,
                    time: app.appointment_time ? new Date(app.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : null,
                }));

                dispatch(fetchAppointmentsSuccess(formattedAppointments));
                return { success: true, appointments: formattedAppointments };

            } catch (err) {
                console.error("Error fetching appointments:", err);
                const message = err.message || 'Failed to fetch appointments';
                dispatch(fetchAppointmentsFailure(message));
                return { success: false, error: message };
            }
        },
        [dispatch, user?.id]
    );

    const createAppointment = useCallback(
        async (appointmentData) => {
            if (!user?.id) return { success: false, error: 'User not authenticated' };

            let appointmentTimestamp;
            if (appointmentData.date && appointmentData.time) {
                try {
                    appointmentTimestamp = new Date(`${appointmentData.date}T${appointmentData.time}:00`).toISOString();
                } catch (e) {
                    console.error("Invalid date/time format:", e);
                    return { success: false, error: 'Invalid date or time format provided.' };
                }
            } else {
                return { success: false, error: 'Date and time are required.' };
            }

            const newAppointmentData = {
                patient_id: user.id,
                doctor_id: appointmentData.doctorId,
                appointment_time: appointmentTimestamp,
                status: 'scheduled',
                reason: appointmentData.reason,
            };

            try {
                const { data, error: insertError } = await supabase
                    .from('appointments')
                    .insert(newAppointmentData)
                    .select(`
            *,
            patient:patient_id ( id, full_name, avatar_url ),
            doctor:doctor_id ( id, full_name, avatar_url, specialty )
          `)
                    .single();

                if (insertError) {
                    throw insertError;
                }

                const formattedAppointment = {
                    ...data,
                    date: data.appointment_time ? new Date(data.appointment_time).toISOString().split('T')[0] : null,
                    time: data.appointment_time ? new Date(data.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : null,
                };

                dispatch(addAppointment(formattedAppointment));
                return { success: true, appointment: formattedAppointment };

            } catch (err) {
                console.error("Error creating appointment:", err);
                return { success: false, error: err.message || 'Failed to create appointment' };
            }
        },
        [dispatch, user?.id]
    );

    const updateAppointmentById = useCallback(
        async (id, updateData) => {
            if (!user?.id) return { success: false, error: 'User not authenticated' };

            let appointmentTimestamp;
            if (updateData.date && updateData.time) {
                try {
                    appointmentTimestamp = new Date(`${updateData.date}T${updateData.time}:00`).toISOString();
                    updateData.appointment_time = appointmentTimestamp;
                    delete updateData.date;
                    delete updateData.time;
                } catch (e) {
                    console.error("Invalid date/time format for update:", e);
                    return { success: false, error: 'Invalid date or time format provided for update.' };
                }
            } else {
                delete updateData.date;
                delete updateData.time;
            }

            try {
                const { data, error: updateError } = await supabase
                    .from('appointments')
                    .update(updateData)
                    .eq('id', id)
                    .select(`
            *,
            patient:patient_id ( id, full_name, avatar_url ),
            doctor:doctor_id ( id, full_name, avatar_url, specialty )
          `)
                    .single();

                if (updateError) {
                    throw updateError;
                }

                const formattedAppointment = {
                    ...data,
                    date: data.appointment_time ? new Date(data.appointment_time).toISOString().split('T')[0] : null,
                    time: data.appointment_time ? new Date(data.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : null,
                };

                dispatch(updateAppointment(formattedAppointment));
                return { success: true, appointment: formattedAppointment };

            } catch (err) {
                console.error("Error updating appointment:", err);
                return { success: false, error: err.message || 'Failed to update appointment' };
            }
        },
        [dispatch, user?.id]
    );

    const sendAppointmentReminder = useCallback(
        async (appointmentId) => {
            if (!user?.id) return { success: false, error: 'User not authenticated' };

            try {
                const { data: appointment, error: fetchError } = await supabase
                    .from('appointments')
                    .select(`
            *,
            patient:patient_id ( id, full_name, email ),
            doctor:doctor_id ( id, full_name, specialty )
          `)
                    .eq('id', appointmentId)
                    .single();

                if (fetchError) throw fetchError;

                if (appointment.patient_id !== user.id && appointment.doctor_id !== user.id) {
                    return { success: false, error: 'Not authorized to send reminders for this appointment' };
                }

                const { data, error: notificationError } = await supabase
                    .from('notifications')
                    .insert({
                        user_id: appointment.patient_id === user.id ? appointment.doctor_id : appointment.patient_id,
                        title: 'Appointment Reminder',
                        message: `Reminder: You have an appointment with ${
                            appointment.patient_id === user.id
                                ? appointment.patient.full_name
                                : appointment.doctor.full_name
                        } on ${new Date(appointment.appointment_time).toLocaleDateString()} at ${
                            new Date(appointment.appointment_time).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })
                        }.`,
                        type: 'appointment_reminder',
                        related_id: appointmentId,
                        read: false
                    })
                    .select()
                    .single();

                if (notificationError) throw notificationError;

                return {
                    success: true,
                    message: 'Appointment reminder sent successfully'
                };
            } catch (err) {
                console.error("Error sending appointment reminder:", err);
                return {
                    success: false,
                    error: err.message || 'Failed to send appointment reminder'
                };
            }
        },
        [user?.id]
    );

    const getAvailableSlots = useCallback(
        async (doctorId, date) => {
            if (!doctorId || !date) {
                return { success: false, error: 'Doctor ID and date are required' };
            }

            try {
                const { data: doctorData, error: doctorError } = await supabase
                    .from('doctors')
                    .select('working_hours')
                    .eq('id', doctorId)
                    .single();

                if (doctorError) throw doctorError;

                const workingHours = doctorData?.working_hours || {
                    start: '09:00',
                    end: '17:00',
                    slotDuration: 30,
                    daysOff: [0, 6]
                };

                const selectedDate = new Date(date);
                const dayOfWeek = selectedDate.getDay();

                if (workingHours.daysOff.includes(dayOfWeek)) {
                    return {
                        success: true,
                        slots: [],
                        message: 'The doctor is not available on this day'
                    };
                }

                const startTime = new Date(`${date}T${workingHours.start}`);
                const endTime = new Date(`${date}T${workingHours.end}`);
                const slotDuration = workingHours.slotDuration * 60 * 1000;

                const allSlots = [];
                let currentSlot = new Date(startTime);

                while (currentSlot < endTime) {
                    allSlots.push(new Date(currentSlot));
                    currentSlot = new Date(currentSlot.getTime() + slotDuration);
                }


                const dayStart = new Date(date);
                const dayEnd = new Date(date);
                dayEnd.setDate(dayEnd.getDate() + 1);

                const { data: bookedSlots, error: bookedError } = await supabase
                    .from('appointments')
                    .select('appointment_time')
                    .eq('doctor_id', doctorId)
                    .gte('appointment_time', dayStart.toISOString())
                    .lt('appointment_time', dayEnd.toISOString())
                    .neq('status', 'cancelled');

                if (bookedError) throw bookedError;

                const bookedTimes = bookedSlots.map(slot => new Date(slot.appointment_time).getTime());
                const availableSlots = allSlots.filter(slot =>
                    !bookedTimes.includes(slot.getTime())
                ).map(slot => ({
                    time: slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                    available: true
                }));

                return {
                    success: true,
                    slots: availableSlots
                };
            } catch (err) {
                console.error("Error getting available slots:", err);
                return {
                    success: false,
                    error: err.message || 'Failed to get available appointment slots'
                };
            }
        },
        []
    );

    const cancelAppointmentById = useCallback(
        async (id) => {
            return updateAppointmentById(id, { status: 'cancelled' });
        },
        [updateAppointmentById]
    );

    const createRecurringAppointments = useCallback(
        async (appointmentData, recurringPattern) => {
            if (!user?.id) return { success: false, error: 'User not authenticated' };

            if (!['weekly', 'biweekly', 'monthly'].includes(recurringPattern.type)) {
                return { success: false, error: 'Invalid recurring pattern type' };
            }

            if (!recurringPattern.occurrences || recurringPattern.occurrences < 1 || recurringPattern.occurrences > 52) {
                return { success: false, error: 'Number of occurrences should be between 1 and 52' };
            }

            try {
                const appointments = [];
                const baseDate = new Date(`${appointmentData.date}T${appointmentData.time}:00`);

                for (let i = 0; i < recurringPattern.occurrences; i++) {
                    const currentDate = new Date(baseDate);

                    if (i > 0) {
                        if (recurringPattern.type === 'weekly') {
                            currentDate.setDate(currentDate.getDate() + (7 * i));
                        } else if (recurringPattern.type === 'biweekly') {
                            currentDate.setDate(currentDate.getDate() + (14 * i));
                        } else if (recurringPattern.type === 'monthly') {
                            currentDate.setMonth(currentDate.getMonth() + i);
                        }
                    }

                    const appointmentTimestamp = currentDate.toISOString();

                    appointments.push({
                        patient_id: user.id,
                        doctor_id: appointmentData.doctorId,
                        appointment_time: appointmentTimestamp,
                        status: 'scheduled',
                        reason: appointmentData.reason,
                        notes: appointmentData.notes,
                        type: appointmentData.type || 'in-person',
                        recurring_group_id: crypto.randomUUID(),
                        recurring_sequence: i + 1,
                        total_occurrences: recurringPattern.occurrences
                    });
                }

                const { data, error: insertError } = await supabase
                    .from('appointments')
                    .insert(appointments)
                    .select(`
            *,
            patient:patient_id ( id, full_name, avatar_url ),
            doctor:doctor_id ( id, full_name, avatar_url, specialty )
          `);

                if (insertError) throw insertError;

                const formattedAppointments = data.map(app => ({
                    ...app,
                    date: app.appointment_time ? new Date(app.appointment_time).toISOString().split('T')[0] : null,
                    time: app.appointment_time ? new Date(app.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : null,
                }));

                dispatch(addMultipleAppointments(formattedAppointments));

                return { success: true, appointments: formattedAppointments };
            } catch (err) {
                console.error("Error creating recurring appointments:", err);
                return { success: false, error: err.message || 'Failed to create recurring appointments' };
            }
        },
        [dispatch, user?.id]
    );

    const createFollowUpAppointment = useCallback(
        async (originalAppointmentId, followUpData) => {
            if (!user?.id) return { success: false, error: 'User not authenticated' };

            try {
                const { data: originalAppointment, error: fetchError } = await supabase
                    .from('appointments')
                    .select('*')
                    .eq('id', originalAppointmentId)
                    .single();

                if (fetchError) throw fetchError;

                if (originalAppointment.patient_id !== user.id && originalAppointment.doctor_id !== user.id) {
                    return { success: false, error: 'Not authorized to create follow-up for this appointment' };
                }

                let followUpTimestamp;
                try {
                    followUpTimestamp = new Date(`${followUpData.date}T${followUpData.time}:00`).toISOString();
                } catch (e) {
                    return { success: false, error: 'Invalid date or time format provided.' };
                }

                const followUpAppointment = {
                    patient_id: originalAppointment.patient_id,
                    doctor_id: originalAppointment.doctor_id,
                    appointment_time: followUpTimestamp,
                    status: 'scheduled',
                    reason: followUpData.reason || `Follow-up to appointment from ${new Date(originalAppointment.appointment_time).toLocaleDateString()}`,
                    notes: followUpData.notes,
                    type: followUpData.type || originalAppointment.type || 'in-person',
                    parent_appointment_id: originalAppointmentId,
                    is_follow_up: true
                };

                const { data, error: insertError } = await supabase
                    .from('appointments')
                    .insert(followUpAppointment)
                    .select(`
            *,
            patient:patient_id ( id, full_name, avatar_url ),
            doctor:doctor_id ( id, full_name, avatar_url, specialty )
          `)
                    .single();

                if (insertError) throw insertError;

                const formattedAppointment = {
                    ...data,
                    date: data.appointment_time ? new Date(data.appointment_time).toISOString().split('T')[0] : null,
                    time: data.appointment_time ? new Date(data.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : null,
                };

                dispatch(addAppointment(formattedAppointment));

                return { success: true, appointment: formattedAppointment };
            } catch (err) {
                console.error("Error creating follow-up appointment:", err);
                return { success: false, error: err.message || 'Failed to create follow-up appointment' };
            }
        },
        [dispatch, user?.id]
    );

    const getAppointmentAnalytics = useCallback(
        async (period = 'month') => {
            if (!user?.id) return { success: false, error: 'User not authenticated' };

            setStatsLoading(true);

            try {
                const now = new Date();
                let startDate;

                if (period === 'week') {
                    startDate = new Date(now);
                    startDate.setDate(now.getDate() - 7);
                } else if (period === 'month') {
                    startDate = new Date(now);
                    startDate.setMonth(now.getMonth() - 1);
                } else if (period === 'quarter') {
                    startDate = new Date(now);
                    startDate.setMonth(now.getMonth() - 3);
                } else if (period === 'year') {
                    startDate = new Date(now);
                    startDate.setFullYear(now.getFullYear() - 1);
                } else {
                    return { success: false, error: 'Invalid period specified' };
                }

                const { data: appointmentsData, error: fetchError } = await supabase
                    .from('appointments')
                    .select(`
            id, 
            appointment_time, 
            status, 
            type,
            patient:patient_id ( id, full_name ),
            doctor:doctor_id ( id, full_name, specialty )
          `)
                    .or(`patient_id.eq.${user.id},doctor_id.eq.${user.id}`)
                    .gte('appointment_time', startDate.toISOString())
                    .lte('appointment_time', now.toISOString());

                if (fetchError) throw fetchError;

                const stats = {
                    total: appointmentsData.length,
                    byStatus: {},
                    byType: {},
                    byDay: {},
                    bySpecialty: {},
                    completionRate: 0,
                    averageDuration: 0,
                };

                appointmentsData.forEach(app => {
                    const status = app.status || 'unknown';
                    stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;

                    const type = app.type || 'in-person';
                    stats.byType[type] = (stats.byType[type] || 0) + 1;

                    const day = new Date(app.appointment_time).toLocaleDateString('en-US', { weekday: 'short' });
                    stats.byDay[day] = (stats.byDay[day] || 0) + 1;

                    if (app.doctor && app.doctor.specialty) {
                        const specialty = app.doctor.specialty;
                        stats.bySpecialty[specialty] = (stats.bySpecialty[specialty] || 0) + 1;
                    }
                });

                const completed = stats.byStatus['completed'] || 0;
                const cancelled = stats.byStatus['cancelled'] || 0;
                const noShow = stats.byStatus['no-show'] || 0;
                stats.completionRate = stats.total ? (completed / stats.total) * 100 : 0;
                stats.cancellationRate = stats.total ? ((cancelled + noShow) / stats.total) * 100 : 0;

                setAppointmentStats(stats);
                return { success: true, stats };
            } catch (err) {
                console.error("Error fetching appointment analytics:", err);
                return { success: false, error: err.message || 'Failed to fetch appointment analytics' };
            } finally {
                setStatsLoading(false);
            }
        },
        [user?.id]
    );

    const getFilteredAppointments = useCallback(
        async (filters) => {
            if (!user?.id) return { success: false, error: 'User not authenticated' };

            try {
                let query = supabase
                    .from('appointments')
                    .select(`
            *,
            patient:patient_id ( id, full_name, avatar_url ),
            doctor:doctor_id ( id, full_name, avatar_url, specialty )
          `)
                    .or(`patient_id.eq.${user.id},doctor_id.eq.${user.id}`);

                if (filters) {
                    if (filters.startDate) {
                        query = query.gte('appointment_time', new Date(filters.startDate).toISOString());
                    }

                    if (filters.endDate) {
                        query = query.lte('appointment_time', new Date(filters.endDate).toISOString());
                    }

                    if (filters.status) {
                        query = query.eq('status', filters.status);
                    }

                    if (filters.type) {
                        query = query.eq('type', filters.type);
                    }

                    if (filters.doctorId) {
                        query = query.eq('doctor_id', filters.doctorId);
                    }

                    if (filters.patientId) {
                        query = query.eq('patient_id', filters.patientId);
                    }

                    if (filters.searchTerm) {
                        query = query.or(`reason.ilike.%${filters.searchTerm}%,notes.ilike.%${filters.searchTerm}%`);
                    }

                    if (filters.onlyFollowUps) {
                        query = query.eq('is_follow_up', true);
                    }

                    if (filters.onlyParentAppointments) {
                        query = query.is('parent_appointment_id', null);
                    }
                }

                query = query.order('appointment_time', { ascending: filters?.oldestFirst || false });

                const { data, error: fetchError } = await query;

                if (fetchError) throw fetchError;

                const formattedAppointments = data.map(app => ({
                    ...app,
                    date: app.appointment_time ? new Date(app.appointment_time).toISOString().split('T')[0] : null,
                    time: app.appointment_time ? new Date(app.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : null,
                }));

                return { success: true, appointments: formattedAppointments };
            } catch (err) {
                console.error("Error fetching filtered appointments:", err);
                return { success: false, error: err.message || 'Failed to fetch filtered appointments' };
            }
        },
        [user?.id]
    );

    const getUpcomingAppointments = useCallback(() => {
        const now = new Date();
        return appointments.filter(
            (appointment) =>
                appointment.appointment_time && new Date(appointment.appointment_time) >= now && appointment.status === 'scheduled'
        ).sort((a, b) => new Date(a.appointment_time) - new Date(b.appointment_time));
    }, [appointments]);

    const getPastAppointments = useCallback(() => {
        const now = new Date();
        return appointments.filter(
            (appointment) =>
                !appointment.appointment_time || new Date(appointment.appointment_time) < now || appointment.status !== 'scheduled'
        ).sort((a, b) => new Date(b.appointment_time) - new Date(a.appointment_time));
    }, [appointments]);

    const getDoctors = useCallback(async () => {
        setDoctorsLoading(true);
        setDoctorsError(null);
        try {
            const { data, error: doctorError } = await supabase
                .from('profiles')
                .select('id, full_name, specialty, avatar_url, bio')
                .eq('role', 'doctor');

            if (doctorError) {
                throw doctorError;
            }
            setDoctors(data || []);
            return { success: true, doctors: data || [] };
        } catch (err) {
            console.error("Error fetching doctors:", err);
            const message = err.message || 'Failed to fetch doctors';
            setDoctorsError(message);
            return { success: false, error: message };
        } finally {
            setDoctorsLoading(false);
        }
    }, []);

    return {
        appointments,
        loading,
        error,
        fetchAppointments,
        createAppointment,
        updateAppointmentById,
        cancelAppointmentById,
        getUpcomingAppointments,
        getPastAppointments,
        getDoctors,
        doctors,
        doctorsLoading,
        doctorsError,
        sendAppointmentReminder,
        getAvailableSlots,
        createRecurringAppointments,
        createFollowUpAppointment,
        getAppointmentAnalytics,
        appointmentStats,
        statsLoading,
        getFilteredAppointments,
    };
};