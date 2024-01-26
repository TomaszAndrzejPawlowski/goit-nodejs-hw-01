const opers = require("./contacts");
const contacts = require("./db/contacts.json");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log(opers.listContacts());
      break;

    case "get":
      console.log(opers.getContactById(id));
      break;

    case "add":
      console.log(opers.addContact(name, email, phone));
      break;

    case "remove":
      console.log(opers.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
