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

        var projection = d3.geoAlbers()
                            .scale(1000)
                            // .center([-98.5, 39.5]);
      //Define path generator
        var path = d3.geoPath().projection(d3.geoAlbers().scale(1000));

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

        // function flights(data) {
        //   function origin_coords(leaves){
        //     return leaves.map(function(d) {
        //       return projection([d["origin_long"], d["origin_lat"]]);
        //     })
        //   }
        //   var data_update_ori = d3.nest()
        //                       .rollup(origin_coords)
        //                       .entries(data);
        //   //TODO PORJECT POINTS
        //   svg.selectAll("circle")
        //      .data(data_update_ori)
        //      .enter()
        //      .append("circle")
        //      .attr("cx", function(d){
        //         console.log(d)
        //         // debugger;
        //         return d[0]
        //       })
        //      .attr("cy", function(d){return d[1]})
        //      .attr("r", "2px")
        //      .attr("fill", "red")
        // }
        // d3.json("Data/1987_sample.json", flights)

      d3.json("Data/1987_sample.json", function(error, data) {
        if (error) throw error;

        console.log(data)

        console.log(_.map(data, (d, i) => {
          return [d["origin_long"], d["origin_lat"]]
        }))

        svg.selectAll("circle")
           .data(_.map(data, (d, i) => {
              return [d["origin_long"], d["origin_lat"]]
            }))
           .enter()
           .append("circle")
           .attr("cx", function(d){
              // console.log(projection(d))
              return projection(d)[0]
            })
           .attr("cy", function(d){
              return projection(d)[1]
            })
           .attr("r", "2px")
           .attr("fill", "red")
      })
    };
