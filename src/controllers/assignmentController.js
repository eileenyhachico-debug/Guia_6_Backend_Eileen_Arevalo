const assignmentService = require('../services/assignmentService');

const getAssignments = async (req, res) => {
    try {
        const assignments = await assignmentService.getAllAssignments();
        return res.status(200).json(assignments);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const getAssignmentById = async (req, res) => {
    try {
        const assignment = await assignmentService.getAssignmentById(req.params.id);
        return res.status(200).json(assignment);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const createAssignment = async (req, res) => {
    try {
        const newAssignment = await assignmentService.createAssignment(req.body);
        return res.status(201).json({ message: 'Asignación creada con éxito', data: newAssignment });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const updateAssignment = async (req, res) => {
    try {
        const updated = await assignmentService.updateAssignment(req.params.id, req.body);
        return res.status(200).json({ message: 'Asignación actualizada', data: updated });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        await assignmentService.deleteAssignment(req.params.id);
        return res.status(200).json({ message: 'Asignación eliminada correctamente' });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

module.exports = { getAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment };
