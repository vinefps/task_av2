const prisma = require('../models/prismaClient');

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
  const { title } = req.body;

  // Verificar se o título foi enviado
  if (!title) {
    return res.status(400).json({ error: 'Title is required.' });
  }

  try {
    console.log('User ID:', req.user.id); // Log para verificar o ID do usuário
    const task = await prisma.tasks.create({
      data: {
        title,
        userId: req.user.id,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    console.error('Erro no createTask:', error);
    res.status(400).json({ error: 'Could not create task.' });
  }
};


// Listar todas as tarefas do usuário
exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany({
      where: { userId: req.user.id },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not fetch tasks.' });
  }
};

// Atualizar uma tarefa
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required.' });
  }

  try {
    const updatedTask = await prisma.tasks.update({
      where: { id: parseInt(id) },
      data: { title },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not update task.' });
  }
};

// Deletar uma tarefa
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tasks.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Could not delete task.' });
  }
};
