import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';
import AddContactModal from './components/AddContactModal';
import { fetchContacts } from './data/mockData';
import { searchContacts } from './utils/helpers';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch contacts on mount (simulates API call)
  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      const data = await fetchContacts();
      setContacts(data);
      setFilteredContacts(data);
      setIsLoading(false);
    };

    loadContacts();
  }, []);

  // Handle search
  useEffect(() => {
    const results = searchContacts(contacts, searchTerm);
    setFilteredContacts(results);
  }, [searchTerm, contacts]);

  // Add new contact
  const handleAddContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    // Show success animation or notification here if you want
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      />

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddContact={handleAddContact}
      />
    </div>
  );
}

export default App;
