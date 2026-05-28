const express = require("express")

const router = express.Router()

const Task = require("../models/Task")

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
router.post("/tasks", async (req, res) => {

  try {

    const { title } = req.body

    const newTask = new Task({
      title
    })

    const savedTask = await newTask.save()

    res.status(201).json(savedTask)

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: Successfully fetched tasks
 */

router.get("/tasks", async (req, res) => {

  try {

    const tasks = await Task.find()

    res.status(200).json(tasks)

  }

  catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})
module.exports = router