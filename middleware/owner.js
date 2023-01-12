const Sauce = require("../models/sauces");

module.exports = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (sauce.userId != req.auth.userId) {
      res.status(403).json({ message: "Not authorized" });
    } else {
      next();
    }
  });
};
