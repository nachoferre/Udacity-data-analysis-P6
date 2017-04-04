function draw(geo_data) {
    "use strict";
        var margin = 75,
            width = 1000 - margin,
            height = 600 - margin;
        var graticule = d3.geo.graticule()
        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin);
            
        var projection = d3.geo.mercator()
                               .scale(140)
                               .translate([width / 2, height / 1.2]);

        var path = d3.geo.path().projection(projection);

        var map = svg.selectAll('path')
                     .data(geo_data.features)
                     .enter()
                     .append('path')
                     .attr('d', path)
                     .style('fill', 'lightBlue')
                     .style('stroke', 'black')
                     .style('stroke-width', 0.5);
        

      d3.json("Data/1987_sample.json", function(error, data) {
        if (error) throw error;

        console.log(data)

        console.log(_.map(data, (d, i) => {
          return [d["origin_long"], d["origin_lat"]]
        }))

        
        var origin = data.map(function(d) {
                    return projection([d["origin_long"], d["origin_lat"]]);
                });
        var destination = data.map(function(d) {
                    return projection([d["dest_long"], d["dest_lat"]]);
                });

        var links = [];
        for(var i=0, len=data.length-1; i<len; i++){
            // (note: loop until length - 1 since we're getting the next
            //  item with i+1)
            links.push({
                type: "LineString",
                coordinates: [
                    [data[i][["origin_long"]],data[i][["origin_lat"]]],
                    [data[i]["dest_long"],data[i]["dest_lat"]]
                ]
            });
        }
        debugger;
        console.log(links)
        svg.append('g')
           .selectAll('path')
           .data(links)
           .enter()
           .append('path')
           .attr('d', path)
           .style({
              stroke: 'grey',
              'stroke-width': '1px'})
        
        debugger;
        svg.append('g')
               .attr("class", "bubble")
               .selectAll("circle")
               .data(links.slice(1, 2))
               .enter()
               .append("circle")
               .attr('cx', function(d) { return d.coordinates[0][0]; })
               .attr('cy', function(d) { return d.coordinates[0][1]; })
               .attr('r', "2px");
        svg.append('g')
               .attr("class", "bubble")
               .selectAll("circle")
               .data(links.slice(1, 2))
               .enter()
               .append("circle")
               .attr('cx', function(d) { return d.coordinates[1][0]; })
               .attr('cy', function(d) { return d.coordinates[1][1]; })
               .attr('r', "2px")
               .style('fill', 'lightred')
                   
      })
    };
