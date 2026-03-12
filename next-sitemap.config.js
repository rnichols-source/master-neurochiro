/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://neurochiromastermind.com',
  generateRobotsTxt: true,
  exclude: ['/portal*', '/admin*', '/login', '/api*'], // Exclude private and auth routes
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal', '/admin', '/login', '/api'],
      },
    ],
  },
}
