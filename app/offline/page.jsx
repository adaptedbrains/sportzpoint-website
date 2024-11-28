'use client';

export default function Offline() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-bold text-[#006356] sm:text-5xl">Offline</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
                No Internet Connection
              </h1>
              <p className="mt-3 text-base text-gray-500">
                Please check your internet connection and try again.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#006356] hover:bg-[#005349] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006356]"
              >
                Try Again
              </button>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#006356] bg-[#006356]/10 hover:bg-[#006356]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006356]"
              >
                Go Back
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
