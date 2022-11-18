import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("fancy-button")
export class FancyButton extends LitElement {
  static styles = css`
    button {
      --bs-btn-padding-x: 0.75rem;
      --bs-btn-padding-y: 0.375rem;
      --bs-btn-font-family: ;
      --bs-btn-font-size: 1rem;
      --bs-btn-font-weight: 400;
      --bs-btn-line-height: 1.5;
      --bs-btn-color: #212529;
      --bs-btn-bg: transparent;
      --bs-btn-border-width: 1px;
      --bs-btn-border-color: transparent;
      --bs-btn-border-radius: 0.375rem;
      --bs-btn-hover-border-color: transparent;
      --bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15),
        0 1px 1px rgba(0, 0, 0, 0.075);
      --bs-btn-disabled-opacity: 0.65;
      --bs-btn-focus-box-shadow: 0 0 0 0.25rem
        rgba(var(--bs-btn-focus-shadow-rgb), 0.5);
      display: inline-block;
      padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
      font-family: var(--bs-btn-font-family);
      font-size: var(--bs-btn-font-size);
      font-weight: var(--bs-btn-font-weight);
      line-height: var(--bs-btn-line-height);
      color: var(--bs-btn-color);
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
      border-radius: var(--bs-btn-border-radius);
      background-color: var(--bs-btn-bg);
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }

    .primary {
      --bs-btn-color: #fff;
      --bs-btn-bg: #0d6efd;
      --bs-btn-border-color: #0d6efd;
      --bs-btn-hover-color: #fff;
      --bs-btn-hover-bg: #0b5ed7;
      --bs-btn-hover-border-color: #0a58ca;
      --bs-btn-focus-shadow-rgb: 49, 132, 253;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #0a58ca;
      --bs-btn-active-border-color: #0a53be;
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #fff;
      --bs-btn-disabled-bg: #0d6efd;
      --bs-btn-disabled-border-color: #0d6efd;
    }

    .secondary {
      --bs-btn-color: #fff;
      --bs-btn-bg: #6c757d;
      --bs-btn-border-color: #6c757d;
      --bs-btn-hover-color: #fff;
      --bs-btn-hover-bg: #5c636a;
      --bs-btn-hover-border-color: #565e64;
      --bs-btn-focus-shadow-rgb: 130, 138, 145;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #565e64;
      --bs-btn-active-border-color: #51585e;
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #fff;
      --bs-btn-disabled-bg: #6c757d;
      --bs-btn-disabled-border-color: #6c757d;
    }

    .success {
      --bs-btn-color: #fff;
      --bs-btn-bg: #198754;
      --bs-btn-border-color: #198754;
      --bs-btn-hover-color: #fff;
      --bs-btn-hover-bg: #157347;
      --bs-btn-hover-border-color: #146c43;
      --bs-btn-focus-shadow-rgb: 60, 153, 110;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #146c43;
      --bs-btn-active-border-color: #13653f;
      --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
      --bs-btn-disabled-color: #fff;
      --bs-btn-disabled-bg: #198754;
      --bs-btn-disabled-border-color: #198754;
    }
    button:not(:disabled) {
      cursor: pointer;
    }
  `;

  static get formAssociated() {
    return true;
  }

  internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.addEventListener("click", () => {
      const form = this.internals.form;
      if (form) {
        form.submit();
      }
    });
  }

  handleClick() {
    const form = this.internals.form;
    console.log(form);
  }
  render() {
    return html`<button class="success"><slot></slot></button>`;
  }
}

@customElement("fancy-input")
export class FancyInput extends LitElement {
  static get formAssociated() {
    return true;
  }

  static styles = css`
    input {
      box-sizing: border-box;
      display: block;
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 0.375rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      margin: 0;
    }

    input:focus {
      border-color: #86b7fe;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
  `;

  internals: ElementInternals;

  @property()
  value: string = "";

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

  @query("input")
  input!: HTMLInputElement | null;

  render() {
    return html`<input value=${this.value} @input=${this.handleInput} />`;
  }
}
