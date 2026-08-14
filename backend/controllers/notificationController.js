const Notification = require('../models/notificationModel');

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
    try {
        const { email } = req.params;
        const notifications = await Notification.find({ userEmail: email }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Mark notification as read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );
        res.status(200).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new notification (internal use typically)
const createNotification = async (req, res) => {
    try {
        const { userEmail, message } = req.body;
        const notification = await Notification.create({ userEmail, message });
        res.status(201).json({ success: true, notification });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getUserNotifications,
    markAsRead,
    createNotification
};
