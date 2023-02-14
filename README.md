# Supermarket
##Backend
Requisitos
Java 11 o superior
Maven
PostgreSQL
Instalación
Clonar el repositorio desde GitHub mediante el comando git clone https://github.com/<tu-usuario>/supermercado.git.

Abrir el proyecto en un IDE de Java, como Eclipse o IntelliJ.

Configurar la base de datos PostgreSQL en el archivo application.properties. Puedes utilizar los siguientes valores:

**
spring.datasource.url=jdbc:postgresql://localhost:5432/supermercado
spring.datasource.username=usuario
spring.datasource.password=contraseña
**
Donde usuario y contraseña son los valores de acceso a la base de datos que hayas configurado previamente.

Configuración
Para configurar el proyecto, no es necesario realizar ninguna acción adicional. Las configuraciones por defecto ya son suficientes para ejecutar el backend.

Ejecución
Para ejecutar el backend en un servidor local, sigue los siguientes pasos:

Abre una terminal en el directorio raíz del proyecto.

Ejecuta el comando mvn spring-boot:run.

##Frontend
Requisitos
Node.js
Angular CLI
Instalación
Clonar el repositorio desde GitHub mediante el comando git clone https://github.com/<tu-usuario>/supermercado.git.
Abrir una terminal en el directorio frontend.
Ejecutar el comando npm install para instalar las dependencias del proyecto.
Configuración
Para configurar el proyecto, no es necesario realizar ninguna acción adicional. Las configuraciones por defecto ya son suficientes para ejecutar el frontend.

Ejecución
Para ejecutar el frontend en un servidor local, sigue los siguientes pasos:

Abre una terminal en el directorio frontend.

Ejecuta el comando ng serve.
