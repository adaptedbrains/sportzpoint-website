"use client";
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

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
        <Newsletter />
      </div>
    </div>
  );
};

export default Partners;
