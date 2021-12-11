import { useState, useEffect, useMemo } from 'react';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

import './App.css';
// import shortid from 'shortid';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [contacts, filter]);

  function addContact(contact) {
    const contactIsInList = contacts.find(
      el => el.name.toLowerCase() === contact.name.toLowerCase(),
    );

    if (contactIsInList) {
      alert(`${contact.name} is already in contacts!`);
      return;
    } else {
      setContacts(prevState => [contact, ...prevState]);
    }
  }

  function changeFilter(e) {
    setFilter(e.currentTarget.value);
  }

  function deleteContact(contactId) {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  }

  return (
    <div className="App">
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
