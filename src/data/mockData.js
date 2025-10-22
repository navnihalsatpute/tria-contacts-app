// Mock API data for contacts
export const mockContacts = [
    {
        id: 1,
        name: "Rajesh Kumar",
        email: "rajesh.kumar@email.com",
        phone: "+91 98765 43210",
        company: "Tech Solutions Ltd",
        avatar: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=3b82f6&color=fff"
    },
    {
        id: 2,
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+91 87654 32109",
        company: "Digital Innovations",
        avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=ec4899&color=fff"
    },
    {
        id: 3,
        name: "Amit Patel",
        email: "amit.patel@email.com",
        phone: "+91 76543 21098",
        company: "CloudTech Systems",
        avatar: "https://ui-avatars.com/api/?name=Amit+Patel&background=10b981&color=fff"
    },
    {
        id: 4,
        name: "Sneha Reddy",
        email: "sneha.reddy@email.com",
        phone: "+91 65432 10987",
        company: "DataCore Analytics",
        avatar: "https://ui-avatars.com/api/?name=Sneha+Reddy&background=f59e0b&color=fff"
    },
    {
        id: 5,
        name: "Vikram Singh",
        email: "vikram.singh@email.com",
        phone: "+91 54321 09876",
        company: "NextGen Solutions",
        avatar: "https://ui-avatars.com/api/?name=Vikram+Singh&background=8b5cf6&color=fff"
    },
    {
        id: 6,
        name: "Anjali Mehta",
        email: "anjali.mehta@email.com",
        phone: "+91 43210 98765",
        company: "Smart Innovations",
        avatar: "https://ui-avatars.com/api/?name=Anjali+Mehta&background=ef4444&color=fff"
    }
];

// Simulate API call with delay
export const fetchContacts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockContacts);
        }, 500); // 500ms delay to simulate network request
    });
};
