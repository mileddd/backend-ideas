import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user-routes.js";
import ideaRoutes from './src/routes/idea-routes.js';
import authMiddleware from './src/middleware/auth-middleware.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();

const app = express();

const swaggerDocument = YAML.load('./openapi.yaml'); // 👈 loads your spec

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));


// Routes
app.use("/api/auth/", userRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', authMiddleware, ideaRoutes);



// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Be TotalCare API!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
