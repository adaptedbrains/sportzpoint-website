export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http')) return imagePath;
  
  // Remove any leading slashes
  const cleanPath = imagePath.replace(/^\/+/, '');
  
  // Try both CloudFront domains
  const domains = [
    'dmpsza32x691.cloudfront.net',
    'dmpsza32x791.cloudfront.net'
  ];
  
  // If the path already includes one of our domains, return it as is
  for (const domain of domains) {
    if (cleanPath.includes(domain)) {
      return cleanPath.startsWith('https://') ? cleanPath : `https://${cleanPath}`;
    }
  }
  
  // Use the first domain as default
  return `https://${domains[0]}/${cleanPath}`;
};
