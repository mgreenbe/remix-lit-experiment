import {
  createRouter,
  createBrowserHistory,
  AgnosticRouteObject,
} from "@remix-run/router";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

const routes: AgnosticRouteObject[] = [
  {
    id: "root",
    path: "/",
    loader: (x) => {
      console.log("loader");
      console.log(x);
    },
    action: async (x) => {
      console.log("action");
      const formData = Object.fromEntries(
        (await x.request.formData()).entries()
      );
      console.log(formData);
    },
  },
];

const history = createBrowserHistory();
export const router = createRouter({ routes, history }).initialize();
console.log(router.state);

@customElement("the-router")
export class TheRouter extends LitElement {
  handleClick(e: MouseEvent) {
    e.preventDefault();
    if (e.target instanceof HTMLAnchorElement) {
      router.navigate(e.target.href);
    }
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault();
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

  render() {
    return html`<a href="/" @click=${this.handleClick}>Home</a>
      <form @submit=${this.handleSubmit}>
        <input name="input" value="blah" />
        <button name="button" value="dude">Submit</button>
      </form>`;
  }
}
