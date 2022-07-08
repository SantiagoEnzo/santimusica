console.time('init')//
const loudness = require('loudness');
const setVolume = loudness.setVolume;
const getVolume = loudness.getVolume;
const express = require('express');
const app = express();
const config = require("config");
var requests = 1;//
var bajar = false;

//import configs
const volBajo = config.has('volBajo') ? config.get('volBajo') : 10;
const volAlto = config.has('volAlto') ? config.get('volAlto') : 45;
const mensajeBajar = config.has('mensajeBajar') ? config.get('mensajeBajar') : 'Bajando';
const mensajeSubir = config.has('mensajeSubir') ? config.get('mensajeSubir') : "Subiendoo";
const port = config.has('port') ? config.get('port') : 2592;

//funciones

const logmemoria = () =>{
	let used = process.memoryUsage().heapTotal / 1024 / 1024;
console.log(`Usando unos ${Math.round(used * 100) / 100} MB Requests:`+requests);
}

//metodos

app.get('/bajar', async function (req, res) {
  bajar = true;
  let ip = req.socket.remoteAddress;
  await setVolume(volBajo);
  res.send(mensajeBajar);
  console.log(ip + ' bajo');
  //logmemoria();//
  //requests++;//
  //bajar = false;
})

app.get('/subir', async function (req, res) {
  bajar = false;
  console.time('subir')//
  let ip = req.socket.remoteAddress;
  console.log(req.socket.ip)
  console.log(ip + ' subio');
  let vol = await getVolume()
  while (vol < volAlto){
    vol++;
	await setVolume(vol)
    //await setVolume(vol);
	if (bajar){
		console.log('Subir abortado');
		break;
	}
  }
  res.send(mensajeSubir);
  //logmemoria();//
   //requests++;//
   console.timeEnd('subir')//
})

app.get('/volumen', async function (req, res) {	
  let vol = await loudness.getVolume()
  res.send('Volumen actual: '+ vol);
  //requests++;//
})


//
app.listen(port);
console.log('Servidor escuchando en puerto: ' + port);

// init time
// ~110ms
console.timeEnd('init')//