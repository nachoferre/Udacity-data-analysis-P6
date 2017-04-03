function draw(geo_data) {
    "use strict";
        var margin = 75,
            width = 1000 - margin,
            height = 600 - margin;
        var pi = Math.PI,
            tau = 2 * pi;
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin);

        var projection = d3.geoMercator()
                               .scale(140)
                               .translate([width / 2, height / 1.2]);

        var path = d3.geoPath().projection(projection);

        var map = svg.selectAll('path')
                     .data(geo_data.features)
                     .enter()
                     .append('path')
                     .attr('d', path)
                     .style('fill', 'lightBlue')
                     .style('stroke', 'black')
                     .style('stroke-width', 0.5);
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

        // svg.selectAll("circle")
        //    .data(_.map(data, (d, i) => {
        //       return [d["origin_long"], d["origin_lat"], d["dest_long"], d["dest_lat"]]
        //     }))
        //    .enter()
        //    .append("circle")
        //    .attr("cx", function(d){
        //       // console.log(projection(d))
        //       return projection(d)[0]
        //     })
        //    .attr("cy", function(d){
        //       return projection(d)[1]
        //     })
        //    .attr("r", "2px")
        //    .attr("fill", "red")
        var origin = data.map(function(d) {
                    return projection([+d["origin_long"], +d["origin_lat"]]);
                });
        var destination = data.map(function(d) {
                    return projection([+d["dest_long"], +d["dest_lat"]]);
                });
        debugger;
        var links = [];
        for(var i=0, len=data.length-1; i<len; i++){
            // (note: loop until length - 1 since we're getting the next
            //  item with i+1)
            links.push({
                type: "LineString",
                coordinates: [
                    [ origin[i][0], origin[i][1] ],
                    [ destination[i][0], destination[i][1] ]
                ]
            });
        }
        debugger;
        var PathArcs = svg.append('g')
                          .append('g')
                          .selectAll('.arc')
                          .data(links)
           PathArcs.enter()
                   .append('path')
                   .attr({'class': 'arc'})
                   .style({ 
                      fill: 'none',
                    })
           PathArcs.attr('d', path)
                   .style({
                        stroke: '#0000ff',
                        'stroke-width': '2px'
                    })
      })
    };
