// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/bitcoin_prices', { useNewUrlParser: true, useUnifiedTopology: true });

// Define BitcoinPrice schema and model (adjust as needed)
const bitcoinPriceSchema = new mongoose.Schema({
  timestamp: Number,
  price: Number,
});

const BitcoinPrice = mongoose.model('BitcoinPrice', bitcoinPriceSchema);

// Fetch and save Bitcoin price data
const fetchAndSaveBitcoinPrice = async () => {
  try {
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    const timestamp = Date.now();
    const price = response.data.bpi.USD.rate_float;

    await BitcoinPrice.create({ timestamp, price });
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error.message);
  }
};

// Endpoint to fetch Bitcoin price data
app.get('/api/bitcoin-prices', async (req, res) => {
  try {
    const prices = await BitcoinPrice.find();
    res.json(prices);
  } catch (error) {
    console.error('Error fetching Bitcoin prices:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch and save Bitcoin price data every hour
setInterval(fetchAndSaveBitcoinPrice, 3600000);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});