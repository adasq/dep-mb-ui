angular.module( 'mb.family.visualization', [
])
.directive("mbFamilyVisualization", function($log){
        var link = function(scope, element, attr) {
            //content    

 


  var
    width = 2000,
    height = 500;
  
  
  var zoom = d3.behavior.zoom()
    .scaleExtent([-1, 10])
    .on("zoom", zoomed);
  
  var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);


var tree = d3.layout.tree()
    .size([360, width / 2 - 120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("#trooper-family-view").append("svg").call(zoom)
    .attr("width", "100%")
    .attr("height", height)
  .append("g").call(drag);

var init = function(root){
      var nodes = tree.nodes(root),
      links = tree.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; });

  node.append("circle")
      .attr("r", 4.5);
  node.append("text")
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
      .text(function(d) { return d.name; });
};

scope.$watch('family', function(nv){
    if(nv){
        $log.log(nv);
        init(nv);
    }
});

d3.select(self.frameElement).style("height", width - 100 + "px");

  function zoomed() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
  function dragstarted(d) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragended(d) {
  d3.select(this).classed("dragging", false);
}


        };
        return {
            link: link,
            scope: {
                family: "="
            },
            restrict: "E",
            template: '<div style="overflow: auto; width: 100%" id="trooper-family-view"></div>'
        };

});

