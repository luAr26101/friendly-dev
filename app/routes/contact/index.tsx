import { Form } from "react-router";
import type { Route } from "./+types";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const fullName = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  const data = {
    name: fullName,
    email,
    subject,
    message,
  };

  // Database create

  return { message: "Form submitted successfully.", data };
}

function ContactPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="mx-auto mt-12 max-w-3xl bg-gray-900 px-6 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">
        📫Contact me
      </h2>
      {actionData?.message ? (
        <p className="mb-6 rounded-lg border border-green-500 bg-green-700 text-center text-green-100 shadow-md">
          {actionData.message}
        </p>
      ) : null}
      <Form method="POST" className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100"
            id="name"
            name="name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100"
            id="email"
            name="email"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-300"
          >
            Subject
          </label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100"
            id="subject"
            name="subject"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300"
          >
            Message
          </label>
          <textarea
            className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100"
            id="message"
            name="message"
          />
        </div>
        <button className="w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700">
          Send Message
        </button>
      </Form>
    </div>
  );
}

export default ContactPage;
