export const seoConfig = {
  defaultTitle: "SportzPoint - Global Sports News & Updates",
  titleTemplate: "%s | SportzPoint",
  description: "Get the latest sports news, live scores, match highlights, and in-depth analysis from SportzPoint. Coverage includes cricket, football, tennis, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sportzpoint.com/",
    siteName: "SportzPoint",
    images: [
      {
        url: "https://sportzpoint.com/logo/logo.webp",
        width: 1200,
        height: 630,
        alt: "SportzPoint",
      },
    ],
  },
  twitter: {
    handle: "@sportz_point",
    site: "@sportz_point",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#39803E",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/logo192.png",
    },
  ],
};
