const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {
        if ( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        } )
    }

    get listadoArr() {
        const listado = []

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        } );
        return listado;
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        const listado = []
        //let   index   = 1;
        this.listadoArr.forEach( (tarea, index) => {
            
            //const tarea = this.listadoArr[key];
            let status  =  ( tarea.completadoEn )?
                                             'Completada'.green
                                             :'Pendiente'.red;
            let indice  = `${ index + 1 }`.green;

            console.log( `${ indice } ${ tarea.desc }  :: ${ status }` )

            //listado.push( `${index} ${ tarea.desc }  ` );
            //index++;
        } );
        //return listado;
    }

    listarTareasCompletadasPendientes( completadas = true ) {
        console.log();
        const listado       = []
        let statusComplete  = 0;
        let textValida      = (completadas)? 'completadas': 'pendientes';

        this.listadoArr.forEach( (tarea, index) => {
            
            //const tarea = this.listadoArr[key];
            let status  =  ( tarea.completadoEn )?
                                             'Completada'.green
                                             :'Pendiente'.red;
            let indice  = `${ index + 1 }`.green;

            if ( completadas ){
                if( status === 'Completada'.green ){
                    console.log( `${ indice } ${ tarea.desc }  :: ${ status }` )
    
                    statusComplete = 1;
                }
            }else{
                if( status === 'Pendiente'.red ){
                    console.log( `${ indice } ${ tarea.desc }  :: ${ status }` )
    
                    statusComplete = 1;
                }
            }
            

        } );

        (statusComplete === 0)? console.log(`No existen tareas ${textValida}. `): null;
    }


    toggleCompletadas( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas;