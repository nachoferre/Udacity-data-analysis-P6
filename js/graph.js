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

        var lineTransition = function lineTransition(path) {
            path.transition()
                //NOTE: Change this number (in ms) to make lines draw faster or slower
                .duration(5500)
                .attrTween("stroke-dasharray", tweenDash)
                .each("end", function(d,i) { 
                    ////Uncomment following line to re-transition
                    //d3.select(this).call(transition); 
                    
                    //We might want to do stuff when the line reaches the target,
                    //  like start the pulsating or add a new point or tell the
                    //  NSA to listen to this guy's phone calls
                    //doStuffWhenLineFinishes(d,i);
                });
        };
        var tweenDash = function tweenDash() {
            //This function is used to animate the dash-array property, which is a
            //  nice hack that gives us animation along some arbitrary path (in this
            //  case, makes it look like a line is being drawn from point A to B)
            var len = this.getTotalLength(),
                interpolate = d3.interpolateString("0," + len, len + "," + len);

            return function(t) { return interpolate(t); };
        };
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
                    [ origin[i][0], origin[i][1]],
                    [ destination[i][0], destination[i][1] ]
                ]
            });
        }
        debugger;
        var pathArcs = svg.append('g')
                          .selectAll('.arc')
                          .data(links)
                          .enter()
                          .append('path')
                          .attr('d', path)
                          .style({
                              stroke: '#0000ff',
                              'stroke-width': '2px'})
                          .call(lineTransition)
        debugger;
                   
      })
    };
