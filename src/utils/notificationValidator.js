const validateNotification = (data) => {
    const { userId, vendorId, orderDetails } = data;

    if (!userId || !vendorId || !orderDetails) {
        return false;
    }
    return true;
};

module.exports = { validateNotification };
