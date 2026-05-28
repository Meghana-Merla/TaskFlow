const express = require("express")

const router = express.Router()

const { createTask } = require("../controllers/taskController")

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Backend
 *     responses:
 *       201:
 *         description: Task created successfully
 */

router.post("/tasks", createTask)

module.exports = router