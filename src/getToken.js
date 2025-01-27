import config from "./config";
import Cookies from "js-cookie";

export async function getToken() {
    const token = Cookies.get("react_challenge_spotify_token");

    if (token) {
        return token;
    } else {
        const body = new URLSearchParams({
            grant_type: "client_credentials",
        });

        const response = await fetch(config.api.authUrl, {
            method: "POST",
            headers: {
                Authorization:
                    "Basic " +
                    btoa(`${config.api.clientId}:${config.api.clientSecret}`),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body,
        });

        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const token = data.access_token;

        Cookies.set("react_challenge_spotify_token", token, {
            expires: 45 / (24 * 60),
        });

        return token;
    }
}
