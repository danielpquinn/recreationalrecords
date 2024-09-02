import express from "express";
import { indexHandler } from "./routes";
import { releaseHandler } from "./routes/release";
const app = express();
const port = 3001;

app.use(express.static('public'))

app.get("/", indexHandler);
app.get("/releases/:slug", releaseHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
