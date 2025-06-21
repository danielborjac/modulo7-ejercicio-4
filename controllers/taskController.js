const { Task } = require('../models');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { UserId: req.userId } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.create({ title, UserId: req.userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = await Task.findOne({ where: { id, UserId: req.userId } });
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    task.title = title ?? task.title;
    task.completed = completed ?? task.completed;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id, UserId: req.userId } });
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });

    await task.destroy();
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
};