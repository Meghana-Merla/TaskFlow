const Task = require("../models/Task")

const createTask = async (req, res) => {

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

}

module.exports = {
  createTask
}