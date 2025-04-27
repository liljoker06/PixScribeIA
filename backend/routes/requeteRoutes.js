const { deleteRequete } = require('../controllers/requeteController');
const router = require('express').Router();
const authMiddleware = require('../middleware/auth');


router.delete('/:requeteId',authMiddleware, deleteRequete);



module.exports = router;