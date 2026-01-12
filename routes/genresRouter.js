const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => res.send("get all genres"));
router.get("/create", (req, res) => res.send("get new genre form"));
router.post("/create", (req, res) => res.send("post new genre form"));
router.get("/:genreId/edit", (req, res) => res.send("get edit genre form"));
router.post("/:genreId/edit", (req, res) => res.send("post edit genre form"));
router.post("/:genreId/delete", (req, res) =>
  res.send("post delete genre form/action")
);
router.get("/:genreId", (req, res) => res.send("get one specific genre"));

module.exports = router;
