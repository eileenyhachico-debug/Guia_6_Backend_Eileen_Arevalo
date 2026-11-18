const fs = require('fs/promises');
const path = require('path');
const filePath = path.join(__dirname, '../../data/airplanes.json');

const readData = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeData = async (data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

const getAll = async () => await readData();

const getById = async (id) => {
    const items = await readData();
    return items.find(i => i.id === String(id));
};

const save = async (itemData) => {
    const items = await readData();
    const newItem = { ...itemData, id: Date.now().toString() };
    items.push(newItem);
    await writeData(items);
    return newItem;
};

const update = async (id, itemData) => {
    const items = await readData();
    const index = items.findIndex(i => i.id === String(id));
    if (index === -1) return null;
    items[index] = { ...itemData, id: String(id) };
    await writeData(items);
    return items[index];
};

const remove = async (id) => {
    const items = await readData();
    const filtered = items.filter(i => i.id !== String(id));
    if (filtered.length === items.length) return false;
    await writeData(filtered);
    return true;
};

module.exports = { getAll, getById, save, update, remove };
