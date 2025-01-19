/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "umwjevpyasylkyfwtmkh.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
    // unoptimized: true, //we need to set this before build so that Next Image API doent cos issues in static files.
  },
  // output: "export",
};

export default nextConfig;
