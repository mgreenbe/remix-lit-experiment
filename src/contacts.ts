import localforage from "localforage";

export async function getContacts() {
  let contacts = await localforage.getItem("contacts");
  return contacts;
}
