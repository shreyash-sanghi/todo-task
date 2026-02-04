export const nodeEnvs = {
    development: "development",
    production: "production",
    testing: "testing"
}


export const corsOptions = {
    origin: "https://todo-task-frontend-kappa.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
}