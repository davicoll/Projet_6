const Sauce = require("../models/sauces");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((Sauces) => res.status(200).json(Sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      Sauce.updateOne(
        { _id: req.params.id },
        {
          name: sauceObject.name,
          manufacturer: sauceObject.manufacturer,
          description: sauceObject.description,
          mainPepper: sauceObject.mainPepper,
          imageUrl: sauceObject.imageUrl,
          heat: sauceObject.heat,
        }
      )
        .then(() => res.status(200).json({ message: "Objet modifié!" }))
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Objet supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    var indexL = sauce.usersLiked.indexOf(req.auth.userId);
    var indexD = sauce.usersDisliked.indexOf(req.auth.userId);

    if (req.body.like === 1 && indexL < 0) {
      sauce.usersLiked.push(req.auth.userId);
    } else if (req.body.like === -1 && indexD < 0) {
      sauce.usersDisliked.push(req.auth.userId);
    } else if (req.body.like === 0) {
      if (indexD >= 0) {
        sauce.usersDisliked.splice(indexD, 1);
      } else if (indexL >= 0) {
        sauce.usersLiked.splice(indexL, 1);
      }
    }
    sauce.likes = sauce.usersLiked.length;
    sauce.dislikes = sauce.usersDisliked.length;
    sauce
      .save()
      .then(() => {
        res.status(201).json({ message: "Enregistré !" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  });
};
