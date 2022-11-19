import {
  createRouter,
  createBrowserHistory,
  AgnosticRouteObject,
  redirect,
} from "@remix-run/router";
import { data } from "./data";

const routes: AgnosticRouteObject[] = [
  {
    id: "root",
    path: "/",
    loader: () => {
      console.log("rootLoader");
      return { ...data };
    },
    action: () => {
      console.log("rootAction");
      data.Z3FYfr3J = {
        first: "Dude",
        last: "Man",
        avatar: "",
        twitter: "",
        notes: "",
        favorite: true,
      };
      return redirect(`/contacts/Z3FYfr3J/edit`);
    },

    children: [
      { id: "index", index: true },
      { id: "contact-view", path: "contacts/:contactId" },
      { id: "contact-edit", path: "contacts/:contactId/edit" },
    ],
  },
];

const history = createBrowserHistory();
export const router = createRouter({ routes, history }).initialize();
