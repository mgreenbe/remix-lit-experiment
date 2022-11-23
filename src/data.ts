import { defaultContacts } from "./defaultContacts";
import { matchSorter } from "match-sorter";
import localforage from "localforage";

export interface ContactT {
  id: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite: boolean;
  createdAt?: number;
}

// Seed the "database", if necessary.
// Using localStorage rather than localforage here
// so it's synchronous.
let contacts = localStorage.getItem("contacts");
if (contacts === null) {
  console.log("Seeding database with default contacts.");
  localStorage.setItem("contacts", JSON.stringify(defaultContacts));
} else {
  console.log("Contacts found.");
}

export async function getContacts(query?: string) {
  await fakeNetwork(`getContacts:${query}`);
  const contacts = ((await localforage.getItem("contacts")) ??
    []) as ContactT[];
  return matchSorter(contacts, query ?? "", {
    keys: ["last", "first", "createdAt"],
  });
}

export async function createContact() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact = { id, createdAt: Date.now(), favorite: false };
  const contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`);
  const contacts = ((await localforage.getItem("contacts")) ??
    []) as ContactT[];
  const contact = contacts.find((contact) => contact.id === id) ?? null;
  return contact;
}

export async function updateContact(id: string, updates: Partial<ContactT>) {
  await fakeNetwork();
  const contacts = ((await localforage.getItem("contacts")) ??
    []) as ContactT[];
  const contact = contacts.find((contact) => contact.id === id);
  if (contact === undefined) {
    throw new Error(`No contact found for ${id}.`);
  }
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: string) {
  await fakeNetwork();
  const contacts = ((await localforage.getItem("contacts")) ??
    []) as ContactT[];
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts: ContactT[]) {
  return localforage.setItem("contacts", contacts);
}

let fakeCache: Record<string, boolean> = {};

async function fakeNetwork(key?: string) {
  if (!key) {
    fakeCache = {};
  }
  if (key && fakeCache[key]) {
    return;
  }
  if (key) {
    fakeCache[key] = true;
  }
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
