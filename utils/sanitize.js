import DOMPurify from 'isomorphic-dompurify';

export const sanitizeContent = (content) => {
  // Wrap YouTube iframes in a container div
  const processedContent = content.replace(
    /(<iframe[^>]*youtube[^>]*>.*?<\/iframe>)/g,
    '<div class="youtube-embed-container">$1</div>'
  );

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
      'allowfullscreen', 'allow'
    ],
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allowfullscreen', 'frameborder', 'allow']
  });
}; 