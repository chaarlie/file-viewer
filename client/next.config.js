/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'backend-host',
              port: '5006',
              pathname: '/static/**',
            },
        ],
    }
   
}
