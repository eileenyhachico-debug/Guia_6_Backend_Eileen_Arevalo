const airplaneService = require('../services/airplaneService');

const getAirplanes = async (req, res) => {
    try {
        const airplanes = await airplaneService.getAllAirplanes();
        return res.status(200).json(airplanes);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const getAirplaneById = async (req, res) => {
    try {
        const airplane = await airplaneService.getAirplaneById(req.params.id);
        return res.status(200).json(airplane);
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const createAirplane = async (req, res) => {
    try {
        const newAirplane = await airplaneService.registerAirplane(req.body);
        return res.status(201).json({ message: 'Avión registrado con éxito', data: newAirplane });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const updateAirplane = async (req, res) => {
    try {
        const updated = await airplaneService.updateAirplane(req.params.id, req.body);
        return res.status(200).json({ message: 'Avión actualizado', data: updated });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

const deleteAirplane = async (req, res) => {
    try {
        await airplaneService.deleteAirplane(req.params.id);
        return res.status(200).json({ message: 'Avión eliminado correctamente' });
    } catch (error) {
        return res.status(error.status || 500).json({ error: error.message });
    }
};

module.exports = { getAirplanes, getAirplaneById, createAirplane, updateAirplane, deleteAirplane };
