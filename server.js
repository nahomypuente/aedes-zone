var express = require('express');
var app = express();
var path = require('path');
var URL_CSV = 'http://datos.salud.gob.ar/dataset/ceaa8e87-297e-4348-84b8-5c643e172500/resource/318834df-656d-4e71-9e87-195ebd96a0f8/download/informacion-publica-dengue-zika-nacional-hasta-20180821v2.csv';
//var request = require('requestaavar csv = require('csvtojson');
var http = require('http')
var fs = require('fs');
var path = require('path');
var csvjson = require('csvjson');
var bodyParser = require('body-parser');

var port = process.env.PORT || 5000;
app.use(express.static('./public'));


var request = http.get(URL_CSV, function(response) {
    if (response.statusCode === 200) {
        var file = fs.createWriteStream("./file-csv.csv");
        response.pipe(file);
    }
    // Add timeout.
    request.setTimeout(12000, function () {
        request.abort();
    });
});

var options = {
  delimiter: ',',
  quote: '"'
};

var file_data = fs.readFileSync('./file-csv.csv', { encoding: 'utf8' });
var json_result = csvjson.toObject(file_data, options);
var data = JSON.stringify(json_result);
fs.writeFileSync('./final-json.in', data);
var jsontData = JSON.parse(fs.readFileSync('./final-json.in', 'utf8'));

var jsonWithCoordinates = JSON.parse(fs.readFileSync('./prov_coord.json', 'utf8'));

// Functions

var isIn = (nombre, arr) => {
    return(arr.some((elem) => { return elem.name == nombre}));
}

var getProvince = (prov, jss) => {
    let provinces = [];
    for (let i = 0; i<jss.length; i++) {
      
        var num_de_casos = parseInt(jss[i].cantidad_casos);
        //si no existe provincia, agregar
        if (!isIn(jss[i].provincia_nombre, provinces)) {
          let enf = jss[i].evento_nombre;
          provinces.push({
            id: parseInt(jss[i].provincia_id),
            name: jss[i].provincia_nombre,
            title: jss[i].provincia_nombre,
            disease: enf,
            cases_number: num_de_casos,
          });

        } else {
            var provincia = provinces.find((elem) => { 
              return elem.name == jss[i].provincia_nombre 
            });
            
            provincia.cases_number += num_de_casos;
        }

    }
    return provinces
}

var addCoordenatesProv = (provinces, arrCoordProv) => {
  for (let i=0; i<arrCoordProv.length; i++) {
    provinces.map((elem) => {
      if (elem.name == arrCoordProv[i].nombre) {
        elem.lat = arrCoordProv[i].coord.lat;
        elem.lng = arrCoordProv[i].coord.lng;
      }
    })
  }
  return provinces;
}
  

var ProvWithoutCoord = getProvince('', jsontData);
var ProvWithCoord = addCoordenatesProv(ProvWithoutCoord, jsonWithCoordinates);
var Provinces = ProvWithCoord;
//console.log(Provinces);

//Routes

const router = express.Router();

//No me hace falta el /api/provinces/:name, con handleclick sale solo
router.get('/api/provinces/:name', (req, res) => {
  var nameProv = req.params.name;
  console.log(nameProv);
  res.status(200).json(
    Provinces.find((elem) => { 
      return elem.name == nameProv
    })
  );
});

router.get('/api/provinces', (req, res) => {
  console.log("entro");
  res.status(200).json(Provinces);
});

app.use(router);



app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})