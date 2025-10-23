import React, { useState, useEffect, useRef } from 'react';
import { validateContact, generateAvatar, findDuplicateContact, mergeContact } from '../utils/helpers';

const AddContactModal = ({ isOpen, onClose, onAddContact, contacts, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
    });
    const [avatarPreview, setAvatarPreview] = useState('');
    const [errors, setErrors] = useState({});
    const [duplicateWarning, setDuplicateWarning] = useState(null);
    const fileInputRef = useRef();

    // Pre-fill form data for edit
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                company: initialData.company || '',
            });
            setAvatarPreview(initialData.avatar || '');
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
            });
            setAvatarPreview('');
        }
        setErrors({});
        setDuplicateWarning(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }, [isOpen, initialData]);

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


    // if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (name === 'phone' && value.length >= 10) {
            if (!initialData) {
                const duplicate = findDuplicateContact(contacts, { phone: value });
                setDuplicateWarning(duplicate ? duplicate : null);
            }
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setAvatarPreview(ev.target.result); // Data URI
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarRemove = () => {
        setAvatarPreview('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateContact(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!initialData) {
            const duplicate = findDuplicateContact(contacts, formData);
            if (duplicate) {
                const merged = mergeContact(duplicate, { ...formData, avatar: avatarPreview });
                onAddContact(merged, true);
            } else {
                const newContact = {
                    id: Date.now(),
                    ...formData,
                    avatar: avatarPreview ? avatarPreview : generateAvatar(formData.name)
                };
                onAddContact(newContact, false);
            }
        } else {
            // Edit mode: use avatarPreview state as new Data URI if set, otherwise keep old avatar or fallback
            onAddContact({
                ...initialData,
                ...formData,
                avatar: avatarPreview ? avatarPreview : initialData.avatar || generateAvatar(formData.name)
            }, false);
        }

        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
        });
        setAvatarPreview('');
        setErrors({});
        setDuplicateWarning(null);
        onClose();
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleClose = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
        });
        setAvatarPreview('');
        setErrors({});
        setDuplicateWarning(null);
        onClose();
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const isEditMode = !!initialData;

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"
                    }`}
                onClick={handleClose}
            />
            {/* Modal */}
            <div className="flex items-center justify-center min-h-screen px-4 py-8">
                <div
                    className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{isEditMode ? 'Edit Contact' : 'Add New Contact'}</h2>
                        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* Duplicate Warning */}
                    {!isEditMode && duplicateWarning && (
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
                        {/* Avatar upload */}
                        <div className="flex flex-col items-center mb-3">
                            <div className="relative mb-2">
                                <img
                                    src={
                                        avatarPreview
                                            ? avatarPreview
                                            : initialData?.avatar
                                                ? initialData.avatar
                                                : generateAvatar(formData.name || "A")
                                    }
                                    alt="Contact avatar"
                                    className="w-20 h-20 rounded-full ring-2 ring-blue-600 object-cover bg-gray-100"
                                />
                                {avatarPreview && (
                                    <button
                                        type="button"
                                        onClick={handleAvatarRemove}
                                        className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                                        title="Remove photo"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                            <label className="cursor-pointer text-blue-600 underline text-sm mb-2">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                                {avatarPreview ? "Change Photo" : "Upload Photo"}
                            </label>
                        </div>
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                        </div>
                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                placeholder="+91 98765 43210"
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
                        </div>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email <span className="text-gray-400 text-xs">(optional)</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                                placeholder="john.doe@email.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                        </div>
                        {/* Company */}
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
                            <button type="button" onClick={handleClose} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                                Cancel
                            </button>
                            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                {isEditMode ? "Save Changes" : (duplicateWarning ? "Merge Contact" : "Add Contact")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContactModal;
