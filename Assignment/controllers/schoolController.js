const School = require("../models/schoolModel");
const calculateDistance = require("../utils/distanceCalculator");



const addSchool = (req, res) => {

    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (
        !name ||
        !address ||
        latitude === undefined ||
        longitude === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    if (
        typeof latitude !== "number" ||
        typeof longitude !== "number"
    ) {
        return res.status(400).json({
            success: false,
            message: "Latitude and Longitude must be numbers"
        });
    }

    const schoolData = {
        name,
        address,
        latitude,
        longitude
    };

    School.addSchool(schoolData, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error",
                error: err
            });
        }

        res.status(201).json({
            success: true,
            message: "School Added Successfully",
            schoolId: result.insertId
        });
    });
};





const listSchools = (req, res) => {

    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({
            success: false,
            message: "User latitude and longitude required"
        });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    School.getAllSchools((err, schools) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error",
                error: err
            });
        }

        const sortedSchools = schools.map((school) => {

            const distance = calculateDistance(
                userLat,
                userLon,
                school.latitude,
                school.longitude
            );

            return {
                ...school,
                distance: distance.toFixed(2) + " KM"
            };

        }).sort((a, b) => {

            return parseFloat(a.distance) - parseFloat(b.distance);

        });

        res.status(200).json({
            success: true,
            count: sortedSchools.length,
            schools: sortedSchools
        });

    });
};

module.exports = {
    addSchool,
    listSchools
};