
function draw(geo_data) {
    "use strict";
        var margin = 75,
            width = 1400 - margin,
            height = 600 - margin;

        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin);

        var path = d3.geoPath();

         svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(geo_data, geo_data.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", "#ddc");
        svg.append("path")
            .attr("class", "state-borders")
            .attr("d", path(topojson.mesh(geo_data, geo_data.objects.states, function(a, b) { return a !== b; })))
            .style("stroke", "grey");

        function flights(data) {
          // function origin_coords(leaves){
          //     var coords = leaves.map(function(d) {
          //           return projection([d["origin_long"], d["origin_lat"]]);
          //       });
          //     debugger;
          //     return coords
          // }
          // var data_update_ori = d3.nest()
          //                     .rollup(origin_coords)
          //                     .entries(data);
          //TODO PORJECT POINTS
          svg.selectAll("circle")
             .data(data)
             .enter()
             .append("circle")
             .attr("cx", function(d){return d["origin_long"]})
             .attr("cy", function(d){return d["origin_lat"]})
             .attr("r", "2px")
             .attr("fill", "red");


          
        };
        d3.json("Data/1987_sample.json", flights)
    };
