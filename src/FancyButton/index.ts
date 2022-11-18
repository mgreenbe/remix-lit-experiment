import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styles } from "./styles";

@customElement("fancy-button")
export class FancyButton extends LitElement {
  static styles = styles;

  static get formAssociated() {
    return true;
  }

  internals: ElementInternals;

  @property()
  class = "";

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.addEventListener("click", () => {
      const form = this.internals.form;
      if (form) {
        form.requestSubmit();
      }
    });
  }

  handleClick() {
    const form = this.internals.form;
    console.log(form);
  }
  render() {
    return html`<button class=${this.class}><slot></slot></button>`;
  }
}
