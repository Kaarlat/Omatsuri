# Omatsuri

## Descripción
Omatsuri es una aplicación web diseñada para encontrar eventos cercanos y permitir a los usuarios crear nuevos eventos para que otros puedan visualizarlos. La aplicación distingue entre usuarios administradores, que pueden crear eventos, y usuarios normales, que pueden visualizar eventos.

## Características
- Autenticación de usuarios (administradores y normales).
- Creación y gestión de eventos por parte de administradores.
- Visualización de eventos cercanos para todos los usuarios.
- Integración con APIs externas para mejorar la experiencia del usuario.

## Instalación
Sigue estos pasos para instalar y configurar el proyecto en tu entorno local.

```bash
# Clonar el repositorio
git clone https://github.com/Kaarlat/Omatsuri.git

# Navegar al directorio del proyecto
cd "C:\\Users\\Karla Trujillo\\Desktop\\Trimaker-main\\proyecto"

# Instalar las dependencias
npm install
Copy
Insert

Uso

Para iniciar el servidor, ejecuta el siguiente comando:

# Iniciar el servidor con nodemon para recarga automática
npx nodemon app.js
Copy
Insert

Accede a la aplicación en tu navegador en http://localhost:8080.

Docker
Para construir y ejecutar la imagen Docker:

# Construir la imagen Docker
docker build -t kaarlaat/omatsuri .

# Ejecutar el contenedor Docker
docker run -p 8080:8080 kaarlaat/omatsuri
Copy
Insert

# Ejecutar pruebas
npm test
Copy
Insert

Contribución
Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork del proyecto.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza los cambios y haz commit (git commit -m 'Añadir nueva funcionalidad').
Sube los cambios a tu rama (git push origin feature/nueva-funcionalidad).
Abre un Pull Request.

Contacto
Para preguntas o soporte, puedes contactarme a través de:

Nombre: Karla T
Correo: trujillo.karla@hotmail.com
GitHub: Kaarlat