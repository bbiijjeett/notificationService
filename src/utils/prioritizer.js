const PRIORITY = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3
};

// Define prioritization logic based on notification type or urgency
const prioritizeNotification = (notification) => {
    const { type, urgency } = notification;

    // You can expand these rules based on the types and urgency of your notifications
    if (urgency === 'high' || type === 'order-placed') {
        return PRIORITY.HIGH;
    } else if (urgency === 'medium' || type === 'order-confirmed') {
        return PRIORITY.MEDIUM;
    } else {
        return PRIORITY.LOW;
    }
};

// Sort an array of notifications by priority
const sortByPriority = (notifications) => {
    return notifications.sort((a, b) => prioritizeNotification(a) - prioritizeNotification(b));
};

module.exports = { prioritizeNotification, sortByPriority, PRIORITY };
