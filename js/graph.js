
function draw(geo_data) {
    "use strict";
        var margin = 75,
            width = 1400 - margin,
            height = 600 - margin;
        var pi = Math.PI,
            tau = 2 * pi;
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin);

        var projection = d3.geoMercator()
                            .center([-98.5, 39.5]);
      //Define path generator
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
      .attr("d", path(topojson.mesh(geo_data, geo_data.objects.states, function(a, b) { return a !== b; })));

        function flights(data) {
          function origin_coords(leaves){
              
              var coords = leaves.map(function(d) {
                    return projection([d["origin_long"], d["origin_lat"]]);
                });
              debugger;
              return coords
          }
          var data_update_ori = d3.nest()
                              .rollup(origin_coords)
                              .entries(data);
          //TODO PORJECT POINTS
          svg.selectAll("circle")
             .data(data_update_ori)
             .enter()
             .append("circle")
             .attr("cx", function(d){
              debugger;
              return d[0]})
             .attr("cy", function(d){return d[1]})
             .attr("r", "2px")
             .attr("fill", "red");


          
        };
        d3.json("Data/1987_sample.json", flights)
    };
