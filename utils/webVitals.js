const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed() {
    return 'connection' in navigator &&
        navigator['connection'] &&
        'effectiveType' in navigator['connection']
        ? navigator['connection']['effectiveType']
        : '';
}

export function sendToAnalytics(metric, options) {
    const page = Object.entries(options.params).reduce(
        (acc, [key, value]) => acc.replace(value, `[${key}]`),
        options.path
    );

    const body = {
        dsn: options.analyticsId, // your Analytics ID
        id: metric.id,
        page,
        href: location.href,
        event_name: metric.name,
        value: metric.value.toString(),
        speed: getConnectionSpeed(),
    };

    const blob = new Blob([new URLSearchParams(body).toString()], {
        type: 'application/x-www-form-urlencoded',
    });
    if (navigator.sendBeacon) {
        navigator.sendBeacon(vitalsUrl, blob);
    } else {
        fetch(vitalsUrl, {
            body: blob,
            method: 'POST',
            credentials: 'omit',
            keepalive: true,
        });
    }
}

export function reportWebVitals(options) {
    try {
        const reportWebVitals = (metric) => {
            // Debug logging
            if (process.env.NODE_ENV === 'development') {
                console.log(metric);
            }

            // Filter out non-web-vital metrics
            if (metric.label === 'web-vital' || metric.label === 'custom') {
                sendToAnalytics(metric, options);
            }
        };

        return reportWebVitals;
    } catch (err) {
        console.error('[Web Vitals]', err);
    }
}
