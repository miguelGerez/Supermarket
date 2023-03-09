# Supermarket

Este repositorio contiene un proyecto de supermercado dividido en dos partes: un backend hecho con Java y Spring, y un frontend hecho con Angular.

Demo:  [supermarket.dalquin.com.ar](https://supermarket.dalquin.com.ar)


**usuario: admin**

**contraseña: admin**

## Backend

El backend está construido con Java y Spring, y proporciona una API RESTful para el frontend. Se utiliza una base de datos PostgreSQL para almacenar la información de los productos y clientes.

### Requisitos
Java 11 o superior
Maven
PostgreSQL

### Instalación

Se recomienda utilizar Spring tools para abrir el proyecto. 

Configurar la base de datos PostgreSQL en el archivo application.properties. Puedes utilizar los siguientes valores:

**spring.datasource.url=jdbc:postgresql://localhost:5432/supermercado**
  
**spring.datasource.username=usuario**
  
**spring.datasource.password=contraseña**

Donde usuario y contraseña son los valores de acceso a la base de datos que hayas configurado previamente.

Abre una terminal en el directorio raíz del proyecto.

Ejecuta el comando mvn spring-boot:run.

## Frontend
  
 El frontend está construido con Angular, y se comunica con el backend mediante la API RESTful.
 
 Entre las principales funcionalidades del frontend se encuentran:

* Visualización de la lista de productos y clientes
* Creación, edición y eliminación de productos y clientes
* Búsqueda de productos por nombre o código de barras
* Dashboard con las ventas realizadas
* Puesto de ventas
  
### Requisitos
Node.js
Angular CLI
### Instalación
  
1. Ejecutar el comando npm install para instalar las dependencias del proyecto.
2. Ejecuta el comando ng serve.
