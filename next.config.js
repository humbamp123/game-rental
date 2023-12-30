/** @type {import('next').NextConfig} */
module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/search',
                permanent: false,
            },
        ];
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.giantbomb.com',
            }
        ]
    }
};
