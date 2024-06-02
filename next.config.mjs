/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "uploadthing.com",
            "utfs.io"
        ]
    },
    reactStrictMode:true,
    env: {
      BASE_URL: process.env.BASE_URL,
      NEXT_AUTH_URL: process.env.NEXT_AUTH_URL,
    },
};

export default nextConfig;
