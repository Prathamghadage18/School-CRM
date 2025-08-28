import express, { json, urlencoded } from "express";
import { connect } from "mongoose";
import { createServer } from "http";
import socketIo from "socket.io";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "dotenv";

// Load env vars
config();

// Import routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import busRoutes from "./routes/bus";
import materialRoutes from "./routes/materials";
import attendanceRoutes from "./routes/attendance";
import gradeRoutes from "./routes/grades";
// Import other routes...

// Import auth controller for principal initialization
import { createPrincipal } from "./controllers/authController";

// Initialize express app
const app = express();
const server = createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser middleware
app.use(json({ limit: "10mb" }));
app.use(urlencoded({ extended: true }));

// CORS middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join room for specific bus tracking
  socket.on("join-bus-room", (busId) => {
    socket.join(`bus-${busId}`);
    console.log(`Socket ${socket.id} joined bus-${busId}`);
  });

  // Join room for user-specific notifications
  socket.on("join-user-room", (userId) => {
    socket.join(`user-${userId}`);
    console.log(`Socket ${socket.id} joined user-${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Make io accessible to our router
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/grades", gradeRoutes);
// Mount other routes...

// Basic route for testing
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Connect to MongoDB
connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("MongoDB connected successfully");

    // Create principal account if it doesn't exist
    await createPrincipal();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default { app, io };
