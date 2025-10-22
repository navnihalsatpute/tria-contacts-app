import React from 'react';

const EmptyState = ({ searchTerm }) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-gray-100 rounded-full p-6 mb-6">
                <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No contacts found' : 'No contacts yet'}
            </h3>

            <p className="text-gray-500 text-center max-w-md">
                {searchTerm
                    ? `We couldn't find any contacts matching "${searchTerm}". Try a different search term.`
                    : 'Get started by adding your first contact using the "Add Contact" button above.'
                }
            </p>

            {searchTerm && (
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    Clear Search
                </button>
            )}
        </div>
    );
};

export default EmptyState;
