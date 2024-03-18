/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname: 'eriscofoodsltd.com.ng',
                protocol: 'https',
                port: '',
            }
        ]
    }
};

export default nextConfig;
