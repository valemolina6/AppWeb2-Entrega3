# Documentación de Rutas y Endpoints para Evaluación (Etapa 4)

El documento detalla la estructura desarrollada para la gestión de la tienda virtual, abarcando los procesos de autenticación, persistencia de datos en MongoDB Atlas y validación de esquemas mediante Mongoose.

## 1. Módulo de Autenticación y Usuarios

Las contraseñas de los usuarios se almacenan en la base de datos de forma encriptada mediante la aplicación de funciones de hashing con la librería Bcrypt.

* **Registro de Usuario**
  * **Método:** POST
  * **URL:** http://localhost:3001/user/register
  * **Cuerpo de la petición (JSON):**
    ```json
    {
      "name": "Test1",
      "lastname": "Test2",
      "username": "testing",
      "email": "test@example.com",
      "pass": "password"
    }
    ```

* **Inicio de Sesión (Login)**
  * **Método:** POST
  * **URL:** http://localhost:3001/user/login
  * **Descripción:** Compara las credenciales utilizando Bcrypt. Si la validación es correcta, el servidor genera y retorna un Token JWT.
  * **Cuerpo de la petición (JSON):**
    ```json
    {
      "username": "testing",
      "pass": "password"
    }
    ```

## 2. Módulo de Productos y Categorías

Los datos han sido migrados a colecciones dentro de MongoDB, permitiendo su consulta dinámica desde la interfaz del cliente.

* **Listado de Productos**
  * **Método:** GET
  * **URL:** http://localhost:3001/productos/todos
  * **Descripción:** Retorna el arreglo completo de artículos de indumentaria guardados en la base de datos.
    
## 3. Módulo de Ventas

El proceso de creación de órdenes se encuentra protegido mediante un middleware que verifica la presencia y validez del token de seguridad. 

* **Creación de Venta**
  * **Método:** POST
  * **URL:** http://localhost:3001/ventas/create
  * **Cabeceras requeridas:** `Authorization: Bearer <TOKEN_JWT>`
  * **Cuerpo de la petición (JSON):**
    ```json
    {
      "user": "(Id del user)",
      "total": 41999,
      "productos": [
        {
          "productoId": "6a20dc8f2744597dcf4b9220",
          "nombre": "Remera",
          "cantidad": 1,
          "precio": 9999
        },
        {
          "productoId": "6a20dc8f2744597dcf4b9222",
          "nombre": "Campera",
          "cantidad": 1,
          "precio": 32000
        }
      ]
    }
    ```
---
El servidor corre por defecto en el puerto 3001 y se conecta directamente al Cluster de MongoDB Atlas mediante variables de entorno.
