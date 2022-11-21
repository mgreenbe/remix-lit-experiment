import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "./sharedStyles";
import { router, Contact } from "./router";

@customElement("contact-view")
export class ContactView extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        max-width: 40rem;
        display: flex;
      }

      img {
        width: 12rem;
        height: 12rem;
        background: #c8c8c8;
        margin-right: 2rem;
        border-radius: 1.5rem;
        object-fit: cover;
      }

      h1 {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
        line-height: 1.2;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      a {
        display: flex;
        font-size: 1.5rem;
        color: #3992ff;
        text-decoration: none;
      }
      h1 + p {
        margin: 0px;
      }
      #edit-destroy {
        display: flex;
        gap: 0.5rem;
        margin: 1rem 0;
      }
      button[value="true"] {
        padding: 0;
        font-size: inherit;
        box-shadow: none;
        color: #a4a4a4;
      }
      button[value="true"]:hover,
      button[value="false"] {
        padding: 0;
        font-size: inherit;
        box-shadow: none;
        color: #eeb004;
      }
    `,
  ];

  constructor() {
    super();

    router.subscribe((state) => {
      this.contact = state.loaderData["contact-view"];
      this.formData = state.fetchers.get("favorite")?.formData;
      // console.log(state.fetchers.get("favorite")?.formData);
    });
  }

  @property()
  formData?: FormData;

  @property()
  contact?: Contact;

  handleEdit(e: SubmitEvent) {
    console.log("Handle edit");
    e.preventDefault();
    router.navigate(`/contacts/${this.contact?.id}/edit`);
  }

  handleDestroy(e: SubmitEvent) {
    e.preventDefault();
    console.log("Handle destroy");
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      const name = e.submitter?.getAttribute("name");
      if (name) {
        const value = e.submitter?.getAttribute("value") ?? "";
        formData.set(name, value);
      }
      router.navigate(`/contacts/${this.contact?.id}/destroy`, {
        formMethod: "post",
        formData,
      });
    }
  }

  handleFavorite(e: SubmitEvent) {
    e.preventDefault();
    console.log("Handle favorite");
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      const name = e.submitter?.getAttribute("name");
      if (name) {
        const value = e.submitter?.getAttribute("value") ?? "";
        formData.set(name, value);
      }
      router.fetch(
        "favorite",
        "contact-view",
        `/contacts/${this.contact?.id}`,
        {
          formMethod: "post",
          formData,
        }
      );
    }
  }

  render() {
    if (this.formData) {
      console.log(Object.fromEntries(this.formData.entries()));
    } else {
      console.log(this.formData);
    }

    if (this.contact === undefined) {
      return html`<p>Loading...</p>`;
    }

    let favorite = this.contact.favorite;
    if (this.formData) {
      favorite = this.formData.get("favorite") === "true";
    }
    const { first, last, avatar, twitter, notes } = this.contact;
    return html`<div><img src=${avatar} /></div>
      <div>
        <h1>
          <span>${first} ${last}</span>
          <form @submit=${this.handleFavorite}>
            <button name="favorite" value=${favorite ? "false" : "true"}>
              ${favorite ? "★" : "☆"}
            </button>
          </form>
        </h1>
        <p>
          <a target="_blank" href=${`https://twitter.com/${twitter}`}>
            ${twitter}
          </a>
        </p>
        <p>${notes}</p>
        <div id="edit-destroy">
          <form @submit=${this.handleEdit}>
            <button type="submit">Edit</button>
          </form>
          <form @submit=${this.handleDestroy}>
            <button class="destroy" type="submit">Delete</button>
          </form>
        </div>
      </div>`;
  }
}

// function favoriteToggle(favorite: boolean) {
//   return html`<form>
//     <button name="favorite" value=${favorite ? "false" : "true"}>
//       ${favorite ? "★" : "☆"}
//     </button>
//   </form>`;
// }

@customElement("contact-edit")
export class ContactEdit extends LitElement {
  static styles = [
    sharedStyles,
    css`
      #contact-form {
        display: flex;
        max-width: 40rem;
        flex-direction: column;
        gap: 1rem;
      }
      label {
        display: flex;
      }
      span {
        width: 8rem;
      }
      input,
      textarea {
        flex-grow: 2;
      }
      div {
        display: flex;
        gap: 0.5rem;
        margin: 1rem 0 0 8rem;
      }
    `,
  ];

  constructor() {
    super();

    router.subscribe((state) => {
      this.contact = state.loaderData["contact-edit"];
    });
  }

  @property()
  contact?: Contact;

  handleSave(e: SubmitEvent) {
    e.preventDefault();
    console.log("Handle save");
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      console.log(Object.fromEntries(formData.entries()));
      router.navigate(`/contacts/${this.contact?.id}/edit`, {
        formMethod: "post",
        formData,
      });
    }
  }

  handleCancel() {
    console.log("Handle cancel");
    router.navigate(`/contacts/${this.contact?.id}`);
  }

  render() {
    if (this.contact === undefined) {
      return html`Loading...`;
    }
    const { first, last, twitter, avatar, notes } = this.contact;
    return html`<form id="contact-form" @submit=${this.handleSave}>
      <label>
        <span>First name</span>
        <input type="text" name="first" value=${first ?? ""} />
      </label>
      <label>
        <span>Last name</span>
        <input type="text" name="last" value=${last ?? ""} />
      </label>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          value=${twitter ?? ""}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          type="text"
          name="avatar"
          value=${avatar ?? ""}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" rows="6">${notes ?? ""}</textarea>
      </label>
      <div>
        <button type="submit">Save</button>
        <button class="cancel" type="button" @click=${this.handleCancel}>
          Cancel
        </button>
      </div>
    </form>`;
  }
}
