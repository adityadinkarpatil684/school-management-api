const db = require("../config/db");

const addSchool = (schoolData, callback) => {

    const query = `
        INSERT INTO schools (name, address, latitude, longitude)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            schoolData.name,
            schoolData.address,
            schoolData.latitude,
            schoolData.longitude
        ],
        callback
    );
};

const getAllSchools = (callback) => {

    const query = `SELECT * FROM schools`;

    db.query(query, callback);
};

module.exports = {
    addSchool,
    getAllSchools
};