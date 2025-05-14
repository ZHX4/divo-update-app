import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';

const FAQsPage = () => {
    const [activeCategory, setActiveCategory] = useState('general');
    const [openQuestions, setOpenQuestions] = useState([]);

    const toggleQuestion = (id) => {
        setOpenQuestions(prev =>
            prev.includes(id)
                ? prev.filter(qId => qId !== id)
                : [...prev, id]
        );
    };

    const faqCategories = {
        general: {
            title: 'General Questions',
            questions: [
                {
                    id: 'q1',
                    question: 'How do I create an account?',
                    answer: 'You can create an account by clicking the "Register" button in the top right corner. Fill in your personal information, verify your email, and complete your medical profile.'
                },
                {
                    id: 'q2',
                    question: 'Is my medical information secure?',
                    answer: 'Yes, we take security seriously. All data is encrypted and stored securely following HIPAA guidelines. We never share your information without your explicit consent.'
                }
            ]
        },
        appointments: {
            title: 'Appointments',
            questions: [
                {
                    id: 'q3',
                    question: 'How do I book an appointment?',
                    answer: 'To book an appointment, search for a doctor using our "Find Doctors" feature, select an available time slot, and confirm your booking. You\'ll receive a confirmation email.'
                },
                {
                    id: 'q4',
                    question: 'Can I reschedule or cancel my appointment?',
                    answer: 'Yes, you can reschedule or cancel appointments through your dashboard up to 24 hours before the scheduled time.'
                }
            ]
        },
        payments: {
            title: 'Payments & Insurance',
            questions: [
                {
                    id: 'q5',
                    question: 'What payment methods do you accept?',
                    answer: 'We accept major credit cards, debit cards, and various digital payment methods. Some clinics may also accept insurance.'
                },
                {
                    id: 'q6',
                    question: 'How do I submit insurance information?',
                    answer: 'You can add your insurance information in your profile settings. Upload a clear photo of your insurance card and fill in the required details.'
                }
            ]
        },
        technical: {
            title: 'Technical Support',
            questions: [
                {
                    id: 'q7',
                    question: 'What should I do if I can\'t log in?',
                    answer: 'First, ensure your email and password are correct. You can use the "Forgot Password" link to reset your password. If issues persist, contact our support team.'
                },
                {
                    id: 'q8',
                    question: 'How do I update my contact information?',
                    answer: 'Go to Settings in your dashboard, select "Profile", and update your contact information. Don\'t forget to save your changes.'
                }
            ]
        }
    };

    return (
        <MainLayout>
            <Head>
                <title>Frequently Asked Questions | Divo</title>
                <meta name="description" content="Find answers to common questions about using Divo's medical appointment system" />
            </Head>

            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
                        Find quick answers to common questions about using our platform
                    </p>

                    {/* Category Navigation */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        {Object.keys(faqCategories).map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${activeCategory === category
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }
                `}
                            >
                                {faqCategories[category].title}
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {faqCategories[activeCategory].questions.map((faq) => (
                                <motion.div
                                    key={faq.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut"
                                    }}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleQuestion(faq.id)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left bg-white dark:bg-gray-800"
                                    >
                                        <span className="text-gray-900 dark:text-white font-medium">
                                            {faq.question}
                                        </span>
                                        <motion.svg
                                            animate={{
                                                rotate: openQuestions.includes(faq.id) ? 180 : 0
                                            }}
                                            transition={{ duration: 0.3, ease: "anticipate" }}
                                            className="w-5 h-5 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </motion.svg>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openQuestions.includes(faq.id) && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                    transition: {
                                                        height: {
                                                            duration: 0.3,
                                                            ease: "easeOut"
                                                        },
                                                        opacity: {
                                                            duration: 0.2,
                                                            delay: 0.1
                                                        }
                                                    }
                                                }}
                                                exit={{
                                                    height: 0,
                                                    opacity: 0,
                                                    transition: {
                                                        height: {
                                                            duration: 0.3,
                                                            ease: "easeIn"
                                                        },
                                                        opacity: {
                                                            duration: 0.1
                                                        }
                                                    }
                                                }}
                                                className="bg-white dark:bg-gray-800 overflow-hidden"
                                            >
                                                <div className="px-6 pb-4">
                                                    <p className="text-gray-600 dark:text-gray-400">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Contact Support */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Can't find what you're looking for?
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </motion.div>
        </MainLayout>
    );
};

export default FAQsPage;
