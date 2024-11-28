import DOMPurify from "isomorphic-dompurify";

export const sanitizeContent = (type, content) => {
  if (!content || typeof content !== "string") {
    return "";
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

  // Add Instagram embed handling
  processedContent = processedContent.replace(
    /<blockquote class="instagram-media".*?<\/blockquote>/g,
    '<div class="instagram-embed-container">$&<script async src="//www.instagram.com/embed.js"></script></div>'
  );

  // Process YouTube iframes with responsive wrapper
  if (type !== "liveBlog") {
    processedContent = processedContent.replace(
      /(<iframe[^>]*youtube[^>]*>.*?<\/iframe>)/g,
      '<div class="youtube-embed-container"><div class="embed-wrapper">$1</div></div>'
    );
  }

  // Process image captions with wider container
  processedContent = processedContent.replace(
    /(<img[^>]*>)\s*<p[^>]*class="caption"[^>]*>(.*?)<\/p>/g,
    '<figure class="image-figure w-[95%]"><div class="image-wrapper">$1</div><figcaption class="image-caption">$2</figcaption></figure>'
  );

  // Add classes to links
  processedContent = processedContent.replace(
    /<a(.*?)>/g,
    '<a$1 class="blog-link">'
  );

  const clean = DOMPurify.sanitize(processedContent, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "blockquote",
      "strong",
      "em",
      "strike",
      "code",
      "pre",
      "div",
      "span",
      "iframe",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "caption",
      "colgroup",
      "col",
      "figure",
      "figcaption",
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "target",
      "rel",
      "style",
      "width",
      "height",
      "frameborder",
      "allowfullscreen",
      "allow",
      "data-tweet-id",
      "data-lang",
      "data-dnt",
      "data-theme",
      "charset",
      "colspan",
      "rowspan",
      "scope",
      "align",
      "valign",
      "border",
      "cellpadding",
      "cellspacing"
    ],
    ADD_TAGS: ["iframe", "blockquote", "table", "thead", "tbody", "tr", "th", "td", "figure", "figcaption"],
    ADD_ATTR: [
      "allowfullscreen",
      "frameborder",
      "allow",
      "data-tweet-id",
      "data-lang",
      "data-dnt",
      "data-theme",
      "charset",
      "colspan",
      "rowspan",
      "scope"
    ],
  });

  return clean;
};
