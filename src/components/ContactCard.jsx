import React from 'react';

const ContactCard = ({ contact, onClick }) => {
    const handleCall = (e) => {
        e.stopPropagation(); // Prevent card click
        window.location.href = `tel:${contact.phone.replace(/\s/g, '')}`;
    };

    const handleEmail = (e) => {
        e.stopPropagation(); // Prevent card click
        window.location.href = `mailto:${contact.email}`;
    };

    const handleInfo = (e) => {
        onClick(contact);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden group">
            <div className="p-6">
                {/* Avatar and Name Section */}
                <div className="flex items-center gap-4 mb-5">
                    <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-16 h-16 rounded-full ring-2 ring-gray-100 dark:ring-gray-700 group-hover:ring-blue-200 dark:group-hover:ring-blue-600 transition-all duration-300"
                    />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {contact.name}
                        </h3>
                        {contact.company && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {contact.company}
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {/* Call Button - Always visible */}
                    <button
                        onClick={handleCall}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                        title="Call contact"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm font-medium">Call</span>
                    </button>

                    {/* Email Button - Only if email exists */}
                    {contact.email && (
                        <button
                            onClick={handleEmail}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                            title="Email contact"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium">Email</span>
                        </button>
                    )}

                    {/* Info Button */}
                    <button
                        onClick={handleInfo}
                        className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                        title="View contact details"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
