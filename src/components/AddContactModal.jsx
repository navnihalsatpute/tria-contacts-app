import React, { useState } from 'react';
import { validateContact, generateAvatar, findDuplicateContact, mergeContact } from '../utils/helpers';

const AddContactModal = ({ isOpen, onClose, onAddContact, contacts }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: ''
    });
    const [errors, setErrors] = useState({});
    const [duplicateWarning, setDuplicateWarning] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        // Check for duplicate when phone changes
        if (name === 'phone' && value.length >= 10) {
            const duplicate = findDuplicateContact(contacts, { phone: value });
            if (duplicate) {
                setDuplicateWarning(duplicate);
            } else {
                setDuplicateWarning(null);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const validationErrors = validateContact(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Check for duplicate
        const duplicate = findDuplicateContact(contacts, formData);

        if (duplicate) {
            // Merge with existing contact
            const merged = mergeContact(duplicate, formData);
            onAddContact(merged, true); // true indicates it's an update
        } else {
            // Create new contact
            const newContact = {
                id: Date.now(),
                ...formData,
                avatar: generateAvatar(formData.name)
            };
            onAddContact(newContact, false);
        }

        // Reset form and close modal
        setFormData({ name: '', email: '', phone: '', company: '' });
        setErrors({});
        setDuplicateWarning(null);
        onClose();
    };

    const handleClose = () => {
        setFormData({ name: '', email: '', phone: '', company: '' });
        setErrors({});
        setDuplicateWarning(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
                <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Contact</h2>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Duplicate Warning */}
                    {duplicateWarning && (
                        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <div className="flex gap-2">
                                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                        Contact exists: {duplicateWarning.name}
                                    </p>
                                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                                        Submitting will merge with existing contact
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field - Required */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                placeholder="John Doe"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                            )}
                        </div>

                        {/* Phone Field - Required */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                placeholder="+91 98765 43210"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                            )}
                        </div>

                        {/* Email Field - Optional */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email <span className="text-gray-400 text-xs">(optional)</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                placeholder="john.doe@email.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                            )}
                        </div>

                        {/* Company Field - Optional */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Company <span className="text-gray-400 text-xs">(optional)</span>
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                                placeholder="Tech Solutions Ltd"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                {duplicateWarning ? 'Merge Contact' : 'Add Contact'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContactModal;
