import { LitElement, html, nothing } from "lit";
import { LoaderFunctionArgs } from "@remix-run/router";
import { state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { getContact, ContactT } from "../data";
import { router, submitHandler } from "../router_";
import { styles } from "./styles";

export function loader({ params }: LoaderFunctionArgs) {
  if (params.contactId === undefined) {
    throw new Error(`(contact loader) params.contactId is undefined!`);
  }
  return getContact(params.contactId);
}

export class Contact extends LitElement {
  static styles = [styles];

  constructor() {
    super();
    router.subscribe((state) => {
      this.contact = state.loaderData["contact-view"];
    });
  }

  @state()
  contact?: ContactT;

  render() {
    console.log(this.contact);
    if (this.contact === undefined) {
      return html`<p><i>No contact loaded!</i></p>`;
    }
    return html`<div id="contact">
      <div>
        <img
          key=${ifDefined(this.contact.avatar)}
          src=${ifDefined(this.contact.avatar)}
        />
      </div>

      <div>
        <h1>
          ${this.contact.first || this.contact.last
            ? html`${this.contact.first} ${this.contact.last}`
            : html`<i>No Name</i>`}
          ${Favorite(this.contact.favorite)}
        </h1>
        ${this.contact.twitter
          ? html`<p>
              <a
                target="_blank"
                href=${`https://twitter.com/${this.contact.twitter}`}
                >${this.contact.twitter}</a
              >
            </p>`
          : nothing}
        ${this.contact.notes ? html`<p>${this.contact.notes}</p>` : nothing}

        <div>
          <form
            method="get"
            action=${`/contacts/${this.contact.id}/edit`}
            @submit=${submitHandler}
          >
            <button type="submit">Edit</button>
          </form>
          <form
            method="post"
            action=${`/contacts/${this.contact.id}/destroy`}
            @submit=${submitHandler}
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    </div>`;
  }
}

function Favorite(favorite: boolean) {
  return html`<form method="post">
    <button
      name="favorite"
      value=${favorite ? "false" : "true"}
      aria-label=${favorite ? "Remove from favorites" : "Add to favorites"}
    >
      ${favorite ? "★" : "☆"}
    </button>
  </form>`;
}
