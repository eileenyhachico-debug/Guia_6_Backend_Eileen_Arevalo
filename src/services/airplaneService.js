const airplaneModel = require('../models/airplaneModel');

const businessError = (message, status) => Object.assign(new Error(message), { status });

const validateAirplane = (data) => {
    const { modelo, matricula, capacidadMaxima, fabricante } = data;
    if (!modelo || !matricula || capacidadMaxima === undefined || !fabricante) {
        throw businessError('modelo, matricula, capacidadMaxima y fabricante son obligatorios para el avión.', 400);
    }
    if (typeof capacidadMaxima !== 'number' || capacidadMaxima <= 0) {
        throw businessError('capacidadMaxima debe ser un número mayor a 0.', 400);
    }
};

const getAllAirplanes = async () => await airplaneModel.getAll();

const getAirplaneById = async (id) => {
    const airplane = await airplaneModel.getById(id);
    if (!airplane) throw businessError(`El avión con ID ${id} no fue encontrado.`, 404);
    return airplane;
};

const registerAirplane = async (data) => {
    validateAirplane(data);
    const airplanes = await airplaneModel.getAll();
    if (airplanes.some(a => a.matricula === data.matricula)) {
        throw businessError(`Ya existe un avión con la matrícula ${data.matricula}.`, 400);
    }
    return await airplaneModel.save(data);
};

const updateAirplane = async (id, data) => {
    const existing = await getAirplaneById(id);
    const merged = { ...existing, ...data };
    validateAirplane(merged);
    return await airplaneModel.update(id, merged);
};

const deleteAirplane = async (id) => {
    await getAirplaneById(id);
    return await airplaneModel.remove(id);
};

module.exports = { getAllAirplanes, getAirplaneById, registerAirplane, updateAirplane, deleteAirplane };
