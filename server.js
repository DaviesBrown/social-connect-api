const express = require('express');
const routes = require('./routes');
const dbClient = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 3000;

dbClient.connectDB();

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});