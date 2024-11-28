import Script from 'next/script';

export default function Performance() {
  return (
    <>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://img-cdn.thepublive.com" />
      <link rel="dns-prefetch" href="https://img-cdn.thepublive.com" />

      {/* Add quicklink for faster subsequent page loads */}
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', () => {
              // Prefetch visible links
              const links = document.querySelectorAll('a');
              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    const link = entry.target;
                    if (link.href && link.href.startsWith(window.location.origin)) {
                      const prefetchLink = document.createElement('link');
                      prefetchLink.rel = 'prefetch';
                      prefetchLink.href = link.href;
                      document.head.appendChild(prefetchLink);
                    }
                  }
                });
              });
              
              links.forEach(link => observer.observe(link));
            });

            // Add instant.page for faster page loads
            let mouseoverTimer;
            let lastTouchTimestamp;
            
            const prefetcher = document.createElement('link');
            const isSupported = prefetcher.relList && prefetcher.relList.supports && prefetcher.relList.supports('prefetch');
            
            if (isSupported) {
              document.addEventListener('mouseover', e => {
                const linkElement = e.target.closest('a');
                
                if (!linkElement) return;
                
                if (linkElement.origin !== window.location.origin) return;
                
                mouseoverTimer = setTimeout(() => {
                  const prefetchLink = document.createElement('link');
                  prefetchLink.rel = 'prefetch';
                  prefetchLink.href = linkElement.href;
                  document.head.appendChild(prefetchLink);
                }, 65);
              });
              
              document.addEventListener('mouseout', () => {
                if (mouseoverTimer) {
                  clearTimeout(mouseoverTimer);
                  mouseoverTimer = undefined;
                }
              });
            }
          `,
        }}
      />
    </>
  );
}
