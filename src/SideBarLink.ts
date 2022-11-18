import { css, html, nothing, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("side-bar-link")
export class SideBarLink extends LitElement {
  static styles = css`
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

    span {
      color: #eeb004;
    }
    .active > span {
      color: inherit;
    }
  `;

  @property()
  isFavorite = false;

  @property()
  class: string = "";

  render() {
    const starOrNothing = this.isFavorite
      ? html`<span>&#9733;</span>`
      : nothing;
    return html`<a class=${this.class}><slot></slot>${starOrNothing}</a>`;
  }
}
