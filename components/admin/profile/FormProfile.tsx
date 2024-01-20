const FormProfile = () => {
  return (
    <main className="flex w-full">
      <div className="flex h-screen flex-1 items-center justify-center">
        <div className="w-full max-w-md space-y-8 bg-white px-4 text-gray-600 sm:px-0">
          <div className="">
            <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Personal information
            </h3>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                required
                className="bg-transparent mt-2 w-full rounded-lg border px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="bg-transparent mt-2 w-full rounded-lg border px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                className="bg-transparent mt-2 w-full rounded-lg border px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
            <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600">
              Create account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default FormProfile;
