$(document).ready(function (){



	function crearGrafica(parametro){
		var margin = {top: 40, right: 10, bottom: 20, left: 10},
		    width = 800 - margin.left - margin.right,
		    height = 350 - margin.top - margin.bottom;

		var svg = d3.select("#grafica").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  	.append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var xScale = d3.scale.ordinal().rangeRoundBands([0, width], 0.2, 0.2);
		var yScale = d3.scale.linear().range([height, 0]);
		var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
		var yAxis = d3.svg.axis().scale(yScale).orient("left");

		var i = 0;
		var dia = 26;
		var mes = 3;
		var medicion = [];
		var hora = [];
		var fecha = "";
		var datos = [];
		var conjunto = [];
		

		cucea.modulo['w183757982'].dataset.forEach(function (modulo){ 
			conjunto['TEMPERATURE'] = modulo.data.temperature;
			conjunto['NOISE'] = modulo.data.noise;
			conjunto['LIGHT'] = modulo.data.light;
			conjunto['PRESSURE'] = modulo.data.pressure;

			fecha = new Date(modulo.date * 1000);

	  		var h = fecha.getHours();
	  		var m = fecha.getMinutes();
	  		var d = fecha.getDate();
	  		var month = fecha.getMonth();

		  	if(month == mes && dia == d){ 

		  		if(m < 3){

				  	medicion[h] = parseFloat(conjunto[parametro]);
				  	hora[h] = h;

				  	datos[h] = { 
				  			medicion: medicion[h], 
				  			hora: hora[h]
				  		};
				  	
				  	i++;
				}
			} 
		});console.log(datos);

		xScale.domain(hora.map(function ( d ) {
			return d; 
		}));

		yScale.domain([0, d3.max(medicion, function ( d ) { 
			return d; 
			})
		]);

		svg.selectAll('rect').data(datos).enter().append('rect')
		.attr("height", 0)
		.attr("y", height)
		.transition().duration(3000)
		.delay(function (){ return i * 200; })
		.attr({
			"x": function (d) { return xScale(d.hora); },
			"y": function (d) { return yScale(d.medicion); },
			"width": xScale.rangeBand(),
			"height": function (d) { return height - yScale(d.medicion); }
		})
		.style("fill", function (d, i) { return "rgb(128, 179 ," + ((i * 30) + 50) + ")" });

		svg.selectAll('text')
			.data(datos)
			.enter()
			.append('text')
			.text( function (d){
				return d.medicion;
			})
			.attr("x", function (d){ return xScale(d.hora) + xScale.rangeBand()/3.5; })
			.attr("y", function (d){ return yScale(d.medicion) - 10; })
			.style("fill", "#ccc");

		svg.append("g").attr("class", "x axis")
			.attr("transform", "translate(0," + height +" )")
			.call(xAxis)
			.selectAll('text')
			.style("text-anchor", "end")
			.style("fill", "#ccc");

		svg.append("g").attr("class", "y axis").call(yAxis);
	} // crear grafica

	//crearGrafica();

	$('.metricas').click(function (){ 
		$('#grafica').empty();
		var parametro = $(this).attr('parametro');
		crearGrafica(parametro);
	});
});