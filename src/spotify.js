// spotify logic
// endpoint - where send user to in order to get them to authenticate
// send to spotify to handle authentication then brings back to homepage with redirect
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://spotify-clone-922c2.web.app/";
// "http://localhost:3000/";
const clientId = "21ad13f1a1f64351af0c640fb774535a";

// scopes - throw user over with scopes
// include the scope parameter to specify the scopes you want to request 
// By specifying scopes, you can control the level of access your application has while respecting the user's privacy and security

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
    return window.location.hash
    .substring(1)
    .split('&')
    // reduce iterates through the elements of an array and accumulate a single value based on calling callback fxn on each elt
    .reduce((initial, item) => {
        // #accessToken=mysupersecretkey&name=bob*abc -> accessToken=mysupersecretkey -> accessToken
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1])
        return initial;
    }, {});
}

// this link sends users to spotify authorization endpoint and back to the application
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
