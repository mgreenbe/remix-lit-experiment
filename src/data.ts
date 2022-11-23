import { defaultContacts } from "./defaultContacts";
import { matchSorter } from "match-sorter";

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

let contacts = localStorage.getItem("contacts");
if (contacts === null) {
  localStorage.setItem("contacts", JSON.stringify(defaultContacts));
}

export async function getContacts(query?: string) {
  await fakeNetwork();
  const contacts = localStorage.getItem("contacts");
  const parsedContacts =
    contacts === null ? [] : (JSON.parse(contacts) as ContactT[]);
  return matchSorter(parsedContacts, query ?? "", {
    keys: ["last", "first", "createdAt"],
  });
}

export async function getContact(id: string) {
  const contacts = await getContacts();
  const contact = contacts.find((contact) => contact.id === id) ?? null;
  return contact;
}

export async function createContact() {
  const contacts = await getContacts();
  let id = Math.random().toString(36).substring(2, 9);
  let contact = { id, createdAt: Date.now(), favorite: false };
  contacts.unshift(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  return contact;
}

export async function deleteContact(id: string) {
  const contacts = await getContacts();
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    return true;
  }
  return false;
}

export async function updateContact(id: string, updates: Partial<ContactT>) {
  const contacts = await getContacts();
  const contact = contacts.find((contact) => contact.id === id);
  if (contact === undefined) {
    throw new Error(`No contact found for ${id}.`);
  }
  Object.assign(contact, updates);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  return contact;
}

async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
