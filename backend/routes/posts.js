const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.listPost);
router.post('/', auth, multer, postCtrl.createPost);
router.post('/:id/:userId/like', auth, postCtrl.likePost);
router.post('/:id/:userId/dislike', auth, postCtrl.dislikePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/:id/', auth, postCtrl.getOnePost);

module.exports = router;
