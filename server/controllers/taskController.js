const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err.message); // 👈 log actual error
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};


exports.createTask = async (req, res) => {
  try {
    console.log('👉 Incoming body:', req.body);
    console.log('👉 From token - userId:', req.userId);

    const { title, description } = req.body;

    if (!title) return res.status(400).json({ message: 'Title is required' });
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized: no user ID' });

    const newTask = new Task({
      title,
      description,
      userId: req.userId,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    console.error('❌ Error creating task:', err.message);
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findOneAndDelete({ _id: id, userId: req.userId });
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};
