// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/yourdb")
  .then(() => console.log("Connected!"))

// Business Schema
const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  headline: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Business = mongoose.model('Business', businessSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Headline generation function
const generateHeadline = (name, location) => {
  const headlines = [
    `Why ${name} is ${location}'s Sweetest Spot in 2025`,
    `Discover ${name}: ${location}'s Hidden Gem in 2025`,
    `${name} - The Best in ${location} According to Customers`,
    `2025's Must-Visit: ${name} in ${location}`,
    `Top Rated: Why ${name} Dominates ${location}`,
    `Experience Excellence: ${name} - ${location}'s Favorite`,
    `${name} - Redefining Quality in ${location} for 2025`,
    `The Ultimate Guide to ${name} in ${location}`,
    `Customer Choice: ${name} Named Best in ${location}`,
    `${name}: ${location}'s Premier Destination This Year`
  ];
  return headlines[Math.floor(Math.random() * headlines.length)];
};

// Generate simulated data
const generateBusinessData = (name, location) => {
  return {
    rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
    reviews: Math.floor(Math.random() * 200) + 50,
    headline: generateHeadline(name, location)
  };
};

// POST endpoint for business data
app.post('/business-data', async (req, res) => {
  try {
    const { name, location } = req.body;
    
    // Basic validation
    if (!name || !location) {
      return res.status(400).json({ error: 'Both name and location are required' });
    }

    // Check if business exists in DB
    let business = await Business.findOne({ name, location });
    
    if (!business) {
      // Create new business with simulated data
      const newBusinessData = generateBusinessData(name, location);
      business = new Business({
        name,
        location,
        ...newBusinessData
      });
      await business.save();
    }

    res.json({
      rating: business.rating,
      reviews: business.reviews,
      headline: business.headline
    });
  } catch (error) {
    console.error('Error in /business-data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint for headline regeneration
app.get('/regenerate-headline', async (req, res) => {
  try {
    const { name, location } = req.query;
    
    // Basic validation
    if (!name || !location) {
      return res.status(400).json({ error: 'Both name and location are required' });
    }

    // Find business in DB
    const business = await Business.findOne({ name, location });
    
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }

    // Generate new headline and update
    const newHeadline = generateHeadline(name, location);
    business.headline = newHeadline;
    business.updatedAt = new Date();
    await business.save();
    
    res.json({ headline: newHeadline });
  } catch (error) {
    console.error('Error in /regenerate-headline:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/businesses', async (req, res) => {
  try {
    const businesses = await Business.find().sort({ createdAt: -1 });
    res.json(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});