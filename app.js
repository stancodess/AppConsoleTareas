require('colors');

const { mostrarMenu, pause } = require('./helpers/messages');


console.clear();

const main = async() => {
    console.log('Hello world');

    

    let opt = '';

    do {
        opt = await mostrarMenu();
        await pause();
    } while ( opt != '0' );
    
    //pause();
}




main();