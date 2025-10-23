import React, { useState, useEffect, useRef } from "react";

const ContactDetailModal = ({ contact, isOpen, onClose, onDelete, onEdit }) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const [show, setShow] = useState(false);
    useEffect(() => {
        if (isOpen) {
            setShow(false);
            // Animate in after mount
            setTimeout(() => setShow(true), 10);
        } else {
            setShow(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    if (!contact) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 text-center text-gray-700 dark:text-gray-200">
                    Loading...
                </div>
            </div>
        );
    }

    const handleEmail = () => {
        window.location.href = `mailto:${contact.email}`;
    };

    const handleCall = () => {
        window.location.href = `tel:${contact.phone.replace(/\s/g, '')}`;
    };

    const handleDelete = () => {
        setConfirmDelete(true);
    };

    const confirmDeleteYes = () => {
        onDelete(contact.id);
        setConfirmDelete(false);
        onClose();
    };

    const confirmDeleteNo = () => {
        setConfirmDelete(false);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />
            {/* Modal */}
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
                <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-8 transform transition-all duration-300 ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}>
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
                        <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    {contact.phone}
                                </p>
                            </div>
                        </div>
                        {contact.email && (
                            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleCall}
                            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call
                        </button>
                        {contact.email && (
                            <button
                                onClick={handleEmail}
                                className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </button>
                        )}
                        <button
                            onClick={onEdit}
                            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-200 font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3v3H9v-3zM3 17.25V21h3.75l10.607-10.607a1.5 1.5 0 00-2.121-2.121L3 17.25z" />
                            </svg>
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19a2 2 0 01-2 2h-2a2 2 0 01-2-2m-4-2a2 2 0 002 2h8a2 2 0 002-2m2-10v10M5 7h14M9 7V5a3 3 0 016 0v2" />
                            </svg>
                            Delete
                        </button>
                    </div>

                    {/* Delete confirmation dialog */}
                    {confirmDelete && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 flex flex-col items-center gap-4 shadow-lg border border-gray-100 dark:border-gray-700">
                                <p className="text-lg font-medium text-gray-900 dark:text-white">Delete this contact?</p>
                                <div className="flex gap-4 pt-2">
                                    <button onClick={confirmDeleteYes} className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg">Yes</button>
                                    <button onClick={confirmDeleteNo} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-700 font-medium rounded-lg">Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactDetailModal;
