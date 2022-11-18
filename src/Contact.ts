import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "./sharedStyles";

interface Contact {
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

const gigaChad: Contact = {
  first: "Giga",
  last: "Chad",
  avatar:
    "https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg",
  twitter: "@gigachad",
  notes: "This is GigaChad!!",
  favorite: false,
};

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
        align-items: flex-start;
        gap: 1rem;
      }
      h1 form {
        display: flex;
        align-items: center;
        margin-top: 0.25rem;
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
    `,
  ];

  @property()
  contact = gigaChad;

  render() {
    const { first, last, avatar, twitter, notes, favorite } = this.contact;
    return html`<div><img src=${avatar} /></div>
      <div>
        <h1>${first} ${last} ${favoriteToggle(favorite)}</h1>
        <p>
          <a target="_blank" href=${`https://twitter.com/${twitter}`}>
            ${twitter}
          </a>
        </p>
        <p>${notes}</p>
        <div id="edit-destroy">
          <form action="edit">
            <button type="submit">Edit</button>
          </form>
          <form method="post" action="destroy">
            <button class="destroy" type="submit">Delete</button>
          </form>
        </div>
      </div>`;
  }
}

function favoriteToggle(favorite: boolean) {
  return html`<form method="post">
    <button name="favorite" value=${favorite ? "false" : "true"}>
      ${favorite ? "★" : "☆"}
    </button>
  </form>`;
}

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
      p {
        display: flex;
        gap: 0.5rem;
        margin: 0 0 0 8rem;
      }
    `,
  ];
  render() {
    return html`<form method="post" id="contact-form">
      <label>
        <span>First name</span>
        <input type="text" name="first" />
      </label>
      <label>
        <span>Last name</span>
        <input type="text" name="last" />
      </label>
      <label>
        <span>Twitter</span>
        <input type="text" name="twitter" placeholder="@jack" />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          type="text"
          name="avatar"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" rows="6"></textarea>
      </label>
      <p>
        <button type="submit">Save</button>
        <button class="cancel" type="button">Cancel</button>
      </p>
    </form>`;
  }
}
