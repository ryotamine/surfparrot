const express       = require("express");
const app           = express();
const PORT          = 5000
// const SpotifyWebApi = require("spotify-web-api-node");

// Boot server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});