import "./App.css";
import contactsData from "./contacts.json";
import { useState } from "react";



function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));

  const addNewContact = () => {
    const newContact = contactsData[Math.floor(Math.random() * contactsData.length)]
    console.log('test', newContact)
    const repeated = contacts.find((contact) => newContact.name === contact.name)
    if (!repeated) setContacts(contacts => [newContact, ...contacts])
    else addNewContact();
  }
const sortByPopularity = () => {
  setContacts(contacts => {
    const sortPopular = contacts.sort((a, b) => b.popularity - a.popularity)
    return ([...sortPopular])
  })
}

const sortByName = () => {
  setContacts(contacts => {
    const sortName = contacts.sort((a, b) => a.name.localeCompare(b.name))
    console.log('sortName', sortName)
    return ([...sortName])
  })
}

const deleteContact = (contactId) => {
  const filteredContact = contacts.filter(contact => {
    return contact.id !== contactId;
  });
  setContacts(filteredContact);
};

return (
    <div>
      <h1>IronContacts</h1>
      <button onClick={addNewContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={sortByName}>Sort by name</button>
      {contacts.map((contact) => {
        const popularRounded = Math.floor(contact.popularity)
        return (
          <div key={contact.id}>
          <table>
          <tr>
            <th>
              <h2>Picture</h2>
            </th>
            <th>
            <h2>Name</h2>
            </th>
            <th>
            <h2>Popularity</h2>
            </th>
            <th>
            <h2>Won a Oscar</h2>
            {contact.wonOscar && <th>🏆</th>}
            </th>
            <th>
            <h2>Won a Emmy</h2>
            {contact.wonEmmy && <th>🏆</th>}
            </th>
            <th>
              <h2>Actions</h2>
            </th>
          </tr>
          <tr>
          <td><img src={contact.pictureUrl} width="80px"></img></td>
          <td>{contact.name}</td>
          <td>{popularRounded}</td>
          <button onClick={() => deleteContact(contact.id)} className="delete">Delete</button>
          </tr>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default App;
