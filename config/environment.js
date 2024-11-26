const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    apiUrl: 'https://sportzpoint-be.onrender.com',
    siteUrl: 'http://localhost:3000',
    imgCdn: 'https://img-cdn.thepublive.com',
  },
  production: {
    apiUrl: 'https://api.sportzpoint.com',
    siteUrl: 'https://sportzpoint.com',
    imgCdn: 'https://img-cdn.thepublive.com',
  },
};

export const { apiUrl, siteUrl, imgCdn } = config[env]; 