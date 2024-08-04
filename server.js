const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/summary', async (req, res) => {
    try {
        const { text } = req.body;
        const response = await axios.post('https://www.chatbase.co/api/summary', {
            message: text,
            chatbotId: "e7lShwiEcfJEfBA0lAy4l"
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error generating summary:', error);
        res.status(500).send('Error generating summary');
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
