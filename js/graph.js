
function draw(geo_data) {
    "use strict";
    /*first we set the space for the map*/
        var margin = 150,
            width = 1000 - margin,
            height = 400 - margin;
      /*Set the svg element inside the element with id mapper*/
        var svg = d3.select("#mapper")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin)
            .append("g");
        
        d3.select("#mapper")
          .append("h4")
          .attr("id", "airport-info")
          .text("All airports");

      /*Preapre the projection for the map*/
        var projection = d3.geo.mercator()
                               .scale(100)
                               .translate([width / 2, height / 1.2]);
      /*set the variable path*/
        var path = d3.geo.path().projection(projection);
        /*Prepare the zoom behaviour so the visualization is easier*/
        var zoom = d3.behavior.zoom()
                  .translate(projection.translate())
                  .scale(projection.scale())
                  .scaleExtent([height, 8 * height])
                  .on("zoom", zoomed);
        /*add zoom to the svg*/
        var g = svg.call(zoom);
        /*configure the zoom feature*/
        g.append("rect")
            .attr("class", "background")
            .attr("width", width + margin)
            .attr("height", height + margin);
        /*Draw the map of the world*/
        var map = svg.selectAll('path')
                     .data(geo_data.features)
                     .enter()
                     .append('path')
                     .attr('d', path)
                     .style('fill', 'lightBlue')
                     .style('stroke', 'black')
                     .style('stroke-width', 0.5)
        
      /*load the airport data*/
      d3.json("Data/1987_sample.json", function(error, data) {
        if (error) throw error;

        /*create the nested variable being the key the airport of origin
          We fill the nested variable with the coordinates of the departure and arrival and the delay caused by the departure airport*/
        var nest = d3.nest().key(function(d){
                                return d["Origin"]
                              })
                            .rollup(function(d){
                                    return d.map(function(d){
                                        return [[d["origin_long"], d["origin_lat"]],[d["dest_long"],d["dest_lat"]], d["DepDelay"], d["city"]]
                                      })
                                  })
                            .entries(data)

        for (var i = nest.length - 1; i >= 0; i--) {
          var aux = 0
          for (var j = nest[i].values.length - 1; j >= 0; j--) {
            
            if (+nest[i].values[j][2] <= 0){
              aux = aux + 1
            }
          }
          nest[i].ontime = aux
        }
        nest = nest.sort(function(a, b){
            return b.ontime - a.ontime
          })
        
        nest = nest.slice(0, 10)
        
        var origins = []
        for (var i = nest.length - 1; i >= 0; i--) {
          origins.push(nest[i].key)
        }
        
         /*create the list with all the airports, so we can create the buttons*/
        /*create the buttons inside the specified container*/
        var buttons = d3.select("#map-container")
                        .append("div")
                        .attr("class", "row")
                        .append("div")
                        .attr("class", "origins_buttons col col-centered")
                        .selectAll("div")
                        .data(origins)
                        .enter()
                        .append("button")
                        .attr("class", "btn btn-default")
                        .text(function(d) {
                            return d;
                        });
        /*function for the dynamic update of the map*/
        function update(origin) {
          
          /*fisrt we filter the nest variable, only getting the airport the user clicked*/
            var filtered = nest.filter(function(d) {
                    return d["key"] === origin;
                    
                });
            
            var percentage = (filtered[0].ontime / (filtered[0].values.length - 1))*100
            percentage = percentage.toFixed(2)
            d3.select("#airport-info")
            .text("Airport of " + filtered[0].values[0][3] + ". It had " + percentage.toString() + "% of flights on time");
            var links = [];
            /*we create the list of dictionaries with the type specified as a Linestring, also we add the color so we can distinguish the different delays*/
            for(var i=0, len=filtered[0].values.length-1; i<len; i++){
                links.push({
                    type: "LineString",
                    coordinates: [
                        [filtered[0].values[i][0][0],filtered[0].values[i][0][1]],
                        [filtered[0].values[i][1][0],filtered[0].values[i][1][1]]
                    ],
                    color: filtered[0].values[i][2],
                    city: filtered[0].values[i][3]
                });
            }
            /*remove the selected linestrings*/
            svg.selectAll('g').remove()
            /*select all the previous linestrings*/
            var paths = svg.append("g")
                           .selectAll("path")
                           .data(links)
            
            
            /*Finally we insert the new linestrings color coded*/
            paths.enter()
                 .append('path')
                 .transition()
                 .duration(1000)
                 .attr('d', path)
                 .style("stroke", function(d){
                    if (d.color <= 0) {
                      return "green"
                    } else if (d.color <= 15){
                      return "yellow"
                    } else if (d.color <= 30){
                      return "orange"
                    } else{
                      return "red"
                    }
                 }).style({
                    'stroke-width': 2})
            
            
          }

        /*we create the list of dictionaries with the type specified as a Linestring, also we add the color so we can distinguish the different delays*/
        var links = [];
            for(var i=0, len=data.length-1; i<len; i++){
                links.push({
                    type: "LineString",
                    coordinates: [
                        [data[i][["origin_long"]],data[i][["origin_lat"]]],
                        [data[i]["dest_long"],data[i]["dest_lat"]]
                    ],
                    color: +data[i]["DepDelay"],
                    city: data[i]["city"]
                });
            }
            /*we insert the new linestrings color coded*/
            var paths = svg.append('g')
                           .selectAll('path')
                           .data(links)
                           .enter()
                           .append('path')
                           .attr('d', path)
                           .style("stroke", function(d){
                              if (d.color <= 0) {
                                return "green"
                              } else if (d.color <= 15){
                                return "yellow"
                              } else if (d.color <= 30){
                                return "orange"
                              } else{
                                return "red"
                              }
                           }).style({
                              'stroke-width': 2})
        /*we create the behaviour of the buttons */
        buttons.on("click", function(d) {
            d3.select(".origins_buttons")
              .selectAll("div")
              .transition()
              .duration(500)

            d3.select(this)
              .transition()
              .duration(500)
            update(d);
        
        
                   
      })
  });

/*this is the function for the zoom which allows scaling*/
function zoomed() {
  projection.translate(d3.event.translate).scale(d3.event.scale);
  g.selectAll("path").attr("d", path);
}


}