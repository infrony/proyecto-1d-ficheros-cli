#!/usr/bin/env node

const shelljs = require('shelljs');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

ficheroOK = filepath => {
    console.log(
        chalk.white.bgGreen.bold(
            `Muy bien! Fichero correctament creado en el directorio ${filepath}`
        )
    );  
};
const crearFichero = (nombreFichero, extension) => {
    const pathFichero = `${process.cwd()}/${nombreFichero}.${extension}`;
    shelljs.touch(pathFichero);
    return pathFichero;
};
const hacerPreguntas = () => {
    const preguntas = [
        {
            name: "FICHERO",
            type: "input",
            message: "Como se va a llamar tu fichero? (sin la extension)"
        },
        {
            name: "EXTENSION",
            type: "list",
            message: "Que extension tiene tu fichero?",
            choices: [".rb", ".js", ".kt", ".java", ".ts", ".php"],
            filter: function(val) {
                return val.split(".")[1];
            }
        }
    ];
    return inquirer.prompt(preguntas);
};
const iniciar = () => {
    console.log(
        chalk.green(
            figlet.textSync("Infrony", {
                font: "Big",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};
const ejecutar = async () => {
    // Mostrar la informacion de la libreria en la cabecera, el titulo con figlet
    iniciar();
    // Preguntas necesarioas para crear el fichero, es decir, el nombre y la extension
    const respuestas = await hacerPreguntas();
    const { FICHERO, EXTENSION } = respuestas;
    console.log(respuestas);
    // Creamos el fichero
    const pathFichero = crearFichero(FICHERO, EXTENSION);
    // Anadimos mensaje que fichero se ha creado correctamente
    ficheroOK(pathFichero);
};



ejecutar();
