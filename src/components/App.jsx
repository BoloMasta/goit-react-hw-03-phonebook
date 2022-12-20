import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: '',
    };
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    const form = event.target;
    const name = form.elements.name;
    const number = form.elements.number;
    const contact = {
      name: name.value,
      number: number.value,
      id: nanoid(),
    };

    if (this.state.contacts.find(contact => contact.name === name.value)) {
      alert(`${name.value} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));

    form.reset();
  };

  onRemoveContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <h1>Phonebook ☎️</h1>
        <ContactForm handleSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.onChangeFilter} />

        <ContactList
          contacts={contacts}
          onRemoveContact={this.onRemoveContact}
          filter={filter}
        />
      </>
    );
  }
}
