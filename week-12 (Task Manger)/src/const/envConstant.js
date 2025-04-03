import {config} from 'dotenv'
config({
    path:"./.env"
})

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL;
