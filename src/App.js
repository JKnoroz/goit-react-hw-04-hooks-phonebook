import { useState, useEffect } from 'react';

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

  // function formSubmitHandler(data) {
  //   console.log(data);
  // }

  function addContact(contact) {
    console.log(contact);
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

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  function deleteContact(contactId) {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  }

  // componentDidMount() {
  //   const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  // const visibleContacts = this.getVisibleContacts();
  return (
    <div className="App">
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
