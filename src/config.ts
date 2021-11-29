export type Config = {
    baseUrl: string,
    defaultUrl: string,
    backendUrl: string,
    timeout: number,
    tokenExpires: number
}

export const config: Config = {
    baseUrl: "/",
    defaultUrl: "/",
    backendUrl: "http://localhost:5000/",
    timeout: 5000,
    tokenExpires: 1/24 // 1 dia dividido por 24h = 1h
}