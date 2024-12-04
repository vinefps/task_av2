const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Middleware de autenticação para proteger as rotas
router.use(authMiddleware);

// Rotas de tarefas
router.post('/', createTask); // Criar uma nova tarefa
router.get('/', getTasks); // Listar todas as tarefas do usuário autenticado
router.put('/:id', updateTask); // Atualizar uma tarefa específica
router.delete('/:id', deleteTask); // Deletar uma tarefa específica

module.exports = router;
