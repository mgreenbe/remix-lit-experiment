import localforage from "localforage";
import { defaultContacts } from "./defaultContacts";

async function seedIfNecessary() {
  const contacts = await localforage.getItem("contacts");
  if (!contacts) {
    await localforage.setItem("contacts", defaultContacts);
    console.log("No contacts found. Seeding.");
  } else {
    console.log("Contacts found.");
  }
}

seedIfNecessary();

export interface Contact {
  id: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite: boolean;
  createdAt?: number;
}

async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}

export async function getContacts() {
  await fakeNetwork();
  let contacts = await localforage.getItem("contacts");
  return (contacts ?? []) as Contact[];
}

export async function getContact(id: string) {
  await fakeNetwork();
  let contacts = (await localforage.getItem("contacts")) as Contact[];
  let contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
}

export async function createContact() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact = {
    id,
    createdAt: Date.now(),
    favorite: false,
    first: "New",
    last: "Contact",
  };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

function set(contacts: Contact[]) {
  return localforage.setItem("contacts", contacts);
}

export async function deleteContact(id: string) {
  let contacts = (await localforage.getItem("contacts")) as Contact[];
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

export async function updateContact(id: string, updates: Partial<Contact>) {
  await fakeNetwork();
  let contacts = (await localforage.getItem("contacts")) as Contact[];
  let contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error(`No contact found for ${id}.`);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

// getContacts().then((contacts) => console.log(contacts));

// export async function createContact() {
//   await fakeNetwork();
//   let id = Math.random().toString(36).substring(2, 9);
//   let contact = { id, createdAt: Date.now() };
//   let contacts = await getContacts();
//   contacts.unshift(contact);
//   await set(contacts);
//   return contact;
// }

// export async function getContact(id) {
//   await fakeNetwork(`contact:${id}`);
//   let contacts = await localforage.getItem("contacts");
//   let contact = contacts.find((contact) => contact.id === id);
//   return contact ?? null;
// }

// export async function updateContact(id, updates) {
//   await fakeNetwork();
//   let contacts = await localforage.getItem("contacts");
//   let contact = contacts.find((contact) => contact.id === id);
//   if (!contact) throw new Error("No contact found for", id);
//   Object.assign(contact, updates);
//   await set(contacts);
//   return contact;
// }

// export async function deleteContact(id) {
//   let contacts = await localforage.getItem("contacts");
//   let index = contacts.findIndex((contact) => contact.id === id);
//   if (index > -1) {
//     contacts.splice(index, 1);
//     await set(contacts);
//     return true;
//   }
//   return false;
// }

// function set(contacts) {
//   return localforage.setItem("contacts", contacts);
// }

// // fake a cache so we don't slow down stuff we've already seen
// let fakeCache = {};

// async function fakeNetwork(key) {
//   if (!key) {
//     fakeCache = {};
//   }

//   if (fakeCache[key]) {
//     return;
//   }

//   fakeCache[key] = true;
//   return new Promise((res) => {
//     setTimeout(res, Math.random() * 800);
//   });
// }
