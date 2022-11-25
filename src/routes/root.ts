import { html, nothing, TemplateResult } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import { LoaderFunctionArgs, redirect, RouterState } from "@remix-run/router";
import { linkHandler, submitHandler } from "../router";
import { getContacts, createContact, ContactT } from "../data";

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

export function rootElement(
  state: RouterState,
  child: TemplateResult | typeof nothing
): TemplateResult | typeof nothing {
  const contacts: ContactT[] = state?.loaderData?.root?.contacts ?? [];
  const q: string = state?.loaderData?.root?.q ?? "";
  const activeId = state?.matches[0].params?.contactId;
  const loading = state.navigation.state === "loading";
  const input = document.getElementById("q");
  const searching = Boolean(
    state.navigation.location &&
      new URLSearchParams(state.navigation.location.search).has("q")
  );
  if (input instanceof HTMLInputElement) {
    input.value = q;
  }

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
            class=${classMap({ loading: searching })}
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            value=${q}
            @input=${handleInput}
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
      <nav>${ContactList(contacts, activeId)}</nav>
    </div>
    <div id="detail" class=${classMap({ loading })}>${child}</div>`;
}

function handleInput(e: InputEvent) {
  if (e.target instanceof HTMLInputElement) {
    const form = e.target.form;
    if (form !== null) {
      form.requestSubmit();
    }
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
