const express = require('express');
const { getSiteContent, updateSiteContent, resetSiteContent } = require('../controllers/content.controllers');

const router = express.Router();

router.get('/', getSiteContent);
router.put('/', updateSiteContent);
router.post('/reset', resetSiteContent);

module.exports = router;
