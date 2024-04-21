/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "uploadthing.com",
            "utfs.io"
        ]
    },
    env: {
      BASE_URL: process.env.NEXT_PUBLIC_TOKEN,
    },
};

export default nextConfig;
