
var width = 500,
    height = 500;

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(100))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

var buttonNames=['Red','Green']


function plotViz(){

d3.select("#controls").selectAll("button.teams")
            .data(buttonNames).enter()
            .append("button")
            .on("click", function(d){update(this.id)})
            .attr('class','botton')
            .attr('id',function(d){return d})
            .html(d => d);

	d3.json("Red.json",function(error,graph){
		if(error) throw error;

		var link=d3.select('svg')
			.append("g")
			.attr('class','links')
			.selectAll('line')
			.data(graph.links)
			.enter()
			.append('line')

		var node=d3.select('svg').selectAll('node')
		    .data(graph.nodes)
			.enter()
		    .append('g')
			.attr('class','nodes')

			
		node.append('circle')
			.attr('r',d=>d.value)
			.attr('fill','Red')
			.call(d3.drag()
				.on('start',dragstarted)
				.on('drag',dragged)
				.on('end',dragended));

		node.append('text')
				.attr("dx", 12)
      			.attr("dy", ".35em")
			.text(function(d){return d.id})

		simulation
      		.nodes(graph.nodes)
      		.on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

	node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
	
function update(source){
	d3.json(source+".json",function(error,graph){
		d3.select('svg').selectAll('g').remove()

			var link=d3.select('svg')
			.append("g")
			.attr('class','links')
			.selectAll('line')
			.data(graph.links)
			.enter()
			.append('line')

		var node=d3.select('svg').selectAll('node')
		    .data(graph.nodes)
			.enter()
		    .append('g')
			.attr('class','nodes')

			
		node.append('circle')
			.attr('r',d=>d.value)
			.attr('fill',source)
			.call(d3.drag()
				.on('start',dragstarted)
				.on('drag',dragged)
				.on('end',dragended));

		node.append('text')
				.attr("dx", 12)
      			.attr("dy", ".35em")
			.text(function(d){return d.id})
	simulation
      		.nodes(graph.nodes)
      		.on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

	node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }
	})
}

	}
