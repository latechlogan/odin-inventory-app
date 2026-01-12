const { Router } = require("express");
const router = Router();

const albumsController = require("../controllers/albumsController");

router.get("/", albumsController.list);
router.get("/create", albumsController.createGet);
router.post("/create", albumsController.createPost);
router.get("/:albumId/edit", albumsController.updateGet);
router.post("/:albumId/edit", albumsController.updatePost);
router.post("/:albumId/delete", albumsController.destroy);
router.get("/:albumId", albumsController.show);

module.exports = router;
