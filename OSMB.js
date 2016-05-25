var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

var cucea = function (){};
cucea.modulo = {};
cucea.mediciones = [];
cucea.modulo[183758729] = {
	nombre: "Módulo N",
	estatus: "On line",
	light: 50.9,
	temperature: 31.2,
	preassure: 84.99,
	noise: 24.03
};


var map = new GLMap('map', {
	position: {
		latitude:20.74226,
		longitude: -103.38026
	},
	minZoom: 12,
	maxZoom:20,
	zoom: 18,
	state: true
});

var osmb = new OSMBuildings({
	baseURL: './OSMBuildings',
	minZoom: 15, 
	maxZoom: 22,
	attribution: '© 3D <a href="http://osmbuildings.org/copyright/">OSM Buildings</a>'
}).addTo(map);

osmb.addMapTiles(
	'http://{s}.tiles.mapbox.com/v3/osmbuildings.kbpalbpk/{z}/{x}/{y}.png',
	{
		attribution: '© Data <a href="http://openstreetmap.org/copyright/">OpenStreetMap</a> · © Map <a href="http://mapbox.com">MapBox</a>'
	}
);

osmb.addGeoJSONTiles('http://{s}.data.osmbuildings.org/0.2/anonymous/tile/{z}/{x}/{y}.json');

map.on('pointermove', function(e) {
	var id = osmb.getTarget(e.x, e.y);
	if (id) {
  		document.body.style.cursor = 'pointer';
  		osmb.highlight(id, '#f08000');
  		console.log(id);
	} else {
  		document.body.style.cursor = 'default';
  		osmb.highlight(null);
	}
	});

	map.on('pointerup', function(e) {
	var id = osmb.getTarget(e.x, e.y);
	if (id) {
  		var fecha = new Date(cucea.modulo[id].dataset[0].date * 1000);
  		var year = fecha.getFullYear();
  		var mes = meses[fecha.getMonth()];
  		var dia = fecha.getDate();
  		var hora = fecha.getHours();
  		var minutos = fecha.getMinutes();
  		var segundos = fecha.getSeconds();
  		var ultimaFecha = mes + " " + dia + " de " + year 
  			+ " - " + hora + ":" + minutos + ":" + segundos;

  		$("#nombre-edificio").text(cucea.modulo[id].coll_location.location);
  		$("#estatus-dispositivo").text(cucea.modulo[id].estatus);
  		$("#ultima-actualizacion").text(ultimaFecha);
  		$("#lm-medicion").text(cucea.modulo[id].dataset[0].data.light);
  		$("#c-medicion").text(cucea.modulo[id].dataset[0].data.temperature);
  		$("#kpa-medicion").text(cucea.modulo[id].dataset[0].data.pressure);
  		$("#db-medicion").text(cucea.modulo[id].dataset[0].data.noise);
	} 
	});


var patioLine =  {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        color: '#AA9E8D',
        roofColor: '#DFCEB4',
        id: 1000000,
        height: 0.2,
        minHeight: 0
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -103.38121622800827,
              20.741558515200136
            ],
            [
              -103.38024526834486,
              20.741332761905493
            ],
            [
              -103.38028550148009,
              20.741182259521928
            ],
            [
              -103.38062882423401,
              20.74125500235933
            ],
            [
              -103.38065028190613,
              20.74116971764986
            ],
            [
              -103.38070660829543,
              20.74128008608827
            ],
            [
              -103.38084876537322,
              20.74131018655749
            ],
            [
              -103.38095337152481,
              20.741282594460937
            ],
            [
              -103.38092923164366,
              20.741350320507156
            ],
            [
              -103.38125377893448,
              20.7414330967447
            ],
            [
              -103.38121622800827,
              20.741558515200136
            ]
          ]
        ]
      }
    }
  ]
}


osmb.addGeoJSON(patioLine);
//osmb.addGeoJSON(punto);

	var controlButtons = document.querySelectorAll('.control button');

for (var i = 0, il = controlButtons.length; i < il; i++) {
    controlButtons[i].addEventListener('click', function(e) {
	    var button = this;
	    var parentClassList = button.parentNode.classList;
	    var direction = button.classList.contains('inc') ? 1 : -1;
	    var increment;
	    var property;

	    if (parentClassList.contains('tilt')) {
	        property = 'Tilt';
	        increment = direction*10;
	    }
	    if (parentClassList.contains('rotation')) {
	        property = 'Rotation';
	        increment = direction*10;
	    }
	    if (parentClassList.contains('zoom')) {
	        property = 'Zoom';
	        increment = direction*1;
	    }
	    if (property) {
	        map['set'+ property](map['get'+ property]()+increment);
	    }
	});
 }

$(document).ready(function (){

	

	$(".metricas").click(function (){
		$('#contenedorMap, .control').addClass("oculto");
		$('#graficas').removeClass('oculto');
	});

	$('#mostrar_mapa').click(function (){ 
		$('#contenedorMap, .control').removeClass('oculto');
		$('#graficas').addClass('oculto');
	});
	
	cucea.modulo['w183757982'] = rectoria;
	cucea.modulo['w309766139'] = innovation_center;
	cucea.modulo['w183758371'] = L305;
	cucea.modulo['w183759355'] = CTA;
	cucea.modulo['w183756237'] = F102;

	$('.metricas').click(function (){
		var parametro = $(this).attr('parametro');
		$('#titulo-metrica').text(parametro);
	});

});