/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'api',
              port: '5005',
              pathname: '/static/**',
            },
        ],
    }
   
}
