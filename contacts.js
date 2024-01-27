const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const contactsFile = path.basename("./db/contacts.json");
const contactsDir = path.dirname("./db/contacts.json");
const contactsPath = path.join(contactsDir, contactsFile);

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.table(JSON.parse(data));
      return;
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      const contacts = JSON.parse(data);
      const index = contacts.findIndex((contact) => contact.id === contactId);
      return console.table(contacts[index]);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      const contactsList = JSON.parse(data);
      const index = contactsList.findIndex(
        (contact) => contact.id === contactId
      );
      contactsList.splice(index, 1);
      const contactsListStr = JSON.stringify(contactsList);
      fs.writeFile(contactsPath, contactsListStr, (err) => {
        if (err) console.log(err);
      });
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
      };
      const contactsList = JSON.parse(data);
      contactsList.push(newContact);
      const newContactsStr = JSON.stringify(contactsList);

      fs.writeFile(contactsPath, newContactsStr, (err) => {
        if (err) console.log(err);
      });
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
