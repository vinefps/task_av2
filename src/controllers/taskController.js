const prisma = require('../models/prismaClient');

exports.createTask = async (req, res) => {
  const { title } = req.body;
  try {
    const task = await prisma.task.create({
      data: { title, userId: req.user.id },
    });
    res.status(201).json(task);
  } catch {
    res.status(400).json({ error: 'Could not create task.' });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, completed },
    });
    res.json(updatedTask);
  } catch {
    res.status(400).json({ error: 'Could not update task.' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Task deleted successfully.' });
  } catch {
    res.status(400).json({ error: 'Could not delete task.' });
  }
};
