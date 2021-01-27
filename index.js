const puppeteer = require('puppeteer');
const IMAGENES = 'imagenes/';


const contador = () =>{
    var contador = 0;
    return ()=>{
        contador+=1;
        return contador;
    };
};

(async () => {
    let cont = contador();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await ingresarPaginaInicio(page,cont);

    await page.click('#nuevoCliente');
    await page.waitForSelector('#nombre');
    await tomarCaptura(page,cont);
    
    await page.type('#nombre','Arthur');
    await page.type('#apellido','Ramirez');
    await page.type('#email','arturo@gmail.com');
    await tomarCaptura(page,cont);
    
    await page.click("#botonFormulario");
    await tomarCaptura(page,cont);

    await browser.close();
})();

const ingresarPaginaInicio = async (page,ref)  => {
    await page.goto('http://localhost:8081/listar');
    await tomarCaptura(page,ref);
};

const tomarCaptura = async (page,ref) => {
    await page.screenshot({path: IMAGENES.concat('imagen').concat(ref()).concat('.jpg')});
};
