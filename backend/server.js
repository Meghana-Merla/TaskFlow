require("dotenv").config()
const connectDB = require("./config/db")

const express = require("express")
const cors = require("cors")

const swaggerUi = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const taskRoutes = require("./routes/taskRoutes")
const authRoutes =require("./routes/authRoutes")
const app = express()
connectDB()

app.use(cors())
app.use(express.json())

// Swagger Config

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description: "TaskFlow Backend API Documentation"
    },
    components: {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    }
  }
},
security: [
  {
    bearerAuth: []
  }
],
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./server.js", "./routes/*.js"]
}

const swaggerSpec = swaggerJsDoc(options)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Test API route
 *     responses:
 *       200:
 *         description: API working successfully
 */

app.get("/", (req, res) => {
  res.send("Backend running successfully")
})

const PORT = 5000
app.use("/api", taskRoutes)
app.use("/api/auth", authRoutes)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})