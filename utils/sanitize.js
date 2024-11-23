import DOMPurify from 'isomorphic-dompurify';

export const sanitizeContent = (content) => {
  // First find and replace Twitter text patterns
  const twitterTextPattern = /(.*?pic\.twitter\.com\/\w+)\s*\?ref_src=.*?(\d{4})/g;
  let processedContent = content.replace(twitterTextPattern, (match, text, year) => {
    // Extract the tweet text and create proper embed
    return `
      <blockquote class="twitter-tweet">
        <p lang="en" dir="ltr">${text}</p>
        &mdash; beIN SPORTS USA (@beINSPORTSUSA) <a href="https://twitter.com/beINSPORTSUSA/status/">April 7, ${year}</a>
      </blockquote>
    `;
  });

  return DOMPurify.sanitize(processedContent, {
    ALLOWED_TAGS: [
      'p', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'blockquote',
      'strong', 'em', 'strike', 'code', 'pre',
      'div', 'span', 'iframe'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'class', 'target',
      'rel', 'style', 'width', 'height', 'frameborder',
      'allowfullscreen', 'data-tweet-id', 'data-twitter-extracted-i',
      'data-widget-id', 'data-lang', 'data-dnt'
    ],
    ADD_TAGS: ['blockquote', 'twitter-widget'],
    ADD_ATTR: ['class']
  });
}; 