import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './db.js';
import postRoutes from './routes/posts.js';
import savedArticlesRoute from './routes/savedArticles.js';
import userRoutes from './routes/profile.js';
import dashboardRoutes from './routes/dashboard.js';

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/posts",postRoutes);
app.use("/api/savedArticles", savedArticlesRoute);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
// // Serve static files
// app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
