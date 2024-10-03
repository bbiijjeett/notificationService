const Pusher = require('pusher');

const pusher = new Pusher({
    appId: '1874396',
    key: '6f3fec82e24ad5c493f9',
    secret: 'ddd6a59029c8887e1b6a',
    cluster: 'ap2',
    useTLS: true
});

const sendRealTimeNotification = (channel, event, data) => {
    pusher.trigger(channel, event, data);
};

module.exports = sendRealTimeNotification;