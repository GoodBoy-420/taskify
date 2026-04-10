import "dotenv/config";

const dev = {
  app: {
    port: process.env.PORT || 8080,
  },
  db: {
    url: process.env.MONGO_URL,
  },
  dns: {
    port: process.env.DNS_SERVER,
  },
  cors: {
    origin: process.env.CLIENT_URL,
  },
  jwtoken: {
    secretKey: process.env.SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refresh_secretKey: process.env.REFRESH_SECRET_KEY,
    refresh_expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  },
  limit: {
    maxJsonSize: process.env.MAX_JSON_SIZE,
  },
  limiter: {
    requestTime: process.env.REEQUEST_TIME,
    requestNumber: process.env.REQUEST_NUMBER,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  },

  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
};

export default dev;
