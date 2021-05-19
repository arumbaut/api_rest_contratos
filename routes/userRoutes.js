var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController');

router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.user);
router.put('/:id', controller.edit);
//router.post('/', controller.upload);

module.exports = router;
