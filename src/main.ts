import { html, render } from "lit";
import { Root } from "./routes/root";
import { Index } from "./routes/index";
import { Contact } from "./routes/contact";
import { Edit } from "./routes/edit";
import "./index.css";

customElements.define("root-route", Root);
customElements.define("index-route", Index);
customElements.define("contact-route", Contact);
customElements.define("edit-route", Edit);

render(
  html`<root-route>
    <index-route slot="index"></index-route>
    <contact-route slot="contact-view"></contact-route>
    <edit-route slot="contact-edit"></edit-route>
    <div id="error-page" slot="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  </root-route>`,
  document.getElementById("root")!
);
