import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';
import AddContactModal from './components/AddContactModal';
import ContactDetailModal from './components/ContactDetailModal';
import { fetchContacts } from './data/mockData';
import { searchContacts, sortContactsAlphabetically } from './utils/helpers';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Fetch contacts on mount (simulates API call)
  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      const data = await fetchContacts();
      // Sort alphabetically
      const sorted = sortContactsAlphabetically(data);
      setContacts(sorted);
      setFilteredContacts(sorted);
      setIsLoading(false);
    };

    loadContacts();
  }, []);

  // Handle search
  useEffect(() => {
    const results = searchContacts(contacts, searchTerm);
    setFilteredContacts(results);
  }, [searchTerm, contacts]);

  // Add new contact or merge duplicate
  const handleAddContact = (newContact, isUpdate) => {
    let updatedContacts;

    if (isUpdate) {
      // Update existing contact (merge)
      updatedContacts = contacts.map(contact =>
        contact.id === newContact.id ? newContact : contact
      );
    } else {
      // Add new contact
      updatedContacts = [...contacts, newContact];
    }

    // Sort alphabetically after adding/updating
    const sorted = sortContactsAlphabetically(updatedContacts);
    setContacts(sorted);
  };

  // Handle contact card click
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header
        contactCount={contacts.length}
        onAddClick={() => setIsModalOpen(true)}
      />

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={filteredContacts.length}
      />

      {/* Contact List */}
      <ContactList
        contacts={filteredContacts}
        searchTerm={searchTerm}
        isLoading={isLoading}
        onContactClick={handleContactClick}
      />

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddContact={handleAddContact}
        contacts={contacts}
      />

      {/* Contact Detail Modal */}
      <ContactDetailModal
        contact={selectedContact}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedContact(null);
        }}
      />
    </div>
  );
}

export default App;
