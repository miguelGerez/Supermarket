# Supermarket
Backend
Requisitos
Java 11 o superior
Maven
PostgreSQL
Instalación
Clonar el repositorio desde GitHub mediante el comando git clone https://github.com/<tu-usuario>/supermercado.git.

Abrir el proyecto en un IDE de Java, como Eclipse o IntelliJ.

Configurar la base de datos PostgreSQL en el archivo application.properties. Puedes utilizar los siguientes valores:

bash
Copy code
spring.datasource.url=jdbc:postgresql://localhost:5432/supermercado
spring.datasource.username=usuario
spring.datasource.password=contraseña
Donde usuario y contraseña son los valores de acceso a la base de datos que hayas configurado previamente.

Configuración
Para configurar el proyecto, no es necesario realizar ninguna acción adicional. Las configuraciones por defecto ya son suficientes para ejecutar el backend.

Ejecución
Para ejecutar el backend en un servidor local, sigue los siguientes pasos:

Abre una terminal en el directorio raíz del proyecto.

Ejecuta el comando mvn spring-boot:run.

Espera a que se inicie el servidor. Deberías ver un mensaje similar a este:

lua
Copy code
2022-03-01 10:30:00.956  INFO 12345 --- [           main] com.supermercado.Application            : Started Application in 3.141 seconds (JVM running for 4.162)
Ya puedes acceder a la API RESTful del backend mediante la URL http://localhost:8080/api/.

Frontend
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

Espera a que se compile el proyecto y se inicie el servidor. Deberías ver un mensaje similar a este:

csharp
Copy code
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
Ya puedes acceder al frontend mediante la URL http://localhost:4200/.
