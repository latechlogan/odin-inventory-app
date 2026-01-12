const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => res.send("get all albums"));
router.get("/create", (req, res) => res.send("get new album form"));
router.post("/create", (req, res) => res.send("post new album form"));
router.get("/:albumId/edit", (req, res) => res.send("get edit album form"));
router.post("/:albumId/edit", (req, res) => res.send("post edit album form"));
router.post("/:albumId/delete", (req, res) =>
  res.send("post delete album form/action")
);
router.get("/:albumId", (req, res) => res.send("get one specific album"));

module.exports = router;
