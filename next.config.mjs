/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tiqrnepcxnpaztuvztgv.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname:
          "/a/ACg8ocL4wB5DCd2rwnOSTYwSzl3kngQTcEJjPKbNSRAvd76YXv-8Fw=s96-c",
      },
    ],
    // unoptimized: true, //we need to set this before build so that Next Image API doent cos issues in static files.
  },
  // output: "export",
};

export default nextConfig;
