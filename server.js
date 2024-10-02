import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoute from './routes/user.js';  // Import userRoute

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.static('public')); // Use public directory
app.use(express.json());  // To parse JSON bodies

// Serve index.html for the root route
app.get('/', (req, res) => res.sendFile(path.resolve('index.html')));

// Use userRoute for all /api related requests
app.use('/api', userRoute);  // Use userRoute for all /api requests

app.listen(PORT, () => {
    console.log(`Server is running on PORT 🖥️ ${PORT}`);
});
