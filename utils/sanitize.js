import DOMPurify from 'dompurify';

export const sanitizeContent = (type, content) => {
  if (!content || typeof content !== "string") {
    return "";
  }

  // Only sanitize on client-side where window is available
  if (typeof window === 'undefined') {
    return content;
  }

  let processedContent = content;

  // Process Twitter embeds with a more robust structure
  processedContent = processedContent.replace(
    /(<blockquote class="twitter-tweet".*?<\/blockquote>)/g,
    (match) => {
      // Extract tweet ID if present
      const tweetIdMatch = match.match(/data-tweet-id="(\d+)"/);
      const tweetId = tweetIdMatch ? tweetIdMatch[1] : '';
      
      return `
        <div class="twitter-embed-container">
          <div class="twitter-embed-wrapper" id="tweet-${tweetId}">
            ${match}
          </div>
        </div>
      `;
    }
  );

  // Process Instagram embeds
  processedContent = processedContent.replace(
    /(<blockquote class="instagram-media".*?<\/blockquote>)/g,
    (match) => `
      <div class="instagram-embed-container">
        <div class="instagram-embed-wrapper">
          ${match}
        </div>
      </div>
    `
  );

  // Process YouTube embeds
  processedContent = processedContent.replace(
    /<oembed url="(https:\/\/www\.youtube\.com\/watch\?v=([^"]+))".*?<\/oembed>/g,
    (match, url, videoId) => `
      <div class="youtube-embed-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    `
  );

  // Sanitize the processed content
  return DOMPurify.sanitize(processedContent, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'width', 'height', 'src'],
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'img',
      'video', 'div', 'span', 'br', 'b', 'i', 'strong', 'em',
      'blockquote', 'figure', 'figcaption', 'ol', 'ul', 'li',
      'iframe', 'script'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'class', 'id', 'alt', 'title',
      'width', 'height', 'frameborder', 'allowfullscreen',
      'allow', 'scrolling', 'style', 'target', 'rel'
    ]
  });
};
