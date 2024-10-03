const express = require('express');
const router = express.Router();
const sendRealTimeNotification = require('../handlers/pusherHandler');

// Order placed notification route
router.post('/order-placed', (req, res) => {
    const { userId, vendorId, orderDetails } = req.body;

    console.log("user-"+req.body.userId);
    // console.log("##################")
    // console.log("vendor-"+req.body.vendorId);
    // console.log(req.body.orderDetails);

    const notificationData = {
        title: 'Order Placed',
        message: 'Your order has been placed successfully!',
        orderDetails
    };
    // console.log(notificationData);

    // Send notifications to user and vendor
    sendRealTimeNotification(`user-${userId}`, 'order-placed', notificationData);
    sendRealTimeNotification(`vendor-${vendorId}`, 'order-placed', notificationData);

    res.status(200).json({ message: 'Real-time notification sent!' });
});

module.exports = router;