export const authConfig = {
    jwt: {
        secret: process.env.JWT_SECRET || "default_secret",
        expiresIn: 43200, // 12 hours in seconds
    },
};
