import {
  createRouter,
  createBrowserHistory,
  AgnosticRouteObject,
  RouterNavigateOptions,
  FormMethod,
} from "@remix-run/router";
import { action as rootAction, loader as rootLoader } from "./routes/root";
import { loader as contactLoader } from "./routes/contact";
import { action as editAction } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";

const routes: AgnosticRouteObject[] = [
  {
    id: "root",
    path: "/",
    action: rootAction,
    loader: rootLoader,
    children: [
      { id: "index", index: true },
      {
        id: "contact-view",
        path: "contacts/:contactId",
        loader: contactLoader,
      },
      {
        id: "contact-edit",
        path: "contacts/:contactId/edit",
        action: editAction,
        loader: contactLoader,
      },
      {
        id: "contact-destroy",
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
];

const history = createBrowserHistory();
export const router = createRouter({ routes, history }).initialize();

export function linkHandler(e: Event) {
  console.log("Link Handler");
  if (!(e.target instanceof HTMLAnchorElement)) {
    throw new Error(
      "(link handler) event target must be an instance of HTMLAnchorElement."
    );
  }
  e.preventDefault();
  router.navigate(e.target.href);
}

export function submitHandler(e: SubmitEvent) {
  console.log("Submit handler");
  if (!(e.target instanceof HTMLFormElement)) {
    throw new Error(
      "(submit handler) event target must be an instance of HTMLFormElement."
    );
  }
  const action = e.target.getAttribute("action");
  if (action === null) {
    throw new Error("(submit handler) action attribute  must be nonnull.");
  }
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = e.submitter?.getAttribute("name");
  if (name) {
    const value = e.submitter?.getAttribute("value") ?? "";
    formData.set(name, value);
  }
  const formMethod = (e.target.getAttribute("method") ?? "get") as FormMethod;
  const opts: RouterNavigateOptions = { formData, formMethod };
  router.navigate(action, opts);
}

router.subscribe(console.log);
