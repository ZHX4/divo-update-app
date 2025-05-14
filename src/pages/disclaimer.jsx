import { motion } from 'framer-motion';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';

const Disclaimer = () => {
  return (
    <MainLayout>
      <Head>
        <title>Disclaimer | Divo</title>
        <meta name="description" content="Important disclaimers and limitations of Divo's medical appointment services" />
      </Head>

      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Disclaimer</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Medical Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The information provided on Divo is for general informational and scheduling purposes only. It is not intended 
              to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your 
              physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">No Doctor-Patient Relationship</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Using Divo does not create a doctor-patient relationship. The platform is solely for scheduling appointments 
              and managing healthcare administration. Medical advice, diagnosis, and treatment can only be provided during 
              actual medical consultations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Emergency Situations</h2>
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
              <p className="text-red-800 dark:text-red-200">
                Do not use this platform for emergency medical needs. If you have a medical emergency, please call your local 
                emergency services immediately or visit the nearest emergency room.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Accuracy of Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              While we strive to keep the information on Divo up-to-date and accurate, we make no representations or 
              warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, 
              or availability of the platform or the information, products, services, or related graphics contained on 
              the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Divo shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising 
              out of your access to, or use of, the platform. This includes, but is not limited to, any errors or 
              omissions in any content, or any loss or damage incurred as a result of the use of any content posted, 
              transmitted, or otherwise made available via the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Content</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our platform may contain links to third-party websites or services that are not owned or controlled by 
              Divo. We have no control over, and assume no responsibility for, the content, privacy policies, or 
              practices of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Changes to This Disclaimer</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon 
              posting to the platform. Your continued use of Divo after any modification indicates your acceptance 
              of these changes.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Last updated: March 27, 2024
            </p>
          </section>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Disclaimer;
