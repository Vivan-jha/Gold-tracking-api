const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://0.0.0.0:27017'; // replace with your MongoDB connection URL
const dbName = 'gold_prices'; // replace with your database name

let db;

async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(mongoUrl);
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

async function fetchCollectionData(collectionName, filter = {}) {
  try {
    const collection = db.collection(collectionName);
    const data = await collection.find(filter).toArray();
    return data;
  } catch (error) {
    console.error('Error fetching data from collection', error);
    throw error;
  }
}

async function updateCollectionData(collectionName, filter, update) {
  try {
    const collection = db.collection(collectionName);
    await collection.updateOne(filter, { $set: update }, { upsert: true });
  } catch (error) {
    console.error('Error updating data in collection', error);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
  fetchCollectionData,
  updateCollectionData,
};
