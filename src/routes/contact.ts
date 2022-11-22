import { LitElement, html, nothing } from "lit";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/router";
import { state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { getContact, updateContact, ContactT } from "../data";
import { router, submitHandler } from "../router_";
import { styles } from "./styles";

export async function action({ request, params }: ActionFunctionArgs) {
  if (params.contactId === undefined) {
    throw new Error(`(contact action) params.contactId is undefined!`);
  }
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

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
          ${Favorite(this.contact.favorite, this.contact.id)}
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

function Favorite(favorite: boolean, contactId: string) {
  return html`<form
    method="post"
    action=${`/contacts/${contactId}`}
    @submit=${submitHandler}
    data-fetcher-key="favorite"
    data-route-id="contact-view"
  >
    <button
      name="favorite"
      value=${favorite ? "false" : "true"}
      aria-label=${favorite ? "Remove from favorites" : "Add to favorites"}
    >
      ${favorite ? "★" : "☆"}
    </button>
  </form>`;
}
