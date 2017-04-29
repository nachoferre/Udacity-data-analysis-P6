function draw(geo_data) {
    "use strict";
    /*first we set the space for the map*/
    var margin = 150,
        width = 940 - margin,
        height = 700 - margin,
        radius = 75;
    /*Set the svg element inside the element with id mapper*/
    var svg = d3.select("#mapper")
        .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin);
    // set the color function to be able to create the legend later
    var color = d3.scale.ordinal()
        .range(["#ff3300", "#ff6600", "#ff9900", "#ffcc00", "#ffff00", "#ccff00", "#99ff00", "#66ff00", "#33ff00", "#00ff00"])
    // set up the g variable for the map to be set on
    var g = svg.append("g");
    // set the related info space for each airport
    d3.select("#mapper")
        .append("h4")
        .attr("id", "airport-info")
        .text("All airports");
    d3.select("#mapper")
        .append("h4")
        .attr("id", "airport-info1")
        .text("");
    // create the projection
    var projection = d3.geo.albersUsa()
        .translate([(width + 80) / 2, (height + 150) / 2]) // translate to center of screen
        .scale([1000]); // scale things down so see entire US

    // Define path generator
    var path = d3.geo.path() // path generator that will convert GeoJSON to SVG paths
        .projection(projection); // tell path generator to use albersUsa projection
    // Zoom feature to be kept in case of changes
    // var zoom = d3.behavior.zoom()
    //   .on("zoom",function() {
    //       g.attr("transform","translate("+ 
    //           d3.event.translate.join(",")+")scale("+d3.event.scale+")");
    //       g.selectAll("circle")
    //           .attr("d", path.projection(projection));
    //       g.selectAll("path")  
    //           .attr("d", path.projection(projection)); 
    // });
    // svg.call(zoom)

    // set the map
    g.selectAll("path")
        .data(geo_data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style('fill', 'lightBlue')
        .style("stroke", "black")
        .style("stroke-width", "1")
    //set the domain for the legend so each color has a percentage assigned
    color.domain(["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%", "Percentages"])
    // create the legend
    var legend = svg.attr("class", "legend")
        .selectAll("g")
        .data(color.domain().slice().reverse())
        .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(0," + i * 20 + ")";
        });
    // legend tweaks
    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);
    // legend tweaks
    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(function(d) {
            return d;
        });


    /*load the airport data*/
    d3.json("Data/1987_sample.json", function(error, data) {
        if (error) throw error;
        var projection = d3.geo.albersUsa()
            .translate([(width + 80) / 2, (height + 150) / 2]) // translate to center of screen
            .scale([1000]);
        /*create the nested variable being the key the airport of origin
          We fill the nested variable with the coordinates of the departure and arrival and the delay caused by the departure airport*/
        var nest = d3.nest().key(function(d) {
                return d["Origin"]
            })
            .rollup(function(d) {
                return d.map(function(d) {
                    return [
                        [d["origin_long"], d["origin_lat"]],
                        d["DepDelay"], d["city"]
                    ]
                })
            })
            .entries(data)
        //set the minimum flights in order to use high volume airports
        var minimum_flight_volume = 2000
        // in these loops we create the on time feature wich counts the number of ontime flights each airport has
        // as well as the volume feature which is just the number of flights handeled in a year by each airports
        for (var i = nest.length - 1; i >= 0; i--) {
            var aux = 0
            if (nest[i].values.length > minimum_flight_volume) {
                for (var j = nest[i].values.length - 1; j >= 0; j--) {

                    if (+nest[i].values[j][1] <= 0) {
                        aux = aux + 1
                    }
                }
                nest[i].ontime = aux / (nest[i].values.length - 1)
                nest[i].volume = nest[i].values.length - 1
            } else {
                nest[i].ontime = 0
            }
            nest[i].values[0][0] = projection(nest[i].values[0][0])
        }
        // sort the airports to have the ordered from best to worst given the ontime feature
        nest = nest.sort(function(a, b) {
            return b.ontime - a.ontime
        })
        // we get the 10 best airports
        nest = nest.slice(0, 10)
        // set the origins array to have the names of the 10 best airports
        var origins = []
        for (var i = 0; i <= nest.length - 1; i++) {
            origins.push(nest[i].key)
        }
        origins.push("All Airports")
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
            debugger
            /*fisrt we filter the nest variable, only getting the airport the user clicked*/
            if (origin == "All Airports") {
                var filtered = nest
                d3.select("#airport-info")
                    .text("All Airports")
                d3.select("#airport-info1")
                    .text("")
            } else {
                var filtered = nest.filter(function(d) {
                    return d["key"] === origin;

                });
                // set the airport info to be seen by the viewer
                d3.select("#airport-info")
                    .text("Airport of " + filtered[0].values[0][2] + ".")
                if (origins.indexOf(filtered[0].key) == 0) {
                    d3.select("#airport-info1")
                        .text("The best airport with a " +
                            (filtered[0].ontime * 100).toFixed(2).toString() +
                            "% chance of leaving on time given its volume")
                } else {
                    d3.select("#airport-info1")
                        .text("The " +
                            (origins.indexOf(filtered[0].key) + 1).toString() + " best airport with a " +
                            (filtered[0].ontime * 100).toFixed(2).toString() +
                            "% chance of leaving on time given its volume")
                }
            }


            /*remove the selected g elements*/
            g.selectAll('g').remove()
            // add the new circles to our map
            var paths = g.append('g')
                .selectAll('circle')
                .data(filtered)
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                    return d.values[0][0][0];
                })
                .attr('cy', function(d) {
                    return d.values[0][0][1];
                })
                .attr('fill', function(d) {
                    return hsl_col_perc(d.ontime, 0, 120);
                })
                .attr('r', function(d) {
                    return radius(d['volume']);
                })


        }

        // function to create the color of each bubble given the input value of ontime
        function hsl_col_perc(percent, start, end) {
            var a = percent,
                b = end * a,
                c = b + start;

            //Return a CSS HSL string
            return 'hsl(' + c + ',100%,50%)';
        }
        // reduce the radius size so the whole map is visible
        var radius = d3.scale.sqrt()
            .domain([0, 5000])
            .range([0, 30]);
        // add the new circles to our map
        var paths = g.append('g')
            .selectAll('circle')
            .data(nest)
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return d.values[0][0][0];
            })
            .attr('cy', function(d) {
                return d.values[0][0][1];
            })
            .attr('fill', function(d) {
                return hsl_col_perc(d.ontime, 0, 120);
            })
            .attr('r', function(d) {
                return radius(d['volume']);
            })

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
}