const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Mock database
let users = [
    { email: "usuario@ejemplo.com", password: "$2b$10$abcdefghijklmnopqrstuv" } // hashed password
];

// Middleware for token verification
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Route to update password
app.post('/api/change-password', authenticateToken, async (req, res) => {
    const { email, newPassword } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.sendStatus(404);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    res.send({ message: 'Password updated successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
