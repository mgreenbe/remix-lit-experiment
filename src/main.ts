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
  </root-route>`,
  document.getElementById("root")!
);

// import { css, html, LitElement } from "lit";
// import { customElement } from "lit/decorators.js";
// import "./RootRoute";
// import "./Contact";

// @customElement("the-router")
// export class TheRouter extends LitElement {
//   static styles = css`
//     :host {
//       display: flex;
//       height: 100%;
//       width: 100%;
//     }
//     #zero-state {
//       margin: 2rem auto;
//       text-align: center;
//       color: #818181;
//     }

//     #zero-state a {
//       color: inherit;
//     }

//     #zero-state a:hover {
//       color: #121212;
//     }

//     #zero-state:before {
//       display: block;
//       margin-bottom: 0.5rem;
//       content: url("data:image/svg+xml,%3Csvg width='50' height='33' viewBox='0 0 50 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M38.8262 11.1744C37.3975 10.7252 36.6597 10.8766 35.1611 10.7128C32.8444 10.4602 31.9215 9.55475 31.5299 7.22456C31.3108 5.92377 31.5695 4.01923 31.0102 2.8401C29.9404 0.591789 27.4373 -0.416556 24.9225 0.158973C22.7992 0.645599 21.0326 2.76757 20.9347 4.94569C20.8228 7.43263 22.2399 9.5546 24.6731 10.2869C25.8291 10.6355 27.0574 10.8109 28.2646 10.8998C30.4788 11.0613 30.6489 12.292 31.2479 13.3051C31.6255 13.9438 31.9914 14.5731 31.9914 16.4775C31.9914 18.3819 31.6231 19.0112 31.2479 19.6499C30.6489 20.6606 29.9101 21.3227 27.696 21.4865C26.4887 21.5754 25.2581 21.7508 24.1044 22.0994C21.6712 22.834 20.2542 24.9537 20.366 27.4406C20.4639 29.6187 22.2306 31.7407 24.3538 32.2273C26.8686 32.8052 29.3717 31.7945 30.4415 29.5462C31.0032 28.3671 31.3108 27.0312 31.5299 25.7304C31.9238 23.4002 32.8467 22.4948 35.1611 22.2421C36.6597 22.0784 38.2107 22.2421 39.615 21.4443C41.099 20.36 42.4248 18.7328 42.4248 16.4775C42.4248 14.2222 40.9961 11.8575 38.8262 11.1744Z' fill='%23E3E3E3'/%3E%3Cpath d='M15.1991 21.6854C12.2523 21.6854 9.84863 19.303 9.84863 16.3823C9.84863 13.4615 12.2523 11.0791 15.1991 11.0791C18.1459 11.0791 20.5497 13.4615 20.5497 16.3823C20.5497 19.3006 18.1436 21.6854 15.1991 21.6854Z' fill='%23E3E3E3'/%3E%3Cpath d='M5.28442 32.3871C2.36841 32.38 -0.00698992 29.9882 1.54551e-05 27.0652C0.00705187 24.1469 2.39884 21.7715 5.32187 21.7808C8.24022 21.7878 10.6156 24.1796 10.6063 27.1027C10.5992 30.0187 8.20746 32.3941 5.28442 32.3871Z' fill='%23E3E3E3'/%3E%3Cpath d='M44.736 32.387C41.8107 32.4033 39.4096 30.0373 39.3932 27.1237C39.3769 24.1984 41.7428 21.7973 44.6564 21.7808C47.5817 21.7645 49.9828 24.1305 49.9993 27.0441C50.0156 29.9671 47.6496 32.3705 44.736 32.387Z' fill='%23E3E3E3'/%3E%3C/svg%3E%0A");
//     }
//   `;
//   render() {
//     return html`<root-route>
//       <p slot="index" id="zero-state">
//         This is a demo for Remix Router.<br />Check out
//         <a href="https://www.npmjs.com/package/@remix-run/router">the docs</a>!
//       </p>
//       <contact-view slot="contact-view"></contact-view>
//       <contact-edit slot="contact-edit"></contact-edit>
//     </root-route>`;
//   }
// }

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
