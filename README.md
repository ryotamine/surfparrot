# Surfparrot Project

Surfparrot is a full-stack web application built with React, Node, Express, PostgreSQL, Axios, and Spotify API that allows users to quickly preview music by artist who are going to be playing in their area soon.

## Final Product

!["Screenshot of home page"](https://github.com/ryotamine/surfparrot/blob/master/client/public/docs/surfparrot-home.png)
!["Screenshot of artist page"](https://github.com/ryotamine/surfparrot/blob/master/client/public/docs/surfparrot-artist.png)
!["Screenshot of get show recommendations page"](https://github.com/ryotamine/surfparrot/blob/master/client/public/docs/surfparrot-recommendations.png)

## Dependencies

- axios: 0.18.0
- base64url: 3.0.1
- bcrypt: 3.0.6
- capitalize: 2.0.0
- cheerio: 1.0.0-rc.3
- cookie-session: 1.3.3
- cors: 2.8.5
- dotenv: 7.0.0
- express: 4.16.4
- json: 9.0.6
- moment: 2.24.0
- pg: 7.10.0
- react: 16.8.6
- react-router: 5.0.0
- react-router-dom: 5.0.0
- react-table: 6.10.0
- reactjs-popup: 1.3.2
- request: 2.88.0
- spotify-web-api-node: 4.0.0

## Getting Started

1. Fork and clone
2. Install dependencies at both client and server folder: `npm install`
3. Run migrations at server folder: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
4. Run the seed at server folder: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
5. Generate Spotify ID and secret key at `https://developer.spotify.com/dashboard/login` and save them to .env file at server folder
6. Run the server at client folder: `npm run start`
7. Run the server at server folder: `npm start`
8. Visit <http://localhost:3000/>

## Functionality

Surfparrot is an app for live-music event listing. Users can preview music by artist who are going to be playing in their area soon. Artists can create events at their respective pages.

Once the user has previewed multiple songs, they get show recommendations based on their selection.

Surfparrot is designed to allow users to preview music before attending the event. This method allows them to get an idea of what the artist is like. The live-music event listing at home page is real-time through integrating www.rotate.com and Spotify API.

## Contributors

- Ryota Mine (https://github.com/ryotamine)
- Patrick McKeegan (https://github.com/pmckeegan)
- Esther Splett (https://github.com/esplett)
