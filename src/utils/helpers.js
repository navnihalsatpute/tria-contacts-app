// Search contacts by name (case-insensitive)
export const searchContacts = (contacts, searchTerm) => {
    if (!searchTerm.trim()) {
        return contacts;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(lowerSearchTerm)
    );
};

// Validate email format
export const isValidEmail = (email) => {
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

// Validate contact form
export const validateContact = (contact) => {
    const errors = {};

    if (!contact.name || contact.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
    }

    if (!contact.email || !isValidEmail(contact.email)) {
        errors.email = "Please enter a valid email address";
    }

    if (!contact.phone || !isValidPhone(contact.phone)) {
        errors.phone = "Please enter a valid phone number";
    }

    if (!contact.company || contact.company.trim().length < 2) {
        errors.company = "Company name is required";
    }

    return errors;
};
