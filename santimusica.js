const loudness = require('loudness');
const express = require('express');
const app = express();
const config = require("config");

//import configs
let volBajo = config.has('volBajo') ? config.get('volBajo') : 10;
let volAlto = config.has('volAlto') ? config.get('volAlto') : 45;
let mensajeBajar = config.has('mensajeBajar') ? config.get('mensajeBajar') : 'Bajando';
let mensajeSubir = config.has('mensajeSubir') ? config.get('volAlto') : "Subiendoo";
let port = config.has('port') ? config.get('port') : 2592;

//metodos
app.get('/bajar', async function (req, res) {
  await loudness.setVolume(10);
  res.send(mensajeBajar);
})

app.get('/subir', async function (req, res) {
  await loudness.setVolume(45);
  res.send(mensajeSubir);
})

app.get('/volumen', async function (req, res) {	
  let vol = await loudness.getVolume()
  res.send('Volumen actual: '+ vol);
})


//
app.listen(port);
console.log('Servidor escuchando en puerto: ' + port);