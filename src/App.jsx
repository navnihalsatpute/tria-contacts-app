import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';
import AddContactModal from './components/AddContactModal';
import ContactDetailModal from './components/ContactDetailModal';
import { fetchContacts } from './data/mockData';
import { searchContacts, sortContactsAlphabetically } from './utils/helpers';
import { Toaster, toast } from 'react-hot-toast';


function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEditContact, setModalEditContact] = useState(null); // For editing
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Fetch contacts on mount
  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      const data = await fetchContacts();
      const sorted = sortContactsAlphabetically(data);
      setContacts(sorted);
      setFilteredContacts(sorted);
      setIsLoading(false);
    };
    loadContacts();
  }, []);

  // Search effect
  useEffect(() => {
    const results = searchContacts(contacts, searchTerm);
    setFilteredContacts(results);
  }, [searchTerm, contacts]);

  // Add/Edit contact logic
  const handleAddContact = (newContact, isUpdate) => {
    let updatedContacts;
    if (isUpdate) {
      // This path is for merging (duplicate handling)
      updatedContacts = contacts.map(contact =>
        contact.id === newContact.id ? { ...contact, ...newContact } : contact
      );
      toast.success('Contact merged successfully!');
    } else if (modalEditContact) {
      // True edit mode: overwrite ALL fields including avatar with the newContact
      updatedContacts = contacts.map(contact =>
        contact.id === modalEditContact.id ? { ...newContact } : contact
      );
      toast.success('Contact updated!');
    } else {
      // Add new
      updatedContacts = [...contacts, newContact];
      toast.success('Contact added!');
    }
    const sorted = sortContactsAlphabetically(updatedContacts);
    setContacts(sorted);
    setModalEditContact(null);
  };


  // Delete contact
  const handleDeleteContact = (contactId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);
    setSelectedContact(null);
    setIsDetailModalOpen(false);
    toast.success('Contact deleted!');
  };

  // Open Contact Details
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setIsDetailModalOpen(true);
  };

  //Closing Contact Details
  const handleContactDetailClose = () => {
    setIsDetailModalOpen(false); // start exit animation!
    setTimeout(() => setSelectedContact(null), 300); // unmount contact after 300ms
  };


  // Handle edit button (opens add modal WITH prefilled info)
  const handleEditContact = () => {
    setModalEditContact(selectedContact);
    setIsDetailModalOpen(false);
    setIsModalOpen(true);
  };

  // AddContactModal gets "edit mode" if modalEditContact is set
  const addContactInitial = modalEditContact
    ? {
      name: modalEditContact.name,
      email: modalEditContact.email,
      phone: modalEditContact.phone,
      // company: modalEditContact.company
    }
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        contactCount={contacts.length}
        onAddClick={() => { setIsModalOpen(true); setModalEditContact(null); }}
      />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={filteredContacts.length}
      />
      <ContactList
        contacts={filteredContacts}
        searchTerm={searchTerm}
        isLoading={isLoading}
        onContactClick={handleContactClick}
      />
      <AddContactModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setModalEditContact(null); }}
        onAddContact={handleAddContact}
        contacts={contacts}
        initialData={addContactInitial}
      />
      <ContactDetailModal
        contact={selectedContact}
        isOpen={isDetailModalOpen}
        onClose={handleContactDetailClose}
        onDelete={handleDeleteContact}
        onEdit={handleEditContact}
      />

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
