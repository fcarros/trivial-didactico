# Trivial Didáctico Interactivo

## Descripción

Este es un juego de Trivial interactivo diseñado como una herramienta de aprendizaje. La aplicación está construida con React y TypeScript, y presenta un tablero de juego circular, un sistema de turnos para hasta 4 jugadores y un banco de preguntas personalizable basado en distintas unidades didácticas. El objetivo es ser el primero en conseguir los "quesitos" de todas las categorías y ganar en la casilla central.

## Características Principales

* **Pantalla de Inicio:** Permite configurar el número y los nombres de los jugadores.
* **Tablero Circular Interactivo:** Un tablero generado 100% con código CSS, con anillo exterior y radios de acceso al centro.
* **Sistema de Turnos:** Lógica completa para gestionar el turno del jugador actual.
* **Puntuación y "Quesitos":** Marcador en tiempo real que muestra el progreso de cada jugador.
* **Banco de Preguntas Externo:** Las preguntas y categorías se gestionan desde un archivo `preguntas.json`, facilitando su expansión y adaptación a otras temáticas.
* **Lógica de Victoria Clásica:** Requiere obtener los 6 quesitos antes de poder ganar en la casilla central.

## Tecnologías Utilizadas

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* CSS (Flexbox, Grid y Transformaciones)
* Git y GitHub para el control de versiones.

## Cómo Empezar (Instalación y Arranque)

Para ejecutar este proyecto de forma local, sigue estos pasos:

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/fcarros/trivial-didactico.git](https://github.com/fcarros/trivial-didactico.git)
    ```
2.  Navega a la carpeta del proyecto:
    ```bash
    cd trivial-didactico
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```
4.  Arranca el servidor de desarrollo:
    ```bash
    npm start
    ```
El juego se abrirá en `http://localhost:3000`.