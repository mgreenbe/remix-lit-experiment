import { ActionFunctionArgs, redirect } from "@remix-run/router";
import { deleteContact } from "../data";

export async function action({ params }: ActionFunctionArgs) {
  if (params.contactId === undefined) {
    throw new Error(`(destroy action) params.contactId is undefined!`);
  }
  deleteContact(params.contactId);
  return redirect("/");
}
