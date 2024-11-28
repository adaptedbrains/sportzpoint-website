import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-bold text-[#006356] sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
                Article not found
              </h1>
              <p className="mt-3 text-base text-gray-500">
                Please check the URL or try searching for the article.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#006356] hover:bg-[#005349] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006356]"
              >
                Go back home
              </Link>
              <Link
                href="/latest"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#006356] bg-[#006356]/10 hover:bg-[#006356]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006356]"
              >
                Latest articles
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
