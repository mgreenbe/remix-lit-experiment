import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { styles } from "./styles";

@customElement("fancy-label")
export class FancyLabel extends LitElement {
  static get formAssociated() {
    return true;
  }

  static styles = styles;

  internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.addEventListener("click", () => {
      const control = this.internals.form?.querySelector("#name");
      if (control instanceof HTMLElement) {
        control.focus();
      }
    });
  }
  render() {
    return html`<label for="name"><slot></slot></label>`;
  }
}
