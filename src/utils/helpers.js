// Search contacts by name (case-insensitive) - also searches by first letter
export const searchContacts = (contacts, searchTerm) => {
    if (!searchTerm.trim()) {
        return contacts;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return contacts.filter(contact => {
        const name = contact.name.toLowerCase();
        // Search by full name OR by first letter
        return name.includes(lowerSearchTerm) || name.startsWith(lowerSearchTerm);
    });
};

// Sort contacts alphabetically by name
export const sortContactsAlphabetically = (contacts) => {
    return [...contacts].sort((a, b) => a.name.localeCompare(b.name));
};

// Check for duplicate contacts (by phone number)
export const findDuplicateContact = (contacts, newContact) => {
    return contacts.find(contact =>
        contact.phone.replace(/\s+/g, '') === newContact.phone.replace(/\s+/g, '')
    );
};

// Merge duplicate contact (update existing with new data)
export const mergeContact = (existingContact, newData) => {
    return {
        ...existingContact,
        name: newData.name || existingContact.name,
        email: newData.email || existingContact.email,
        company: newData.company || existingContact.company,
    };
};

// Validate email format
export const isValidEmail = (email) => {
    if (!email) return true; // Email is now optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone number (Indian format)
export const isValidPhone = (phone) => {
    const phoneRegex = /^[+]?[0-9\s-]{10,15}$/;
    return phoneRegex.test(phone);
};

// Format phone number display
export const formatPhone = (phone) => {
    return phone.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');
};

// Generate avatar URL from name
export const generateAvatar = (name) => {
    const colors = ['3b82f6', 'ec4899', '10b981', 'f59e0b', '8b5cf6', 'ef4444'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${randomColor}&color=fff`;
};

// Validate contact form - only name and phone are mandatory
export const validateContact = (contact) => {
    const errors = {};

    if (!contact.name || contact.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
    }

    if (!contact.phone || !isValidPhone(contact.phone)) {
        errors.phone = "Please enter a valid phone number";
    }

    // Email is optional, but if provided, must be valid
    if (contact.email && !isValidEmail(contact.email)) {
        errors.email = "Please enter a valid email address";
    }

    return errors;
};
