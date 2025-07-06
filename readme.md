## Proyecto: API REST Segura con Node.js, Sequelize y MySQL

Este proyecto es una API REST desarrollada con Node.js y Express, que implementa autenticación de usuarios, gestión de tareas protegidas y despliegue en la nube. La aplicación está desarrollada como parte del Módulo 4 del curso de Backend Node.js.

## Tecnologías utilizadas

    *Node.js
    *Express.js
    *MySQL (Google Cloud SQL)
    *Sequelize ORM
    *JWT para autenticación
    *bcrypt para hashing de contraseñas
    *Docker y Docker Compose
    *Render para despliegue
    *Test para testing
    *Estructura del proyecto

# Clonar el repositorio

git clone https://github.com/danielborjac/modulo7-ejercicio-4
cd modulo4-ejercicio

# Variables de entorno

Crear un archivo .env con las siguientes variables:

DB_NAME=secure_tasks
DB_USER=root
DB_PASSWORD=root
DB_HOST=localhost
JWT_SECRET=supersecreto123
PORT=3000
NODE_ENV=development
DB_NAME_TEST=secure_tasks_test

Si se desea revisar en producción:

DB_NAME=secure_tasks
DB_USER=root
DB_PASSWORD=root
DB_HOST=34.30.47.104
JWT_SECRET=supersecreto123
PORT=3000
NODE_ENV=production
DB_NAME_TEST=secure_tasks_test

# Instalar dependencias

npm install

# Correr el proyecto

npm start

# Correr las pruebas

npm test

# Contenerización con Docker

Dockerfile

# Correr en contenedor

docker-compose up

# Despliegue en la nube

Opción seleccionada: Render + Google Cloud SQL


# Endpoints principales

    POST /api/register: Registro de usuario.

    POST /api/login: Login y obtención de JWT.

    Tasks (requiere autenticación)

    GET /api/tasks: Obtener tareas del usuario.

    POST /api/tasks: Crear nueva tarea.

    PUT /api/tasks/:id: Actualizar tarea.

    DELETE /api/tasks/:id: Eliminar tarea.


