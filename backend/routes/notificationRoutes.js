const express = require('express');
const { getUserNotifications, markAsRead, createNotification } = require('../controllers/notificationController');
const verifyJWT = require('../middlewares/verifyJWT');
const router = express.Router();

router.get('/:email', verifyJWT, getUserNotifications);
router.patch('/:id/read', verifyJWT, markAsRead);
router.post('/', verifyJWT, createNotification);

module.exports = router;
