import { Component } from 'react';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import { Notification } from 'components/Notification/Notification';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';
export class ContactList extends Component {
  render() {
    const { contacts, onRemoveContact, filter } = this.props;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        {contacts.length === 0 ? (
          <Notification message="No contacts yet" />
        ) : (
          <ul className={css.list}>
            {filteredContacts.map(({ id, name, number }) => (
              <ContactListItem
                contacts={contacts}
                key={id}
                contact={{ id, name, number }}
                onRemoveContact={onRemoveContact}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  onRemoveContact: PropTypes.func,
  filter: PropTypes.string,
};
