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
    ],
    unoptimized: true, //we need to set this before build so that Next Image API doent cos issues in static files.
  },
  output: "export",
};

export default nextConfig;

// notes (move to documentation):
// line 12 note