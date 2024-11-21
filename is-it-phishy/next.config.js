module.exports = () => {
    const config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: true,
            ca: process.env.CERT,
        },
    };
    return {
        config,
    };
};
