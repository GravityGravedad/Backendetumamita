const sqlite3 = require('sqlite3').verbose();
const path = require('path');

//Crea o conecta una base de datos
const dbPath = path.join(__dirname, 'tasks.db');
const db = new sqlite3.Database(dbPath);

//Funcion para iniciar la base de datos
function initializeDatabase() {
    return new Promise((resolve, reject) => {
        //Crea una tabla de usuarios
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
            `, (err) => {
                if (err) {
                    console.error('Error creando tabla de usuarios:', err);
                        reject(err);
                        return;
}

// Funcion para crear tabla de tareas
db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
title TEXT NOT NULL,
description TEXT,
completed BOOLEAN DEFAULT FALSE,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users (id)
)
`, (err) => {
if (err) {
console.error('Error creando tabla tasks:', err);
reject(err);
return;
}
console.log('Base de datos inicializada correctamente');
resolve();
});
});
});
}

// Exportar la base de datos y la funcion de inicio

module.exports = {
    db,
    initializeDatabase
};
