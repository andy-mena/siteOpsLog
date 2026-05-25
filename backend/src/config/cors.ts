import { CorsOptions } from "cors"

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        const whitelist = [process.env.FRONTEND_URL]

        console.log(whitelist)

        if (!origin || whitelist.includes(origin.trim())) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'))
        }
    },

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}