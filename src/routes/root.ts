import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import { LoaderFunctionArgs, Navigation, redirect } from "@remix-run/router";
import { router, linkHandler, submitHandler } from "../router";
import { getContacts, createContact, ContactT } from "../data";
import { styles } from "./styles";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q ?? "");
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
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
      this.q = state.loaderData.root.q;
      this.contactId = state.matches[0].params?.contactId;
      this.loading = state.navigation.state === "loading";
      this.navigation = state.navigation;
      if (this.loading) {
        console.log("loading!");
      }
      const childIds = state.matches.map((match) => match.route.id);
      if (childIds.includes("index")) {
        this.childId = "index";
      } else if (childIds.includes("contact-view")) {
        this.childId = "contact-view";
      } else if (childIds.includes("contact-edit")) {
        this.childId = "contact-edit";
      } else {
        this.childId = "error";
      }
    });
  }

  @state()
  contacts: ContactT[] = [];

  @state()
  q: string | null = null;

  @state()
  contactId?: string;

  @state()
  childId?: string;

  @state()
  loading = true;

  @state()
  navigation?: Navigation;

  @query("#q")
  searchInput!: HTMLInputElement;

  updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.get("q") !== this.q) {
      this.searchInput.value = this.q ?? "";
    }
  }

  handleInput(e: InputEvent) {
    if (e.target instanceof HTMLInputElement) {
      const form = e.target.form;
      if (form !== null) {
        form.requestSubmit();
      }
    }
  }

  render() {
    const searching =
      this.navigation?.location &&
      new URLSearchParams(this.navigation.location.search).has("q");

    return html`<div id="sidebar">
        <h1><a href="/" @click=${linkHandler}>React Router Contacts</a></h1>
        <div>
          <form
            id="search-form"
            role="search"
            action="/"
            @submit=${submitHandler}
          >
            <input
              id="q"
              class=${classMap({ loading: !!searching })}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              value=${ifDefined(this.q ?? undefined)}
              @input=${this.handleInput}
            />
            <div
              id="search-spinner"
              aria-hidden="true"
              ?hidden=${!searching}
            ></div>
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post" action="/" @submit=${submitHandler}>
            <button type="submit">New</button>
          </form>
        </div>
        <nav>${ContactList(this.contacts, this.contactId)}</nav>
      </div>
      <div id="detail" class=${classMap({ loading: this.loading })}>
        <slot name=${ifDefined(this.childId)}></slot>
      </div>`;
  }
}

function ContactList(contacts: ContactT[], activeId: string | undefined) {
  return contacts.length
    ? html`<ul>
        ${contacts.map(
          (contact) =>
            html`<li>
              <a
                href=${`/contacts/${contact.id}`}
                class=${ifDefined(
                  activeId === contact.id ? "active" : undefined
                )}
                @click=${linkHandler}
                ><span
                  >${contact.first || contact.last
                    ? html`${contact.first} ${contact.last}`
                    : html`<i>No Name</i>`}</span
                >
                ${contact.favorite
                  ? html`<span class="star">★</span>`
                  : nothing}</a
              >
            </li>`
        )}
      </ul>`
    : html`<p><i>No contacts</i></p>`;
}
