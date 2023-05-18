const express = require('express');
const axios = require('axios');
const { connectToMongoDB, fetchCollectionData, updateCollectionData } = require('./db');

const app = express();
const port = 3000;
const collectionName = 'gold_items';

// Connect to MongoDB
connectToMongoDB();

// Middleware
app.use(express.json());

// Mock Gold Price API endpoint
app.get('/gold-price', (req, res) => {
  const goldPrice = Math.random() * 100;
  res.json({ price: goldPrice });
});

// Update Gold Item Price API endpoint
app.put('/gold-items/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const grams = req.body.grams;

  try {
    const { data } = await axios.get('http://localhost:3000/gold-price');
    const goldPrice = data.price;

    const updatedPrice = grams * goldPrice;

    // Retrieve the existing gold item data
    const existingData = await fetchCollectionData(collectionName, { _id: itemId });

    // Check if the updated price is lower than the existing best price
    const existingBestPrice = existingData[0].bestPrice;
    const bestPrice = updatedPrice < existingBestPrice ? updatedPrice : existingBestPrice;

    // Update the gold item data with the updated price and best price
    await updateCollectionData(collectionName, { _id: itemId }, { price: updatedPrice, bestPrice });

    res.json({ message: 'Gold item price updated successfully' });
  } catch (error) {
    console.error('Failed to update gold item price', error);
    res.status(500).json({ error: 'Failed to update gold item price' });
  }
});



// Retrieve Gold Item Price API endpoint
app.get('/gold-items', async (req, res) => {
  const itemId = req.query.itemId;
  const timeRange = parseInt(req.query.timeRange) || 30;

  try {
    let filter = {};

    if (itemId) {
      filter = { _id: itemId };
    }

    const data = await fetchCollectionData(collectionName, filter);
    let goldItems = data.map((item) => ({
      _id: item._id,
      price: item.price,
      lastUpdated: item.lastUpdated,
      bestPrice: item.bestPrice,
    }));

    if (timeRange > 0) {
      const timeRangeDate = new Date();
      timeRangeDate.setDate(timeRangeDate.getDate() - timeRange);

      goldItems = goldItems.filter((item) => item.lastUpdated >= timeRangeDate);
    }

    res.json({ goldItems });
  } catch (error) {
    console.error('Failed to retrieve gold item prices', error);
    res.status(500).json({ error: 'Failed to retrieve gold item prices' });
  }
});


app.get('/gold-items/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const filter = { _id: itemId };
    const data = await fetchCollectionData(collectionName, filter);

    if (data.length === 0) {
      res.status(404).json({ error: 'Gold item not found' });
      return;
    }

    const goldItem = {
      _id: data[0]._id,
      price: data[0].price,
      lastUpdated: data[0].lastUpdated,
      bestPrice: data[0].bestPrice,
    };

    res.json({ goldItem });
  } catch (error) {
    console.error('Failed to retrieve gold item price', error);
    res.status(500).json({ error: 'Failed to retrieve gold item price' });
  }
});




// Bonus: Script to update the prices of gold items daily
const updateGoldItemPricesDaily = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/gold-price');
    const goldPrice = data.price;

    const goldItems = await fetchCollectionData(collectionName);
    const updates = goldItems.map((item) => ({
      filter: { _id: item._id },
      update: { price: item.grams * goldPrice, lastUpdated: new Date() },
    }));

    for (const { filter, update } of updates) {
      await updateCollectionData(collectionName, filter, update);
    }

    console.log('Gold item prices updated daily');
  } catch (error) {
    console.error('Failed to update gold item prices daily', error);
  }
};

// Run the script to update gold item prices daily
updateGoldItemPricesDaily().then(() => {
  console.log('Gold item prices update script started');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
