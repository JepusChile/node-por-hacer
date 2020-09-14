const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {

        if (err)
            throw new Error('Fail, no se pudo grabar', err)
    });
};

const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');
    } catch (error) {

        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {

    cargarDB();
    /*   let mostrar = '\n';
      console.log(colors.green());
      listadoPorHacer.forEach(tarea => {

          mostrar += '======Por Hacer======\n'.green;
          mostrar += ` ${tarea.descripcion}\n Estado: ${tarea.completado}\n`;
          mostrar += '=====================\n'.green;
      });
      return mostrar; */
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {

        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {

        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nListado.length) {

        return false;
    } else {

        listadoPorHacer = nListado;
        guardarDB();
        return true;
    }

    /*  let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {

        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {

        return false;
    } */
}

module.exports = {

    crear,
    getListado,
    actualizar,
    borrar
}