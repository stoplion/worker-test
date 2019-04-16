var express = require("express");
var router = express.Router();
import workerpool from "workerpool";
import { resolve } from "path";

const pathToWorker = resolve(__dirname, "../lib/test.worker.js");

const pool = workerpool.pool(pathToWorker);

/* GET home page. */
router.get("/", function(req, res, next) {
  debugger;
  const equation = `
    foo = 4 + 1
    4 + 10
    foo
  `.trim();

  pool
    .exec("parseLines", [equation])
    .then(result => {
      res.render("index", {
        title: "Testing Workers",
        result
      });
    })
    .catch(err => {
      return next(err);
    })
    .then(() => {
      pool.terminate();
    });
});

module.exports = router;
