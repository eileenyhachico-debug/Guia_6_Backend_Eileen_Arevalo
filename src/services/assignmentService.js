const pilotModel = require('../models/pilotModel');
const airplaneModel = require('../models/airplaneModel');
const assignmentModel = require('../models/assignmentModel');

const businessError = (message, status) => Object.assign(new Error(message), { status });

// Validaciones relacionales: el piloto y el avión deben existir antes de guardar
const validateAssignment = async (data) => {
    const { idPiloto, idAvion, fechaVuelo, rutaAsignada } = data;
    if (!idPiloto || !idAvion || !fechaVuelo || !rutaAsignada) {
        throw businessError('idPiloto, idAvion, fechaVuelo y rutaAsignada son obligatorios.', 400);
    }
    if (Number.isNaN(Date.parse(fechaVuelo))) {
        throw businessError('fechaVuelo no es una fecha válida.', 400);
    }

    const pilot = await pilotModel.getById(idPiloto);
    if (!pilot) {
        throw businessError(`El piloto con ID ${idPiloto} no existe en el sistema.`, 400);
    }

    const airplane = await airplaneModel.getById(idAvion);
    if (!airplane) {
        throw businessError(`El avión con ID ${idAvion} no existe en el parque aéreo.`, 400);
    }
};

const getAllAssignments = async () => await assignmentModel.getAll();

const getAssignmentById = async (id) => {
    const assignment = await assignmentModel.getById(id);
    if (!assignment) throw businessError(`La asignación con ID ${id} no fue encontrada.`, 404);
    return assignment;
};

const createAssignment = async (data) => {
    await validateAssignment(data);
    return await assignmentModel.save(data);
};

const updateAssignment = async (id, data) => {
    const existing = await getAssignmentById(id);
    const merged = { ...existing, ...data };
    await validateAssignment(merged);
    return await assignmentModel.update(id, merged);
};

const deleteAssignment = async (id) => {
    await getAssignmentById(id);
    return await assignmentModel.remove(id);
};

module.exports = { getAllAssignments, getAssignmentById, createAssignment, updateAssignment, deleteAssignment };
