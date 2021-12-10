import { useState, useEffect } from 'react';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

import './App.css';
// import shortid from 'shortid';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
  );
  const [filter, setFilter] = useState('');

  // function formSubmitHandler(data) {
  //   console.log(data);
  // }

  function addContact(contact) {
    const contactIsInList = contacts.find(
      el => el.name.toLowerCase() === contact.name.toLowerCase(),
    );

    if (contactIsInList) {
      alert(`${contact.name} is already in contacts!`);
      return;
    } else {
      setContacts(contacts => [contact, ...contacts]);
    }
  }

  function changeFilter(e) {
    setFilter(e.currentTarget.value);
  }

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }

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
  }, [contacts, filter]);

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
        <ContactForm onSubmit={addContact()} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter()} />
        <ContactList
          contacts={getVisibleContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
