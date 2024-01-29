require('dotenv').config();
const spotifyClientID = process.config.SPOTIFY_CLIENTID;
const spotifySecret = process.config.SPOTIFY_SECRET;

const APIControl = (function() { 

    const getToken = async () => {

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(`${spotifyClientID}:${spotifySecret}`)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }


    const getAlbumData = async (title, artist, token) => {
        title = encodeURIComponent(title)
        artist = encodeURIComponent(artist);
        const result = await fetch(`https://api.spotify.com/v1/search?q=title%3A${title}%2520artist%3A${artist}&type=album`, {
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + token }
    });
    const data = await result.json();

    return data;
}

console.log(getAlbumData('OK Computer', "radiohead", getToken));
})();

