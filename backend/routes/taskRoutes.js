const express = require("express")

const router = express.Router()

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController")
const authMiddleware = require("../middleware/authMiddleware")

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: Successfully fetched tasks
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with the provided title
 *     tags:
 *       - Tasks
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

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update a task by its ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Task updated successfully
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by its ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */

router.get(
  "/tasks",
  authMiddleware,
  getTasks
)

router.post(
  "/tasks",
  authMiddleware,
  createTask
)

router.put(
  "/tasks/:id",
  authMiddleware,
  updateTask
)

router.delete(
  "/tasks/:id",
  authMiddleware,
  deleteTask
)

module.exports = router