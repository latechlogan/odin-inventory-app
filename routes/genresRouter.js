const { Router } = require("express");
const router = Router();

const genresController = require("../controllers/genresController");

router.get("/", genresController.list);
router.post("/:genreId/delete", genresController.destroy);
router.get("/:genreId", genresController.show);

module.exports = router;
