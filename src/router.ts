import {
  createRouter,
  createBrowserHistory,
  AgnosticRouteObject,
  redirect,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/router";
import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
} from "./contacts";

export interface Contact {
  id: string;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

const routes: AgnosticRouteObject[] = [
  {
    id: "root",
    path: "/",
    loader: getContacts,
    action: async () => {
      console.log("rootAction");
      const contact = await createContact();
      return redirect(`/contacts/${contact.id}/edit`);
    },

    children: [
      { id: "index", index: true },
      {
        id: "contact-view",
        path: "contacts/:contactId",
        loader: contactLoader,
        action: contactAction,
      },
      {
        id: "contact-edit",
        path: "contacts/:contactId/edit",
        loader: contactLoader,
        action: editAction,
      },
      {
        id: "contact-destroy",
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
];

async function contactLoader({ params }: LoaderFunctionArgs) {
  if (params.contactId !== undefined) {
    const contact = await getContact(params.contactId);
    return contact;
  } else {
    return null;
  }
}

async function contactAction({ request, params }: ActionFunctionArgs) {
  if (params.contactId === undefined) {
    throw new Error("(contactAction): params.contactId is undefined");
  }
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function destroyAction({ params }: LoaderFunctionArgs) {
  if (params.contactId !== undefined) {
    await deleteContact(params.contactId);
  }
  return redirect("/");
}

async function editAction({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  if (params.contactId === undefined) {
    throw new Error("params.contactId is undefined!");
  }
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

const history = createBrowserHistory();
export const router = createRouter({ routes, history }).initialize();

// router.subscribe((state) => console.log(state));
