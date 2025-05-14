import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import MainLayout from '../../../components/layout/MainLayout';
import VideoCall from '../../../components/VideoCall/VideoCall';
import Head from 'next/head';

const VideoCallPage = () => {
  const router = useRouter();
  const { id: appointmentId } = router.query;
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !appointmentId) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <Head>
        <title>Video Consultation | Divo</title>
        <meta name="description" content="Video consultation with your healthcare provider" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold mb-6">Video Consultation</h1>
        
        <VideoCall
          appointmentId={appointmentId}
          doctorId={appointment.doctorId}
          patientId={appointment.patientId}
          isDoctor={user.role === 'doctor'}
        />
      </div>
    </MainLayout>
  );
};

export default VideoCallPage;
