const pilotModel = require('../models/pilotModel');

const businessError = (message, status) => Object.assign(new Error(message), { status });

const validatePilot = (data) => {
    const { nombre, licencia, horasVuelo, estado } = data;
    if (!nombre || !licencia || horasVuelo === undefined || !estado) {
        throw businessError('nombre, licencia, horasVuelo y estado son obligatorios para el piloto.', 400);
    }
    if (typeof horasVuelo !== 'number' || horasVuelo < 0) {
        throw businessError('horasVuelo debe ser un número mayor o igual a 0.', 400);
    }
};

const getAllPilots = async () => await pilotModel.getAll();

const getPilotById = async (id) => {
    const pilot = await pilotModel.getById(id);
    if (!pilot) throw businessError(`El piloto con ID ${id} no fue encontrado.`, 404);
    return pilot;
};

const registerPilot = async (data) => {
    validatePilot(data);
    return await pilotModel.save(data);
};

const updatePilot = async (id, data) => {
    const existing = await getPilotById(id);
    const merged = { ...existing, ...data };
    validatePilot(merged);
    return await pilotModel.update(id, merged);
};

const deletePilot = async (id) => {
    await getPilotById(id);
    return await pilotModel.remove(id);
};

module.exports = { getAllPilots, getPilotById, registerPilot, updatePilot, deletePilot };
