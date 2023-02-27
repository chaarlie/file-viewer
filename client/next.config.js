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
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5005',
                pathname: '/static/**',
              },
        ],
    }
   
}
