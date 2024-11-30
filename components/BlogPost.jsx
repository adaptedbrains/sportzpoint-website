import { convertToIST } from "@/util/convertToIST";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { FaUserCircle, FaWhatsapp, FaFacebook, FaCopy } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { sanitizeContent } from "@/utils/sanitize";
import Script from "next/script";
import { useWebSocket } from "@/utils/websocket";
import usePostStore from "@/store/postStore";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-hot-toast";

const socialMedia = [
  {
    icon: <FaWhatsapp size={20} />,
    href: "https://api.whatsapp.com/send?text=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215",
  },
  {
    icon: <FaFacebook size={20} />,
    href: "http://www.facebook.com/sharer/sharer.php?u=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215",
  },
  {
    icon: <FaXTwitter size={20} />,
    href: "http://www.twitter.com/intent/tweet?url=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215",
  },
  {
    icon: <FaLinkedin size={20} />,
    href: "https://www.linkedin.com/sharing/share-offsite/?url=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215",
  },
];

const getSocialShareLinks = (url, title) => [
  {
    icon: <FaWhatsapp size={18} />,
    href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
      title + " " + url
    )}`,
    label: "WhatsApp",
  },
  {
    icon: <FaFacebook size={18} />,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
    label: "Facebook",
  },
  {
    icon: <FaXTwitter size={18} />,
    href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`,
    label: "Twitter",
  },
  {
    icon: <FaLinkedin size={18} />,
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    label: "LinkedIn",
  },
];

const ShareButtons = ({ url, title }) => {
  const socialLinks = getSocialShareLinks(url, title);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Share on:</span>
      <div className="flex items-center gap-1">
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors group relative"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.label}`}
          >
            {link.icon}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {link.label}
            </span>
          </Link>
        ))}
        <button
          onClick={handleCopyLink}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors group relative"
          aria-label="Copy link"
        >
          <FaCopy size={18} />
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
            Copy link
          </span>
        </button>
      </div>
    </div>
  );
};

const FullWidthArticleCard = ({ article }) => (
  <div className="mb-6">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={`https://dmpsza32x691.cloudfront.net/${article.banner_image}`}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          {article.categories &&
            article.categories.map((category, index) => (
              <Link
                key={index}
                href={`/${category.slug}`}
                className="bg-green-200 rounded text-green-800 text-xs font-semibold px-2 py-0.5"
              >
                {category.name}
              </Link>
            ))}
        </div>

        <Link
          href={`/${article.categories[0]?.slug}/${article.slug}`}
          className="text-xl font-pt-serif font-semibold line-clamp-2 hover:text-green-700 transition-colors"
        >
          {article.title}
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          {convertToIST(article.published_at_datetime)}
        </p>
      </div>
    </div>
  </div>
);

const RelatedArticleCard = ({ article }) => (
  <div className="px-2">
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={`https://dmpsza32x691.cloudfront.net/${article.banner_image}`}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          {article.categories &&
            article.categories.map((category, index) => (
              <Link
                key={index}
                href={`/${category.slug}`}
                className="bg-green-200 rounded text-green-800 text-xs font-semibold px-2 py-0.5"
              >
                {category.name}
              </Link>
            ))}
        </div>

        <Link
          href={`/${article.categories[0]?.slug}/${article.slug}`}
          className="text-lg font-pt-serif font-semibold line-clamp-2 hover:text-green-700 transition-colors"
        >
          {article.title}
        </Link>
        <p className="text-sm text-gray-500 mt-2">
          {convertToIST(article.published_at_datetime)}
        </p>
      </div>
    </div>
  </div>
);

