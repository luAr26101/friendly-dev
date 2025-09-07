function ContactPage() {
  return (
    <div className="mx-auto mt-12 max-w-3xl bg-gray-900 px-6 py-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">
        📫Contact me
      </h2>
      <form action="" className="space-y-6">
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
      </form>
    </div>
  );
}

export default ContactPage;
