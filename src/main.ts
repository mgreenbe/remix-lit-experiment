import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

// export { FancyButton } from "./FancyButton";
// export { FancyInput } from "./FancyInput";
export { FancyLabel } from "./FancyLabel";
export { SideBarLink } from "./SideBarLink";

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
  favorite: true,
};

@customElement("contact-edit")
export class ContactEdit extends LitElement {
  static styles = css`
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
    fancy-input,
    textarea {
      flex-grow: 2;
    }
    p {
      display: flex;
      gap: 0.5rem;
      margin: 0 0 0 8rem;
    }
    textarea {
      font-size: 1rem;
      font-family: inherit;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 0.75rem;
      box-shadow: 0 0px 1px hsl(0deg 0% 0% / 20%),
        0 1px 2px hsl(0deg 0% 0% / 20%);
      background-color: white;
      line-height: 1.5;
      margin: 0;
    }
  `;
  render() {
    return html`<form method="post" id="contact-form">
      <label>
        <span>First name</span>
        <fancy-input type="text" name="first"></fancy-input>
      </label>
      <label>
        <span>Last name</span>
        <fancy-input type="text" name="last"></fancy-input>
      </label>
      <label>
        <span>Twitter</span>
        <fancy-input
          type="text"
          name="twitter"
          placeholder="@jack"
        ></fancy-input>
      </label>
      <label>
        <span>Avatar URL</span>
        <fancy-input
          placeholder="https://example.com/avatar.jpg"
          type="text"
          name="avatar"
        ></fancy-input>
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" rows="6"></textarea>
      </label>
      <p>
        <fancy-button type="submit">Save</fancy-button>
        <fancy-button class="cancel" type="button">Cancel</fancy-button>
      </p>
    </form>`;
  }
}

