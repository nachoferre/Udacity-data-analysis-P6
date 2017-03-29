
function draw(geo_data) {
    "use strict";
        var margin = 75,
            width = 1400 - margin,
            height = 600 - margin;

        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin)
            .append('g')
            .attr('class', 'map');

        var projection = d3.geo.mercator()
                               .scale(140)
                               .translate([width / 2, height / 1.2]);

        var path = d3.geo.path().projection(projection);

        var map = svg.selectAll('path')
                     .data(geo_data.features)
                     .enter()
                     .append('path')
                     .attr('d', path)
                     .style('fill', '#ddc')
                     .style('stroke', 'black')
                     .style('stroke-width', 0.5);
        function flights(data) {
          debugger;
          svg.selectAll("circle")
             .data([[data["lat"],data["long"]]]).enter()
             .append("circle")
             .attr("cx", function(d){return projection(d)[0]})
             .attr("cy", function(d){return projection(d)[1]})
             .attr("r", "8px")
             .attr("fill", "red");
        };
        d3.json("../Data/airports.json", flights)
    };
