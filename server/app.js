const express = require("express");
const app     = express();
const PORT    = 3000
const SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
    clientId: 'cf87031075d34057a785f63be7aac4e7',
    clientSecret: ' e318cad2d4d04e6c9e16df1b01372350',
    redirectUri: 'http://localhost:3000/callback'
  });
  
spotifyApi.setAccessToken('BQAQRdXUUetIeavuSob-AzLRwTguQ76uVVjnXHSoOi1mFnBxM4mZlKY7g0')

/**
 * This example refreshes an access token. Refreshing access tokens is only possible access tokens received using the
 * Authorization Code flow, documented here: https://developer.spotify.com/spotify-web-api/authorization-guide/#authorization_code_flow
 */

/* Retrieve a code as documented here:
 * https://developer.spotify.com/spotify-web-api/authorization-guide/#authorization_code_flow
 *
 * Codes are given for a set of scopes. For this example, the scopes are user-read-private and user-read-email.
 * Scopes are documented here:
 * https://developer.spotify.com/spotify-web-api/using-scopes/
 */
var authorizationCode =
  'BQA2KI2WgB1bWr_YyLUG0NbQTFafjgwztgOOo0kHTFCEztJT_OAvmL0nhsFUhLjl7FWp4DxJfh3CVQMqJHKtnihtEPJsokbaPduvDC0E4_3FPefrdlSiLmm1BsTuMsBWXAG1ux1PIOeyhjX6b0q7SL69lGpcu5kPzzdQwKk';

// When our access token will expire
var tokenExpirationEpoch;


// First retrieve an access token
spotifyApi.authorizationCodeGrant(authorizationCode).then(
  function(data) {
    // Set the access token and refresh token
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);

    // Save the amount of seconds until the access token expired
    tokenExpirationEpoch =
      new Date().getTime() / 1000 + data.body['expires_in'];
    console.log(
      'Retrieved token. It expires in ' +
        Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
        ' seconds!'
    );
  },
  function(err) {
    console.log(
      'Something went wrong when retrieving the access token!',
      err.message
    );
  }
);

// Continually print out the time left until the token expires..
var numberOfTimesUpdated = 0;

setInterval(function() {
  console.log(
    'Time left: ' +
      Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
      ' seconds left!'
  );

  // OK, we need to refresh the token. Stop printing and refresh.
  if (++numberOfTimesUpdated > 5) {
    clearInterval(this);

    // Refresh token and print the new time to expiration.
    spotifyApi.refreshAccessToken().then(
      function(data) {
        tokenExpirationEpoch =
          new Date().getTime() / 1000 + data.body['expires_in'];
        console.log(
          'Refreshed token. It now expires in ' +
            Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
            ' seconds!'
        );
      },
      function(err) {
        console.log('Could not refresh the token!', err.message);
      }
    );
  }
}, 1000);


// Get Elvis' albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    function(data) {
      console.log('Artist albums', data.body);
    },
    function(err) {
      console.error(err);
    }
  );

// Get an artist's top tracks
spotifyApi.getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy', 'GB')
.then(function(data) {
  console.log(data.body);
  }, function(err) {
  console.log('Something went wrong!', err);
});