const express = require('express');
const router = express.Router();
const ajandekController = require('../controllers/ajandekController');

router.get('/', ajandekController.getAjandekok);
router.get('/alkalom/:alkalomNev', ajandekController.getAjandekokByAlkalom);

module.exports = router;
