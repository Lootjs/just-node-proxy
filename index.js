const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors')

const app = express();
const port = 3000;

const LOKALISE_API_ENDPOINT = 'https://api.lokalise.com/api2';

app.use(express.json());
app.use(cors());

app.all('*', async (req, res) => {
    const url = LOKALISE_API_ENDPOINT + req.url;
    try {
        if (req.method === 'GET') {
            const response = await fetch(url, {
                method: req.method,
                headers: {
                    'X-Api-Token': req.headers['x-api-token']
                },
            });
            const data = await response.json();
            res.send(data);
        } else {
            const response = await fetch(url, {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Token': req.headers['x-api-token']
                },
                body: JSON.stringify(req.body)
            });
            const data = await response.json();
            res.send(data);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Listening http://localhost:${port}`);
});
