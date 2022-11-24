import { LitElement, html, TemplateResult } from "lit";
import { styles } from "./styles";

export function indexElement(): TemplateResult {
  return html`<p id="zero-state">
    This is a demo for React Router.
    <br />
    Check out
    <a href="https://reactrouter.com/"> the docs at reactrouter.com </a>.
  </p>`;
}

export class Index extends LitElement {
  static styles = [styles];

  render() {
    return html`<p id="zero-state">
      This is a demo for React Router.
      <br />
      Check out
      <a href="https://reactrouter.com/"> the docs at reactrouter.com </a>.
    </p>`;
  }
}
