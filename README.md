## README

A continuación se presenta el readme de una aplicación desarrollada en la biblioteca de javascript React, Vite, html y javascript.
Es una aplicación que se conecta con la api de google calendar. Se crea un calendario y este se integra a la aplicación, para que cuando se creen eventos, estos se desplieguen en el calendario.
Para el despliegue se utilizara el servicio de terceros Netlify, puesto que se comunica bien con Vite.

## Descripción

# a)Instalación del proyecto

Para que el proyecto funcione a nivel local , fue necesario instalar vite con su estructura de carpetas, con un template de react:
\```bash
npm create vite@latest PROYECTO MODULO 5 2.0 react
\```
Posteriormente ingresar a la carpeta creada por medio de la terminal, y ejecutar el siguiente comando para instalar las dependencias de node.js , por ejemplo la carpeta node_modules.
\```bash
npm install
\```
A continuación, con este comando se puede hacer correr el proyecto y verlo en el navegador.
\```bash
npm run dev
\```
Una vez que el proyecto se ejecute en el navegador, guardar la ruta. Ej.: http:localhost:5173 . Ests dirección guardarla por que servira para configurar la api de google calendar.
Posteriormente es necesario instalar una libreria externa para el manejo de rutas llamado react router DOM.
Nota:Router significa manejador de rutas.
\```bash
npm install react-router-dom
\```
Posteriormente instalar libreria de estilos MaterialUI(web:www.miu.com), para crear una barra de navegación responsive.
\```bash
 npm install @mui/material @emotion/react @emotion/styled
\```
Una vez este listo, instalar los iconos de esta libreria de estilos
\```bash
 npm install @mui/icons-material
\```




## Uso del proyecto
