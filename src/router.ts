import {
  createRouter,
  createBrowserHistory,
  // AgnosticRouteObject,
  FormMethod,
  RouterState,
  AgnosticRouteMatch,
  AgnosticDataRouteObject,
} from "@remix-run/router";
import {
  // action as rootAction,
  loader as rootLoader,
  rootElement,
} from "./routes/root";
import {
  contactElement,
  //   action as contactAction,
  loader as contactLoader,
} from "./routes/contact";
import { TemplateResult, nothing, render } from "lit";
// import { action as editAction } from "./routes/edit";
// import { action as destroyAction } from "./routes/destroy";

type Element = (
  state: RouterState,
  child?: TemplateResult | typeof nothing
) => TemplateResult | typeof nothing;

type Match = AgnosticRouteMatch<
  string,
  AgnosticDataRouteObject & { element: Element }
>;
export function renderMatches(state: RouterState, target: HTMLElement): void {
  console.log(state);
  let template: TemplateResult | typeof nothing = nothing;
  const n = state.matches.length;
  if (n > 0) {
    const match = state.matches[n - 1] as Match;
    template = match.route.element(state);
    for (let i = n - 2; i >= 0; i--) {
      const match = state.matches[i] as Match;
      template = match.route.element(state, template);
    }
  }
  render(template, target);
}

const routes = [
  {
    id: "root",
    path: "/",
    loader: rootLoader,
    element: rootElement,
    children: [
      {
        id: "contact",
        path: "contacts/:contactId",
        element: contactElement,
        loader: contactLoader,
      },
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
