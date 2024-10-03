const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const sendRealTimeNotification = require('../handlers/pusherHandler');
const apiLimiter = require('../utils/rateLimiter');

// Apply rate limiter to all notification routes
router.use(apiLimiter);

// Helper function to send notifications to both user and vendor
const notifyUserAndVendor = (userId, vendorId, event, notificationData) => {
    sendRealTimeNotification(`user-${userId}`, event, notificationData);
    sendRealTimeNotification(`vendor-${vendorId}`, event, notificationData);
};

// Error handling middleware function
const handleError = (res, message, statusCode = 500) => {
    console.error(message);
    res.status(statusCode).json({ error: message });
};

// Order placed notification
router.post('/order-placed', (req, res) => {
    try {
        const { userId, vendorId, orderDetails } = req.body;

        if (!userId || !vendorId || !orderDetails) {
            return handleError(res, 'Missing required fields: userId, vendorId, or orderDetails', 400);
        }

        const notificationData = {
            title: 'Order Placed',
            message: 'Your order has been placed successfully!',
            orderDetails
        };

        notifyUserAndVendor(userId, vendorId, 'order-placed', notificationData);
        res.status(200).json({ message: 'Order placed notification sent!' });
    } catch (error) {
        handleError(res, `Failed to send order-placed notification: ${error.message}`);
    }
});

// Order accepted notification
router.post('/order-accepted',authMiddleware, (req, res) => {
    try {
        const { userId, vendorId, orderDetails } = req.body;

        if (!userId || !vendorId || !orderDetails) {
            return handleError(res, 'Missing required fields: userId, vendorId, or orderDetails', 400);
        }

        const notificationData = {
            title: 'Order Accepted',
            message: 'Your order has been accepted by the restaurant.',
            orderDetails
        };

        notifyUserAndVendor(userId, vendorId, 'order-accepted', notificationData);
        res.status(200).json({ message: 'Order accepted notification sent!' });
    } catch (error) {
        handleError(res, `Failed to send order-accepted notification: ${error.message}`);
    }
});

// Food preparing notification
router.post('/food-preparing',authMiddleware, (req, res) => {
    try {
        const { userId, vendorId, orderDetails } = req.body;

        if (!userId || !vendorId || !orderDetails) {
            return handleError(res, 'Missing required fields: userId, vendorId, or orderDetails', 400);
        }

        const notificationData = {
            title: 'Food Preparing',
            message: 'Your food is being prepared by the restaurant.',
            orderDetails
        };

        notifyUserAndVendor(userId, vendorId, 'food-preparing', notificationData);
        res.status(200).json({ message: 'Food preparing notification sent!' });
    } catch (error) {
        handleError(res, `Failed to send food-preparing notification: ${error.message}`);
    }
});

// Food ready notification
router.post('/food-ready',authMiddleware, (req, res) => {
    try {
        const { userId, vendorId, orderDetails } = req.body;

        if (!userId || !vendorId || !orderDetails) {
            return handleError(res, 'Missing required fields: userId, vendorId, or orderDetails', 400);
        }

        const notificationData = {
            title: 'Food Ready',
            message: 'Your food is ready for pickup or delivery.',
            orderDetails
        };

        notifyUserAndVendor(userId, vendorId, 'food-ready', notificationData);
        res.status(200).json({ message: 'Food ready notification sent!' });
    } catch (error) {
        handleError(res, `Failed to send food-ready notification: ${error.message}`);
    }
});

// Food served notification (for dine-in)
router.post('/food-served',authMiddleware, (req, res) => {
    try {
        const { userId, vendorId, orderDetails } = req.body;

        if (!userId || !vendorId || !orderDetails) {
            return handleError(res, 'Missing required fields: userId, vendorId, or orderDetails', 400);
        }

        const notificationData = {
            title: 'Food Served',
            message: 'Your food has been served at your table.',
            orderDetails
        };

        notifyUserAndVendor(userId, vendorId, 'food-served', notificationData);
        res.status(200).json({ message: 'Food served notification sent!' });
    } catch (error) {
        handleError(res, `Failed to send food-served notification: ${error.message}`);
    }
});

// Food delivered notification (for delivery orders)
router.post('/food-delivered',authMiddleware, (req, res) => {
    try {
        const { userId, vendorId, orderDetails } = req.body;

        if (!userId || !vendorId || !orderDetails) {
            return handleError(res, 'Missing required fields: userId, vendorId, or orderDetails', 400);
        }

        const notificationData = {
            title: 'Food Delivered',
            message: 'Your food has been delivered. Thank you for ordering!',
            orderDetails
        };

        notifyUserAndVendor(userId, vendorId, 'food-delivered', notificationData);
        res.status(200).json({ message: 'Food delivered notification sent!' });
    } catch (error) {
        handleError(res, `Failed to send food-delivered notification: ${error.message}`);
    }
});

module.exports = router;
