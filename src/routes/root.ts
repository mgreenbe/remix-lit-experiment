import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { redirect } from "@remix-run/router";
import { router, linkHandler, submitHandler } from "../router_";
import { getContacts, createContact, ContactT } from "../data";
import { styles } from "./styles";

export function loader() {
  console.log("Root loader called.");
  const contacts = getContacts();
  return { contacts };
}

export function action() {
  console.log("Root action called.");
  const contact = createContact();
  console.log(contact);
  return redirect(`/contacts/${contact.id}`);
}

export class Root extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        width: 100%;
      }
    `,
    styles,
  ];

  constructor() {
    super();
    router.subscribe((state) => {
      this.contacts = state.loaderData.root.contacts;
      const childIds = state.matches.map((match) => match.route.id);
      console.log(childIds);
      if (childIds.includes("index")) {
        this.childId = "index";
      } else if (childIds.includes("contact-view")) {
        this.childId = "contact-view";
      } else if (childIds.includes("contact-edit")) {
        this.childId = "contact-edit";
      }
      console.log(this.childId);
    });
  }

  @state()
  contacts: ContactT[] = [];

  @state()
  childId?: string;

  render() {
    return html`<div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden="true" ?hidden=${true}></div>
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post" action="/" @submit=${submitHandler}>
            <button type="submit">New</button>
          </form>
        </div>
        <nav>${ContactList(this.contacts)}</nav>
      </div>
      <div id="detail"><slot name=${ifDefined(this.childId)}></slot></div>`;
  }
}

function ContactList(contacts: ContactT[]) {
  return contacts.length
    ? html`<ul>
        ${contacts.map(
          (contact) =>
            html`<li>
              <a href=${`/contacts/${contact.id}`} @click=${linkHandler}
                >${contact.first || contact.last
                  ? html`${contact.first} ${contact.last}`
                  : html`<i>No Name</i>`}</a
              >
            </li>`
        )}
      </ul>`
    : html`<p><i>No contacts</i></p>`;
}
