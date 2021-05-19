var express = require('express');
var router = express.Router();
var controller = require('../controllers/imgController');

router.get('/:imagen',controller.mostrarImg)

module.exports = router;