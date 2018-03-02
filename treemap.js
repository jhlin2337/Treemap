let width = 960;
let height = 750;

var color = d3.scaleOrdinal()
    .range(d3.schemeCategory20
        .map(function(c) { c = d3.rgb(c); c.opacity = 0.6; return c; }));

var format = d3.format(",d");

var treemap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);

d3.json('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json', function(error, data) {
	if (error) throw error;

	let tooltip = d3.select('body')
  					.append('div')
  					.attr('class', 'tooltip');

	var root = d3.hierarchy(data)
		.sum(d => d.value)
		.sort((a, b) => (b.height - a.height || b.value - a.value));

	treemap(root);

	d3.select("#content")
    .selectAll(".node")
    .data(root.leaves())
    .enter().append("div")
      .attr("class", "node")
      .style("left", d => d.x0 + "px")
      .style("top", d => d.y0+"px")
      .style("width", d => d.x1-d.x0 + "px")
      .style("height", d => d.y1-d.y0+"px")
      .style("background", d => color(d.data.category))
      .on("mouseover", function(d) {
      		const name = 'Name: ' + d.data.name;
      		const category = 'Category: ' + d.data.category;
      		const value = 'Value: ' + d.data.value;
    		let content = name + '<br>' + category + '<br>' + value;

          	tooltip.style("visibility", "visible")
                   .html(content)
       })
      .on("mousemove", () => tooltip.style("left",(event.pageX+20)+"px").style('top', (event.pageY-36)+'px'))
      .on("mouseout", () => tooltip.style("visibility", "hidden"))
    .append("div")
      .attr("class", "node-label")
      .text(d => d.data.name);
    
})

