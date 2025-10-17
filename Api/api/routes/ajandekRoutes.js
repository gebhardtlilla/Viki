const express = require('express');
const router = express.Router();
const ajandekController = require('../controllers/ajandekController');

router.get('/', ajandekController.getAjandekok);

module.exports = router;
