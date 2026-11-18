const pilotService = require('../services/pilotService');

const getPilots = async (req, res) => {
    try {
        const pilots = await pilotService.getAllPilots();
        return res.status(200).json(pilots);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const getPilotById = async (req, res) => {
    try {
        const pilot = await pilotService.getPilotById(req.params.id);
        return res.status(200).json(pilot);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const createPilot = async (req, res) => {
    try {
        const newPilot = await pilotService.registerPilot(req.body);
        return res.status(201).json({ message: 'Piloto creado con éxito', data: newPilot });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const updatePilot = async (req, res) => {
    try {
        const updated = await pilotService.updatePilot(req.params.id, req.body);
        return res.status(200).json({ message: 'Piloto actualizado', data: updated });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const deletePilot = async (req, res) => {
    try {
        await pilotService.deletePilot(req.params.id);
        return res.status(200).json({ message: 'Piloto eliminado correctamente' });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

module.exports = { getPilots, getPilotById, createPilot, updatePilot, deletePilot };
