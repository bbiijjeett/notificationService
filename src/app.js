const express = require('express');
const bodyParser = require('body-parser');
const notificationRoutes = require('./api/notificationRoutes'); 

const app = express();
app.use(bodyParser.json());

// Use notification routes
app.use('/api/notifications', notificationRoutes);

app.listen(3001, () => {
  console.log('Notification Service running on port 3001');
});