import dotenv from "dotenv"
dotenv.config()


if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables")
}


if (!process.env.IMAGEKIT_PUBLIC_KEY) {
    throw new Error("IMAGEKIT_PUBLIC_KEY is not defined in environment variables")
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined in environment variables")
}

if (!process.env.IMAGEKIT_URL_ENDPOINT) {
    throw new Error("IMAGEKIT_URL_ENDPOINT is not defined in environment variables")
}

if (!process.env.EMAIL_USER) {
    throw new Error("EMAIL_USER is not defined in environment variables")
}

if (!process.env.EMAIL_PASS) {
    throw new Error("EMAIL_PASS is not defined in environment variables")
}


if (!process.env.MISTRAL_API_KEY) {
    throw new Error("MISTRAL_API_KEY is not defined in environment variables")
}

export const config = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
    MISTRAL_API_KEY:process.env.MISTRAL_API_KEY
}