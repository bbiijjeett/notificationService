const express = require('express');
const bodyParser = require('body-parser');
const notificationRoutes = require('./api/notificationRoutes'); 

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000'], //tAllow only your frontend domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Authorization', 'Content-Type'],
};

app.use(bodyParser.json());

// Use notification routes
app.use('/api/notifications', notificationRoutes);
// app.use("/api/email", emailRoutes);
// app.use("/api/sms", smsRoutes);

app.listen(4000, () => {
  console.log('Notification Service running on port 4000');
});