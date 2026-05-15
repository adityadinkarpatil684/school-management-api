# School Management API

A RESTful API built using Node.js, Express.js, and MySQL to manage school data.

The API allows users to:

- Add new schools
- Retrieve schools sorted by proximity to a user's location

---

# Project Structure

```bash
school-management-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── schoolController.js
│
├── models/
│   └── schoolModel.js
│
├── routes/
│   └── schoolRoutes.js
│
├── utils/
│   └── distanceCalculator.js
│
├── .env
├── server.js
├── package.json
```

---

# Installation & Setup

## 1 Clone Repository

```bash
git clone https://github.com/yourusername/school-management-api.git
```

---

## 2 Install Dependencies

```bash
npm install
```

---

## 3 Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=*********
DB_NAME=school_management
```

---

## 4 Create MySQL Database

```sql
CREATE DATABASE school_management;
```

Use database:

```sql
USE school_management;
```

Create table:

```sql
CREATE TABLE schools (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

## 5 Run Server

```bash
npm run dev
```

Server will start on:

```bash
http://localhost:5000
```

---

# Base URL

```bash
http://localhost:5000/api
```

For deployed version:

```bash
https://your-render-url.onrender.com/api
```

---

# API Endpoints

---

# 1 Add School API

Add a new school to the database.

## Endpoint

```http
POST /api/addSchool
```

---

## Request Body

```json
{
    "name": "ABC School",
    "address": "Pune Maharashtra",
    "latitude": 18.5204,
    "longitude": 73.8567
}
```

---

## Success Response

```json
{
    "success": true,
    "message": "School Added Successfully",
    "schoolId": 1
}
```

---

## Error Response

```json
{
    "success": false,
    "message": "All fields are required"
}
```

---

# 2 List Schools API

Fetch all schools sorted by proximity to user location.

## Endpoint

```http
GET /api/listSchools
```

---

## Query Parameters

| Parameter | Type | Description |
|----------|------|-------------|
| latitude | Number | User latitude |
| longitude | Number | User longitude |

---

## Example Request

```http
GET /api/listSchools?latitude=18.5204&longitude=73.8567
```

---

## Success Response

```json
{
    "success": true,
    "count": 2,
    "schools": [
        {
            "id": 1,
            "name": "ABC School",
            "address": "Pune Maharashtra",
            "latitude": 18.5204,
            "longitude": 73.8567,
            "distance": "0.00 KM"
        },
        {
            "id": 2,
            "name": "XYZ School",
            "address": "Mumbai Maharashtra",
            "latitude": 19.0760,
            "longitude": 72.8777,
            "distance": "120.45 KM"
        }
    ]
}
```

---

## Error Response

```json
{
    "success": false,
    "message": "User latitude and longitude required"
}
```

---

# Distance Calculation

The API uses the Haversine Formula to calculate geographical distance between the user and schools.

---

# Author

Your Name