@customElement("contact-view")
export class ContactView extends LitElement {
  static styles = css`
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
    button {
      box-shadow: none;
      font-family: inherit;
      font-size: 1.5rem;
      font-weight: 400;
      padding: 0;
      border: none;
      border-radius: 8px;
      background-color: white;
      line-height: 1.5;
      margin: 0;
    }
    button[value="true"] {
      color: #a4a4a4;
    }
    button[value="false"] {
      color: #eeb004;
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
  `;

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
            <fancy-button type="submit">Edit</fancy-button>
          </form>
          <form method="post" action="destroy">
            <fancy-button class="destroy" type="submit">Delete</fancy-button>
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

@customElement("fancy-input")
export class FancyInput extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
    }
    input {
      box-sizing: inherit;
      font-size: 1rem;
      font-family: inherit;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 0.75rem;
      box-shadow: 0 0px 1px hsl(0deg 0% 0% / 20%),
        0 1px 2px hsl(0deg 0% 0% / 20%);
      background-color: white;
      line-height: 1.5;
      margin: 0;
      width: 100%;
    }
    input[type="search"] {
      width: 100%;
      padding-left: 2rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='%23999' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' /%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: 0.625rem 0.75rem;
      background-size: 1rem;
      position: relative;
    }
    input:hover {
      box-shadow: 0 0px 1px hsl(0deg 0% 0% / 60%),
        0 1px 2px hsl(0deg 0% 0% / 20%);
    }
  `;

  @property()
  name?: string;

  @property()
  type?: "text" | "search";

  @property()
  placeholder?: string;

  render() {
    return html`<input
      name=${ifDefined(this.name)}
      type=${ifDefined(this.type)}
      placeholder=${ifDefined(this.placeholder)}
    />`;
  }
}

@customElement("fancy-button")
export class FancyButton extends LitElement {
  static styles = css`
    button {
      color: #3992ff;
      font-weight: 500;
      font-size: 1rem;
      font-family: inherit;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 0.75rem;
      box-shadow: 0 0px 1px hsl(0deg 0% 0% / 20%),
        0 1px 2px hsl(0deg 0% 0% / 20%);
      background-color: white;
      line-height: 1.5;
      margin: 0;
    }
    button:hover {
      box-shadow: 0 0px 1px hsl(0deg 0% 0% / 60%),
        0 1px 2px hsl(0deg 0% 0% / 20%);
    }
    button.destroy {
      color: #f44250;
    }
    button.cancel {
      color: inherit;
    }
  `;

  @property()
  class?: string;
  render() {
    return html`<button type="submit" class=${ifDefined(this.class)}>
      <slot></slot>
    </button>`;
  }
}

@customElement("side-bar")
export class SideBar extends LitElement {
  static styles = css`
    :host {
      width: 22rem;
      background-color: #f7f7f7;
      border-right: solid 1px #e3e3e3;
      display: flex;
      flex-direction: column;
    }
  `;

  render() {
    return html` <side-bar-actions></side-bar-actions>
      <side-bar-nav></side-bar-nav>
      <side-bar-footer></side-bar-footer>`;
  }
}

@customElement("side-bar-actions")
export class SideBarActions extends LitElement {
  static styles = css`
    :host {
      padding-left: 2rem;
      padding-right: 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e3e3e3;
    }
  `;

  render() {
    return html`
      <form>
        <fancy-input type="search" placeholder="Search"></fancy-input>
      </form>
      <form><fancy-button>New</fancy-button></form>
    `;
  }
}

@customElement("side-bar-nav")
export class SideBarNav extends LitElement {
  static styles = css`
    :host {
      padding-left: 2rem;
      padding-right: 2rem;
      flex: 1;
      overflow: auto;
      padding-top: 1rem;
    }
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    li {
      margin: 0.25rem 0;
    }
  `;

  render() {
    return html`<ul>
      <li><side-bar-link isFavorite=${true}>Giga Chad</side-bar-link></li>
      <side-bar-link>Franz Mustermann</side-bar-link>
      <li>
        <side-bar-link class="active" isFavorite=${true}
          >Dude Man</side-bar-link
        >
      </li>
      <li>
        <side-bar-link>Johnny Boy</side-bar-link>
      </li>
    </ul>`;
  }
}

@customElement("side-bar-footer")
export class SideBarFooter extends LitElement {
  static styles = css`
    :host {
      order: 1;
    }
    h1 {
      font-size: 1rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      margin: 0;
      padding: 1rem 2rem;
      border-top: 1px solid #e3e3e3;
      line-height: 1;
    }
    h1::before {
      content: url("data:image/svg+xml,%3Csvg width='25' height='18' viewBox='0 0 25 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.4127 6.4904C18.6984 6.26581 18.3295 6.34153 17.5802 6.25965C16.4219 6.13331 15.9604 5.68062 15.7646 4.51554C15.6551 3.86516 15.7844 2.9129 15.5048 2.32334C14.9699 1.19921 13.7183 0.695046 12.461 0.982805C11.3994 1.22611 10.516 2.28708 10.4671 3.37612C10.4112 4.61957 11.1197 5.68054 12.3363 6.04667C12.9143 6.22097 13.5284 6.3087 14.132 6.35315C15.2391 6.43386 15.3241 7.04923 15.6236 7.55574C15.8124 7.87508 15.9954 8.18975 15.9954 9.14193C15.9954 10.0941 15.8112 10.4088 15.6236 10.7281C15.3241 11.2334 14.9547 11.5645 13.8477 11.6464C13.244 11.6908 12.6288 11.7786 12.0519 11.9528C10.8353 12.3201 10.1268 13.3799 10.1828 14.6234C10.2317 15.7124 11.115 16.7734 12.1766 17.0167C13.434 17.3056 14.6855 16.8003 15.2204 15.6762C15.5013 15.0866 15.6551 14.4187 15.7646 13.7683C15.9616 12.6032 16.423 12.1505 17.5802 12.0242C18.3295 11.9423 19.1049 12.0242 19.8071 11.6253C20.5491 11.0832 21.212 10.2696 21.212 9.14192C21.212 8.01428 20.4976 6.83197 19.4127 6.4904Z' fill='%23F44250'/%3E%3Cpath d='M7.59953 11.7459C6.12615 11.7459 4.92432 10.5547 4.92432 9.09441C4.92432 7.63407 6.12615 6.44287 7.59953 6.44287C9.0729 6.44287 10.2747 7.63407 10.2747 9.09441C10.2747 10.5536 9.07172 11.7459 7.59953 11.7459Z' fill='black'/%3E%3Cpath d='M2.64217 17.0965C1.18419 17.093 -0.0034949 15.8971 7.72743e-06 14.4356C0.00352588 12.9765 1.1994 11.7888 2.66089 11.7935C4.12004 11.797 5.30772 12.9929 5.30306 14.4544C5.29953 15.9123 4.10366 17.1 2.64217 17.0965Z' fill='black'/%3E%3Cpath d='M22.3677 17.0965C20.9051 17.1046 19.7046 15.9217 19.6963 14.4649C19.6882 13.0023 20.8712 11.8017 22.3279 11.7935C23.7906 11.7854 24.9911 12.9683 24.9993 14.4251C25.0075 15.8866 23.8245 17.0883 22.3677 17.0965Z' fill='black'/%3E%3C/svg%3E%0A");
      margin-right: 0.5rem;
      position: relative;
      top: 1px;
    }
  `;
  render() {
    return html`<h1>Remix Router Contacts</h1>`;
  }
}

@customElement("detail-pane")
export class DetailPane extends LitElement {
  static styles = css`
    :host {
      flex: 1;
      padding: 2rem 4rem;
      width: 100%;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

// import {
//   createRouter,
//   createBrowserHistory,
//   UNSAFE_convertRoutesToDataRoutes,
//   AgnosticRouteObject,
// } from "@remix-run/router";

// const routes: AgnosticRouteObject[] = [
//   {
//     path: "/",
//     loader: () => {
//       return "from root loader";
//     },
//     children: [
//       { path: "about", loader: () => "from about loader" },
//       { path: "contact", loader: () => "from contact loader" },
//     ],
//   },
// ];

// const dataRoutes = UNSAFE_convertRoutesToDataRoutes(routes);

// const history = createBrowserHistory();
// const router = createRouter({ routes: dataRoutes, history });

// const app = document.getElementById("app");
// app?.addEventListener("click", (event) => {
//   const target = event.target;
//   if (target instanceof HTMLAnchorElement) {
//     event.preventDefault();
//     event.stopImmediatePropagation();
//     const href = target.getAttribute("href");
//     if (href !== null) {
//       router.navigate(href);
//     }
//   }
// });

// router.initialize();

// router.subscribe((state) => {
//   console.log(state);
// });
