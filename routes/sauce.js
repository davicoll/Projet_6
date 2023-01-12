const express = require("express");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const owner = require("../middleware/owner");

const router = express.Router();

const sauceCtrl = require("../controllers/sauce");

router.get("/", auth, sauceCtrl.getAllSauces);

router.post("/", auth, multer, sauceCtrl.createSauce);

router.get("/:id", auth, sauceCtrl.getOneSauce);

router.put("/:id", auth, owner, multer, sauceCtrl.updateSauce);

router.delete("/:id", auth, owner, sauceCtrl.deleteSauce);

router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;
