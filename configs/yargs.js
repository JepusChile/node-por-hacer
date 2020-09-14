const opt1 = {
    descripcion: {
        demand: true,
        alias: 'd'
    }
}
const opt2 = {

    descripcion: {
        demand: true,
        alias: 'd'
    },
    completado: {
        demand: true,
        alias: 'c',
        default: true
    }
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea para realizar', opt1)
    .command('actualizar', 'Actualiza el estado completado de una tarea', opt2)
    .command('borrar', 'Borra una tarea registrada', opt1)
    .help()
    .argv;


module.exports = {
    argv
}