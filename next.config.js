/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/dashboard",
                permanent: false
            }
        ]
    },
    env: {
        GOOGLE_CLIENT_ID: "19752849459-ogjh705nglr882jtoifp03d3o4o3mubu.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "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",
        SECRET: "WFL4KhYFhP8nQS0WnhLnbSFSwGnK+76cRVvKDENSrq0="
    }
}

module.exports = nextConfig
