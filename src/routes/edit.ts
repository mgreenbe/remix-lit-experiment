import { ActionFunctionArgs, redirect, RouterState } from "@remix-run/router";
import { html } from "lit";
import { ContactT, updateContact } from "../data";
import { router, submitHandler } from "../router";

export async function action({ request, params }: ActionFunctionArgs) {
  if (params.contactId === undefined) {
    throw new Error(`(contact loader) params.contactId is undefined!`);
  }
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export function editElement(state: RouterState) {
  const contact = state.loaderData?.edit as ContactT;
  return html`<form
    method="post"
    action=${`contacts/${contact.id}/edit`}
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
        value=${contact.first ?? ""}
      />
      <input
        placeholder="Last"
        aria-label="Last name"
        type="text"
        name="last"
        value=${contact.last ?? ""}
      />
    </p>
    <label>
      <span>Twitter</span>
      <input
        type="text"
        name="twitter"
        placeholder="@jack"
        value=${contact.twitter ?? ""}
      />
    </label>
    <label>
      <span>Avatar URL</span>
      <input
        placeholder="https://example.com/avatar.jpg"
        aria-label="Avatar URL"
        type="text"
        name="avatar"
        value=${contact.avatar ?? ""}
      />
    </label>
    <label>
      <span>Notes</span>
      <textarea name="notes" rows="6" .value=${contact.notes ?? ""}></textarea>
    </label>
    <p>
      <button type="submit">Save</button>
      <button type="button" @click=${() => router.navigate(-1)}>Cancel</button>
    </p>
  </form>`;
}
