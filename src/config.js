// It's not good practice to store things like api keys in env vars,
// so this will allow us to transparently swap over to another 
// mechanism for retrieving the key in the future.
const config = {
    ownup: {
        api_key: process.env.REACT_APP_OWNUP_API_KEY,
        api_url: process.env.REACT_APP_OWNUP_API_URL,
    }
}

export default config;