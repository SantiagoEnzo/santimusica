const loudness = require('loudness');
const express = require('express');
const app = express();
const config = require("config");
var requests = 1;//
var bajar = false;
//import configs
let volBajo = config.has('volBajo') ? config.get('volBajo') : 10;
let volAlto = config.has('volAlto') ? config.get('volAlto') : 45;
let mensajeBajar = config.has('mensajeBajar') ? config.get('mensajeBajar') : 'Bajando';
let mensajeSubir = config.has('mensajeSubir') ? config.get('mensajeSubir') : "Subiendoo";
let port = config.has('port') ? config.get('port') : 2592;
//funciones
logmemoria =()=>{
	let used = process.memoryUsage().heapTotal / 1024 / 1024;
console.log(`Usando unos ${Math.round(used * 100) / 100} MB Requests:`+requests);
}
//metodos
app.get('/bajar', async function (req, res) {
  bajar = true;
  let ip = req.socket.remoteAddress;
  await loudness.setVolume(volBajo);
  res.send(mensajeBajar);
  console.log(ip + ' bajo');
  logmemoria();//
  requests++;//
  bajar = false;
})

app.get('/subir', async function (req, res) {
  console.time('subir')//
  let ip = req.socket.remoteAddress;
  let vol = await loudness.getVolume()
  while (vol < volAlto){  
    await loudness.setVolume(vol+1);
	if (bajar){break}
	vol = await loudness.getVolume();
  }
  res.send(mensajeSubir);
  console.log(ip + ' subio');
  logmemoria();//
   requests++;//
   console.timeEnd('subir')//
})

app.get('/volumen', async function (req, res) {	
  let vol = await loudness.getVolume()
  res.send('Volumen actual: '+ vol);
  requests++;//
})


//
app.listen(port);
console.log('Servidor escuchando en puerto: ' + port);

//memoria