const BlogPost = ({ postData, index }) => {
  const router = useRouter();

  const { messages } = useWebSocket();
  const postRef = React.useRef(null);
  const { liveBlogs, liveBlogFunction } = usePostStore();

  useEffect(() => {
    if (postData.type === "LiveBlog") {
      liveBlogFunction(
        postData.live_blog_updates.length !== 0 && postData.live_blog_updates
      );
    }

    const loadInstagramEmbeds = () => {
      const existingScript = document.getElementById("instagram-embed-script");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => window.instgrm?.Embeds.process();
      document.body.appendChild(script);
    };

    loadInstagramEmbeds();
    const interval = setInterval(() => window.instgrm?.Embeds.process(), 1000);

    return () => {
      clearInterval(interval);
      const script = document.getElementById("instagram-embed-script");
      if (script) script.remove();
    };
  }, [postData.content, postData.type]);

  useEffect(() => {
    // Create intersection observer for URL updates
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Update URL without triggering navigation or re-renders
            const newUrl = `/${postData.categories[0]?.slug}/${postData.slug}`;
            window.history.replaceState(
              { ...window.history.state },
              postData.title,
              newUrl
            );

            // Update page title without causing re-render
            document.title = postData.title;
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the article is visible
      }
    );

    // Start observing the article
    if (postRef.current) {
      observer.observe(postRef.current);
    }

    return () => {
      if (postRef.current) {
        observer.unobserve(postRef.current);
      }
    };
  }, [postData]);

  // Add this function to handle Twitter embed initialization
  const initializeTwitterEmbed = () => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  };

  useEffect(() => {
    // Try to load Twitter widgets after component mounts
    initializeTwitterEmbed();

    // Also try after a short delay to ensure DOM is ready
    const timer = setTimeout(initializeTwitterEmbed, 1000);

    return () => clearTimeout(timer);
  }, [postData.content]);

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="twitter-widgets"
        src="https://platform.twitter.com/widgets.js"
        strategy="afterInteractive"
        onLoad={() => initializeTwitterEmbed()}
      />

      <div ref={postRef} className="bg-white sm:rounded-lg sm:shadow-md">
        <div className="p-4 sm:p-6">
          <div className="flex gap-2">
            {postData.isLive && (
              <div className="text-xl text-red-500  tracking-wider ">
                {" "}
                <span className="font-bold">L</span>I
                <span className="font-bold">V</span>E{" "}
              </div>
            )}
            {postData.categories.map((category, index) => (
              <Link
                href={`/${category.slug}`}
                key={index}
                className="bg-green-200 rounded text-green-800 font-semibold px-4 py-1"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <h2 className="text-3xl font-semibold text-start my-4">
            {postData.title}
          </h2>
          {postData.summary && (
            <p className=" text-start my-4 text-zinc-600">{postData.summary}</p>
          )}

          <div className="flex justify-between items-center flex-wrap gap-4">
            {console.log('Credits data:', postData.credits)}
            <div className="flex items-center gap-2">
              {postData.author_image ? (
                <Image
                  src={postData.author_image}
                  alt={
                    postData.credits?.map((c, i) => 
                      `${c.name}${i < postData.credits.length - 1 ? ', ' : ''}`
                    ).join('') || "Unknown Author"
                  }
                  width={35}
                  height={35}
                  className="rounded-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
              ) : (
                <FaUserCircle size={35} color="gray" />
              )}
              <div className="flex flex-col">
                <p className="text-sm text-gray-600">
                  By {postData.credits ? postData.credits.map((c, i) => (
                    <span key={i}>
                      {c.name}{i < postData.credits.length - 1 ? ', ' : ''}
                    </span>
                  )) : 'Unknown Author'}
                </p>
                <p className="text-zinc-500 text-[11px]">
                  {postData.published_at_datetime &&
                    convertToIST(postData.published_at_datetime)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="https://news.google.com/publications/CAAqBwgKMKDuqAswkvnAAw?ceid=IN:en&amp;oc=3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="follow us google news"
                className="hidden sm:flex items-center border border-blue-800 gap-1 px-3 py-1 rounded-full text-xs font-semibold text-blue-800 hover:bg-blue-50 transition-colors"
              >
                <Image
                  src="/icon/google_news.png"
                  alt="google icon"
                  width={15}
                  height={15}
                  priority
                />
                Follow Us
              </Link>
              <ShareButtons
                url={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${postData.categories[0]?.slug}/${postData.slug}`}
                title={postData.title}
              />
            </div>
          </div>

          {postData.banner_image && (
            <div className="w-full relative my-6 aspect-w-16 aspect-h-9">
              <Image
                src={`https://dmpsza32x691.cloudfront.net/${postData.banner_image}`}
                alt={postData.title || "Banner Image"}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority
              />
            </div>
          )}

          <article
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: sanitizeContent("Article", postData.content),
            }}
          />

          <Script
            src="//www.instagram.com/embed.js"
            strategy="afterInteractive"
            onLoad={() => window.instgrm?.Embeds.process()}
          />

          <div className="rounded flex flex-col gap-7 mt-8">
            {postData.type === "LiveBlog" && postData?.live_blog_updates && (
              <>
                <div className="flex justify-center items-center mb-5">
                  <div className="bg-[#006356] text-white px-4 py-2 rounded-md font-semibold">
                    LIVE Updates
                  </div>
                </div>

                {liveBlogs &&
                  liveBlogs.map((live, i) => (
                    <div
                      key={i}
                      className="shadow-md bg-gray-50 p-6 flex flex-col gap-3 rounded-lg border-l-4 border-[#006356]"
                    >
                      <p className="text-gray-600 italic text-sm">
                        {convertToIST(live.created_at)}
                      </p>

                      <h2 className="font-bold text-xl text-gray-800">
                        {live.title}
                      </h2>

                      {live.images && live.images.length > 0 && (
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                          {live.images.map((image, index) => (
                            <div
                              key={index}
                              className="relative h-[200px] rounded-lg overflow-hidden"
                            >
                              <Image
                                src={`https://dmpsza32x691.cloudfront.net/${image}`}
                                alt={`Update image ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="prose max-w-none">
                        <article
                          className="blog-content text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: sanitizeContent("LiveBlog", live.content),
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>

          {postData.tags && postData.tags.length > 0 && (
            <div className="mt-8 mb-6">
              <div className="flex flex-wrap gap-2">
                {postData.tags.map((tag, idx) => (
                  <Link
                    key={idx}
                    href={`/tags/${tag.slug}`}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-green-700 hover:text-green-800 rounded-full text-sm transition-colors duration-200 font-medium"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {index === 0 &&
            postData.related_articles &&
            postData.related_articles.length > 0 && (
              <div className="mt-8">
                <div className="grid grid-cols-5 justify-between items-center mb-5">
                  <div className="bg-green-800 h-[1px] col-span-2"></div>
                  <p className="border col-span-1 border-green-800 text-center px-2 font-semibold">
                    Related Articles
                  </p>
                  <div className="bg-green-800 h-[1px] col-span-2"></div>
                </div>

                {/* First article in full width */}
                {postData.related_articles[0] && (
                  <FullWidthArticleCard
                    article={postData.related_articles[0]}
                  />
                )}

                {/* Rest of the articles in carousel */}
                {postData.related_articles.length > 1 && (
                  <div className="relative mb-8">
                    <button
                      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                      onClick={() => slider?.slickPrev()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <Slider
                      ref={(slider) => (slider = slider)}
                      {...carouselSettings}
                    >
                      {postData.related_articles
                        .slice(1)
                        .map((article, idx) => (
                          <RelatedArticleCard key={idx} article={article} />
                        ))}
                    </Slider>

                    <button
                      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                      onClick={() => slider?.slickNext()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
        </div>

        {index !== undefined && (
          <div className="w-full border-t border-gray-100 my-8">
            <div className="flex items-center justify-center py-4">
              <div className="h-[1px] w-12 bg-gray-300"></div>
              <span className="text-sm text-gray-500 mx-3">Next Article</span>
              <div className="h-[1px] w-12 bg-gray-300"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPost;
