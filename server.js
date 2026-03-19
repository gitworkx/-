const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));

const USERS_JSON = process.env.USER_DATA;

app.post('/api/login', (req, res) => {
    if (!USERS_JSON) {
        return res.status(500).json({ error: "CRITICAL ERROR: USER_DATA secret not found." });
    }

    const { identifier, password } = req.body;
    try {
        const users = JSON.parse(USERS_JSON);
        const found = users.find(u => u.user === identifier && u.pass === password);

        if (found) {
            res.json({ success: true });
        } else {
            res.status(401).json({ error: "Invalid credentials." });
        }
    } catch (e) {
        res.status(500).json({ error: "Invalid JSON format in Secrets." });
    }
});

app.listen(3000);
