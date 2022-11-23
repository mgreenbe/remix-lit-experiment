import {
  createRouter,
  createBrowserHistory,
  AgnosticRouteObject,
  FormMethod,
} from "@remix-run/router";
import { action as rootAction, loader as rootLoader } from "./routes/root";
import {
  action as contactAction,
  loader as contactLoader,
} from "./routes/contact";
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
        action: contactAction,
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
      { id: "error", path: "*" },
    ],
  },
];

const history = createBrowserHistory();
export const router = createRouter({ routes, history }).initialize();

export function linkHandler(e: Event) {
  e.preventDefault();
  let anchor = e
    .composedPath()
    .find((t): t is HTMLAnchorElement => t instanceof HTMLAnchorElement);
  if (anchor === undefined) {
    throw new Error(
      "(link handler) event must have an anchor element in its composed path."
    );
  }
  router.navigate(anchor.href);
}

export function submitHandler(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target;
  if (!(form instanceof HTMLFormElement)) {
    throw new Error(
      "(submit handler) event target must be an instance of HTMLFormElement."
    );
  }
  const action = form.getAttribute("action");
  if (action === null) {
    throw new Error("(submit handler) action attribute  must be nonnull.");
  }
  const formData = new FormData(form);
  const name = e.submitter?.getAttribute("name");
  if (name) {
    const value = e.submitter?.getAttribute("value") ?? "";
    formData.set(name, value);
  }

  const formMethod = (form.getAttribute("method") ?? "get") as FormMethod;
  if (formMethod === "get") {
    console.log("get");
    const search = new URLSearchParams(formData as any).toString(); //  👎
    router.navigate({ pathname: action, search });
  }

  const opts = { formData, formMethod };

  const fetcherKey = form.dataset.fetcherKey;
  if (fetcherKey === undefined) {
    router.navigate(action, opts);
  } else {
    const routeId = form.dataset.routeId;
    if (routeId === undefined) {
      throw new Error("When fetcherKey is defined, routeId must be, too.");
    }
    router.fetch(fetcherKey, routeId, action, opts);
  }
}

console.log(router);
router.subscribe(console.log);
