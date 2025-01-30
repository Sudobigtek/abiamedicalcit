// backend/src/controllers/projectController.js
import { Project } from '../models/Project.js';

export const projectController = {
  // Get all projects
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single project
  getProject: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create project
  createProject: async (req, res) => {
    try {
      const project = new Project(req.body);
      const savedProject = await project.save();
      res.status(201).json(savedProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update project
  updateProject: async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete project
  deleteProject: async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json({ message: 'Project deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};