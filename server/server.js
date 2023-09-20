const express = require('express');
const cors = require('cors');

const db = require('./db');

const app = express();
app.use(express.json());

const PORT = 2000;

//only for development
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
// app.use(cors());

app.listen(PORT, () => {
    console.log('Example app listening on port', PORT);
});