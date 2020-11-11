// It's not good practice to store things like api keys in env vars,
// so this will allow us to transparently swap over to another 
// mechanism for retrieving the key in the future.
export default {
    ownup: {
        api_key: process.env.REACT_APP_OWNUP_API_KEY,
        api_url: "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/quotes",
    }
}