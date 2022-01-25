import app from "./app.js";

const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
