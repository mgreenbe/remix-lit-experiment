import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { styles } from "./styles";

@customElement("fancy-input")
export class FancyInput extends LitElement {
  static get formAssociated() {
    return true;
  }

  static styles = styles;

  internals: ElementInternals;

  @property()
  value: string = "";

  @property()
  placeholder: string = "";

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  handleInput() {
    const value = this.input?.value;
    if (value !== undefined) {
      this.value = value;
      this.internals.setFormValue(value);
    }
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
    console.log(this.internals.labels);
  }

  @query("input")
  input!: HTMLInputElement | null;

  render() {
    return html`<input
      value=${this.value}
      placeholder=${this.placeholder}
      @input=${this.handleInput}
    />`;
  }
}
