import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { sharedStyles } from "./sharedStyles";
import { router, Contact } from "./router";
import { Navigation } from "@remix-run/router";

@customElement("root-route")
export class RootRoute extends LitElement {
  static styles = css`
    :host {
      display: flex;
      height: 100%;
      width: 100%;
    }
    #detail {
      flex: 1;
      padding: 2rem 4rem;
      width: 100%;
    }
  `;

  @state()
  name = router.state.matches[1].route.id;

  @state()
  contacts?: Contact[] = router.state.loaderData?.root?.contacts;

  @state()
  q: string | null = null;

  @state()
  navigation?: Navigation;

  constructor() {
    super();

    router.subscribe((state) => {
      this.name = state.matches[1].route.id;
      this.contacts = state.loaderData?.root?.contacts;
      this.q = state.loaderData?.root?.q;
      this.navigation = state.navigation;
    });

    this.addEventListener("click", (event) => {
      const anchor = event
        .composedPath()
        .find((x): x is HTMLAnchorElement => x instanceof HTMLAnchorElement);
      if (anchor) {
        event.preventDefault();
        const href = anchor.getAttribute("href");
        if (href !== null) {
          router.navigate(href);
        }
      }
    });
  }

  render() {
    return html`<side-bar
        .contacts=${this.contacts}
        .q=${this.q}
        .navigation=${this.navigation}
      ></side-bar>
      <div id="detail"><slot name=${this.name}></slot></div>`;
  }
}

@customElement("side-bar")
export class SideBar extends LitElement {
  @property()
  contacts?: Contact[];

  @property()
  q: string | null = null;

  @property()
  navigation?: Navigation;

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
    return html`<side-bar-actions
        .q=${this.q}
        .navigation=${this.navigation}
      ></side-bar-actions>
      <side-bar-nav .contacts=${this.contacts}></side-bar-nav>
      <side-bar-footer></side-bar-footer>`;
  }
}

@customElement("side-bar-actions")
export class SideBarActions extends LitElement {
  static styles = [
    sharedStyles,
    css`
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

      input[type="search"].loading {
        background-image: none;
      }

      #search-spinner {
        width: 1rem;
        height: 1rem;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%23000' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9' /%3E%3C/svg%3E");
        animation: spin 1s infinite linear;
        position: absolute;
        left: 0.625rem;
        top: 0.75rem;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ];

  @property()
  q: string | null = null;

  @property()
  navigation?: Navigation;

  updated(changedProperties: PropertyValues<this>) {
    // console.log(`old = ${changedProperties.get("q")}, new = ${this.q}`);
    if (this.q !== changedProperties.get("q")) {
      if (this.input) {
        this.input.value = this.q ?? "";
      }
    }
  }

  @query("input")
  input?: HTMLInputElement;

  handleNew(e: SubmitEvent) {
    e.preventDefault();
    console.log("Submitting!");
    if (e.target instanceof HTMLFormElement) {
      const formData = new FormData(e.target);
      const name = e.submitter?.getAttribute("name");
      if (name) {
        const value = e.submitter?.getAttribute("value") ?? "";
        formData.set(name, value);
      }
      router.navigate("/", { formMethod: "post", formData });
    }
  }

  handleSearch(e: SubmitEvent) {
    e.preventDefault();
    console.log("Submitting!");
    if (e.target instanceof HTMLFormElement) {
      const formData = Array.from(new FormData(e.target).entries()).map(
        ([k, v]) => [k, String(v)] as [string, string]
      );
      const search = new URLSearchParams(formData).toString();
      router.navigate({ pathname: "/", search });
    }
  }

  async handleInput(e: InputEvent) {
    const form = (e.target as HTMLInputElement).form!;
    const formData = Array.from(new FormData(form).entries()).map(
      ([k, v]) => [k, String(v)] as [string, string]
    );
    const search = new URLSearchParams(formData).toString();
    const isFirstSearch = this.q == null;
    router.navigate({ pathname: "/", search }, { replace: !isFirstSearch });
  }

  render() {
    const location = this.navigation?.location;
    const searching = location && new URLSearchParams(location.search).has("q");

    return html`
      <form @submit=${this.handleSearch}>
        <input
          id="q"
          class=${searching ? "loading" : ""}
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
          value=${this.q ?? ""}
          @input=${this.handleInput}
        />
        <div id="search-spinner" aria-hidden="true" ?hidden=${!searching}></div>
        <div className="sr-only" aria-live="polite"></div>
      </form>
      <form id="new" @submit=${this.handleNew}>
        <button type="submit">New</button>
      </form>
    `;
  }
}

@customElement("side-bar-nav")
export class SideBarNav extends LitElement {
  @property()
  contacts?: Contact[];

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
    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      white-space: pre;
      padding: 0.5rem;
      border-radius: 8px;
      color: inherit;
      text-decoration: none;
      gap: 1rem;
    }

    a:hover {
      background: #e3e3e3;
    }

    a.active {
      background: hsl(224, 98%, 58%);
      color: white;
    }

    span.favorite {
      color: #eeb004;
    }
    .active > span {
      color: inherit;
    }
  `;

  render() {
    return this.contacts
      ? html`<ul>
          ${this.contacts.map(
            ({ id, first, last, favorite }) =>
              html`<li>
                <a href=${`/contacts/${id}`}
                  ><span>${first} ${last}</span> ${favorite
                    ? html`<span class="favorite">★</span>`
                    : nothing}</a
                >
              </li>`
          )}
        </ul>`
      : html`<p>Contacts is undefined</p>`;
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
    a {
      text-decoration: none;
    }
  `;
  render() {
    return html`<h1><a href="/">Remix Router Contacts</a></h1>`;
  }
}
