import React from 'react';

const ContactCard = ({ contact }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden group">
            <div className="p-6">
                {/* Avatar and Name Section */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-16 h-16 rounded-full ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
                    />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {contact.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">{contact.company}</p>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3">
                    {/* Email */}
                    <div className="flex items-center gap-3 text-gray-700">
                        <svg
                            className="w-5 h-5 text-gray-400 flex-shrink-0"
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
                        <a
                            href={`mailto:${contact.email}`}
                            className="text-sm hover:text-blue-600 hover:underline transition-colors truncate"
                        >
                            {contact.email}
                        </a>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3 text-gray-700">
                        <svg
                            className="w-5 h-5 text-gray-400 flex-shrink-0"
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
                        <a
                            href={`tel:${contact.phone.replace(/\s/g, '')}`}
                            className="text-sm hover:text-blue-600 hover:underline transition-colors"
                        >
                            {contact.phone}
                        </a>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">Email</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm font-medium">Call</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
