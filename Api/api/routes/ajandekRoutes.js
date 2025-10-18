const express = require('express');
const router = express.Router();
const ajandekController = require('../controllers/ajandekController');

router.get('/', ajandekController.getAjandekok);
router.get('/alkalom/:alkalomNev', ajandekController.getAjandekokByAlkalom);
router.get('/stilus/:stilusNev', ajandekController.getAjandekokByStilus);
router.get('/celcsoport/:celcsoportNev', ajandekController.getAjandekokByCelcsoport);

module.exports = router;
