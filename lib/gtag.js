// Google Analytics Configuration
export const GA_CONFIGS = {
  homepage: {
    measurementId: 'G-DTKYD8VXK1',
    streamId: '3354658682',
    streamUrl: 'https://sportzpoint.com'
  },
  webStories: {
    measurementId: 'G-V69PJK5P63',
    streamId: '4321979256',
    streamUrl: 'https://sportzpoint.com/web-stories/'
  }
};

// Default measurement ID for main site tracking
export const GA_MEASUREMENT_ID = GA_CONFIGS.homepage.measurementId;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });

  // If we're on the web stories section, track with that property too
  if (url.includes('/web-stories')) {
    window.gtag('config', GA_CONFIGS.webStories.measurementId, {
      page_path: url,
    });
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}
