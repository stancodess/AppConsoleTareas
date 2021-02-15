require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquireMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const { mostrarMenu, pause } = require('./helpers/messages');
const Tareas = require('./models/tareas');


console.clear();

const main = async() => {


    let opt         = '';
    const tareas    = new Tareas();

    const tareasDB  = leerDB();

    if(tareasDB){ //cargar tareas
        tareas.cargarTareasFromArray( tareasDB );

    }

    do {
        // imprime el menú
        opt = await inquireMenu();

        switch (opt) {
            case '1':
                // crear opción
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
                console.log(desc);
            break;
            case '2':
                //
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarTareasCompletadasPendientes( true );
            break;
            case '4':
                tareas.listarTareasCompletadasPendientes( false );
            break;
            case '5': // completado | 
                
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
            break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada')
                    }
                }

                
                
            break;
            
            default:
                break;
        }

        guardarDB( tareas.listadoArr );

        await pausa();
    } while ( opt != '0' );
    
    //pause();
}




main();