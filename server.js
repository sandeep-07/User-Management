const jsonServer = require("json-server");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));

app.prepare().then(() => {
  server.use(jsonServer.defaults());
  server.use("/api", router);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log("JSON Server and Next.js are running on port 3000");
  });
});
