import React from 'react';

const ContactDetailModal = ({ contact, isOpen, onClose }) => {
    if (!isOpen || !contact) return null;

    const handleEmail = () => {
        window.location.href = `mailto:${contact.email}`;
    };

    const handleCall = () => {
        window.location.href = `tel:${contact.phone.replace(/\s/g, '')}`;
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
                <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-8 transform transition-all">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Contact Info */}
                    <div className="text-center mb-6">
                        <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-blue-100 dark:ring-blue-900"
                        />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {contact.name}
                        </h2>
                        {contact.company && (
                            <p className="text-gray-500 dark:text-gray-400 font-medium">
                                {contact.company}
                            </p>
                        )}
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-4 mb-6">
                        {/* Phone */}
                        <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <svg
                                className="w-5 h-5 text-gray-600 dark:text-gray-300 flex-shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {contact.phone}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        {contact.email && (
                            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <svg
                                    className="w-5 h-5 text-gray-600 dark:text-gray-300 flex-shrink-0 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                                    <p className="text-gray-900 dark:text-white font-medium break-all">
                                        {contact.email}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleCall}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call
                        </button>
                        {contact.email && (
                            <button
                                onClick={handleEmail}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDetailModal;
