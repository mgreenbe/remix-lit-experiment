import { ActionFunctionArgs, redirect } from "@remix-run/router";
import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";
import { ContactT, updateContact } from "../data";
import { router, submitHandler } from "../router_";
import { styles } from "./styles";

export async function action({ request, params }: ActionFunctionArgs) {
  console.log("edit action");
  if (params.contactId === undefined) {
    throw new Error(`(contact loader) params.contactId is undefined!`);
  }
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export class Edit extends LitElement {
  static styles = [styles];

  constructor() {
    super();
    router.subscribe((state) => {
      this.contact = state.loaderData["contact-edit"];
    });
  }

  @state()
  contact?: ContactT;

  render() {
    if (this.contact === undefined) {
      return html`<p><i>No contact loaded!!!</i></p>`;
    } else {
      return html`<form
        method="post"
        action=${`contacts/${this.contact.id}/edit`}
        @submit=${submitHandler}
        id="contact-form"
      >
        <p>
          <span>Name</span>
          <input
            placeholder="First"
            aria-label="First name"
            type="text"
            name="first"
            value=${this.contact.first ?? ""}
          />
          <input
            placeholder="Last"
            aria-label="Last name"
            type="text"
            name="last"
            value=${this.contact.last ?? ""}
          />
        </p>
        <label>
          <span>Twitter</span>
          <input
            type="text"
            name="twitter"
            placeholder="@jack"
            value=${this.contact.twitter ?? ""}
          />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            value=${this.contact.avatar ?? ""}
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea
            name="notes"
            rows="6"
            .value=${this.contact.notes ?? ""}
          ></textarea>
        </label>
        <p>
          <button type="submit">Save</button>
          <button type="button" @click=${() => router.navigate(-1)}>
            Cancel
          </button>
        </p>
      </form>`;
    }
  }
}
