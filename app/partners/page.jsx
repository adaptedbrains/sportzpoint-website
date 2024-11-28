"use client";
import Link from 'next/link';

const Partners = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Partners</h1>
        
        <div className="space-y-8">
          <h2 className="text-3xl font-bold mb-8">Here Are All Our Proud PARTNERS</h2>

          {/* Adapted Brains */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Adapted Brains</h3>
            <p className="text-lg">
              Adapted Brains is the{' '}
              <Link 
                href="https://github.com/adaptedbrains" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#006356] underline hover:text-[#005347]"
              >
                technology partner
              </Link>
              {' '}of Sportz Point.
            </p>
          </div>

          {/* Flashscore */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Flashscore</h3>
            <p className="text-lg">
              Flahscore helps us with all the{' '}
              <Link href="/" className="text-[#006356] underline hover:text-[#005347]">
                Live Soccer Scores
              </Link>
              .
            </p>
          </div>

          {/* Partner CTA */}
          <div className="mt-12 space-y-4">
            <h3 className="text-xl font-bold">Want to be a partner of Sportz Point?</h3>
            <p className="text-lg">
              Mail us at mail@sportzpoint.com or visit our{' '}
              <Link href="/contact" className="text-[#006356] underline hover:text-[#005347]">
                contact us page
              </Link>
              . To advertise with us visit our{' '}
              <Link href="/advertise" className="text-[#006356] underline hover:text-[#005347]">
                &ldquo;advertise with us&rdquo; page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">Stay updated with our latest sports news and updates</p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39803E]"
                />
                <button
                  type="submit"
                  className="bg-[#006356] hover:bg-[#005349] text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
