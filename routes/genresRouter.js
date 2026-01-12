const { Router } = require("express");
const router = Router();

const genresController = require("../controllers/genresController");

router.get("/", genresController.list);
router.get("/create", genresController.createGet);
router.post("/create", genresController.createPost);
router.get("/:genreId/edit", genresController.updateGet);
router.post("/:genreId/edit", genresController.updatePost);
router.post("/:genreId/delete", genresController.destroy);
router.get("/:genreId", genresController.show);

module.exports = router;
