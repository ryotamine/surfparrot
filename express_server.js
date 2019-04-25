const express = require("express");
const app     = express();
const PORT    = 8080;

// Boot server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});