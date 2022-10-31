const fs = require('fs');
const Post = require('../models/post');

exports.listPost = (req, res, next) => {
  Post.find()
    .sort({ updatedAt: 'ASC' })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(500).json(err));
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  postObject.userId = req.body.userId;

  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  post
    .save()
    .then(() => res.status(201).json({ message: 'Post enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
};
exports.modifyPost = (req, res, next) => {
  if (req.file) {
    Post.findOne({ _id: req.params.id })
      .then((post) => {
        const filename = post.imageUrl.split('/images')[1];
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
        });
      })
      .catch((error) => res.status(400).json({ error }));
  }
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    : { ...req.body };
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'objet mise à jour' }))
    .catch((error) => res.status(404).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      /*if(post.userId != req.auth.userId){
        req.status(401).json({ message: "Not authorized" });
      }else{*/
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({});
          })
          .catch((error) => res.status(401).json({ error }));
      });
      //}
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post.usersLiked.includes(req.params.userId)) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: +1 },

            $push: { usersLiked: req.params.userId }
          }
        )
          .then(() => res.status(200).json({ message: 'Post like +1' }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        if (post.usersLiked.includes(req.params.userId)) {
          Post.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 },

              $pull: { usersLiked: req.params.userId }
            }
          )
            .then(() => res.status(200).json({ message: 'Post like 0' }))
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
