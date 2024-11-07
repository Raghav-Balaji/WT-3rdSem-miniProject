const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');  // Import User model

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/webtech/wanderwise', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Registration Route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters." });
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: "Account created successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
