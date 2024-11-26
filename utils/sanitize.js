import DOMPurify from "isomorphic-dompurify";

export const sanitizeContent = (type, content) => {
  if (!content || typeof content !== "string") {
    return "";
  }

  let processedContent = content;

  // Process Twitter embeds - preserve the original blockquote structure
  processedContent = processedContent.replace(
    /(<blockquote class="twitter-tweet".*?<\/blockquote>)/g,
    '<div class="twitter-embed-container">$1</div>'
  );

  // Process YouTube iframes
  if (type !== "liveBlog") {
    processedContent = processedContent.replace(
      /(<iframe[^>]*youtube[^>]*>.*?<\/iframe>)/g,
      '<div class="youtube-embed-container">$1</div>'
    );
  }

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
      "col"
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
    ADD_TAGS: ["iframe", "blockquote", "table", "thead", "tbody", "tr", "th", "td"],
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
