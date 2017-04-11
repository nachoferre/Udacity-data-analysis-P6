
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

        /*create the list with all the airports, so we can create the buttons*/
        var origins = ["JFK", "GSP", "FNT", "SIT", "MIA", "BOS", "OAK", "BGM", "CCR", "LIT", "BOI", "BGR", "YUM", "DRO", "CPR", "AGS", "GSO", "SAN", "PIA", "MYR", "BTM", "DCA", "LBB", "HSV", "GRB", "SPN", "BWI", "PIT", "SAV", "SAT", "CHA", "ILM", "IAH", "TPA", "ALO", "IAD", "BFL", "JAN", "HRL", "CHS", "EYW", "WRG", "GPT", "BNA", "JAC", "LAN", "ITH", "JNU", "PHL", "SNA", "PHF", "BIS", "SYR", "PHX", "LAX", "MAF", "MBS", "APF", "LAS", "CRP", "CRW", "CMI", "CMH", "LMT", "GJT", "GUM", "FLL", "DEN", "SMF", "HDN", "DTW", "EVV", "LSE", "MFE", "SCK", "SFO", "BUR", "ROA", "ROC", "SCC", "MFR", "GEG", "LIH", "ROR", "IDA", "BUF", "ANC", "TRI", "GRR", "SHV", "BDL", "CSG", "DLH", "YKM", "GCN", "ORF", "DSM", "BLI", "EWR", "MHT", "PBI", "BTV", "RNO", "RAP", "BTR", "PSC", "FOE", "AVP", "PSG", "MGM", "MOT", "AVL", "HLN", "OKC", "HTS", "IND", "MOB", "PSP", "TYS", "ILG", "COS", "FSD", "ATL", "ISP", "HNL", "PIE", "ATW", "ISO", "ACV", "LFT", "BZN", "SUX", "FWA", "CID", "TVL", "PVD", "SEA", "ICT", "OAJ", "MDW", "MDT", "RDU", "LNK", "GTF", "PDX", "CLE", "DFW", "YAP", "SJU", "RDD", "AUS", "SRQ", "YAK", "CLT", "SJC", "ELP", "TLH", "MSO", "OMA", "FAR", "OME", "BET", "MEM", "LYH", "TUS", "ALB", "PUB", "RIC", "CDV", "SBA", "TUL", "ORH", "LEX", "ORD", "SBN", "MKE", "GNV", "MSY", "AZO", "KOA", "MSP", "CAK", "MSN", "TOL", "CVG", "ERI", "CAE", "MRY", "BIL", "FAY", "RDM", "JAX", "DAB", "GFK", "DAL", "ELM", "OTZ", "FAT", "FAI", "FLG", "UCA", "EAU", "DAY", "ONT", "SGF", "MLB", "ABE", "STL", "MLI", "EUG", "FCA", "STT", "ABQ", "KTN", "HOU", "HPN", "MLU", "CWA", "CHO", "STX", "SLC", "MCO", "PWM", "BHM", "VPS", "MCI", "LGB", "PNS", "LGA", "PFN", "AMA", "SDF", "RST", "OGG", "RSW"]
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
        /*create the nested variable being the key the airport of origin
          We fill the nested variable with the coordinates of the departure and arrival and the delay caused by the departure airport*/
        var nest = d3.nest().key(function(d){
                                return d["Origin"]
                              })
                            .rollup(function(d){
                                    return d.map(function(d){
                                        return [[d["origin_long"], d["origin_lat"]],[d["dest_long"],d["dest_lat"]], +d["DepDelay"]]
                                      })
                                  })
                            .entries(data)
        console.log(nest)
        /*function for the dynamic update of the map*/
        function update(origin) {
          /*fisrt we filter the nest variable, only getting the airport the user clicked*/
            var filtered = nest.filter(function(d) {
                    return d["key"] === origin;
                    
                });

            var links = [];
            /*we create the list of dictionaries with the type specified as a Linestring, also we add the color so we can distinguish the different delays*/
            for(var i=0, len=filtered[0].values.length-1; i<len; i++){
                links.push({
                    type: "LineString",
                    coordinates: [
                        [filtered[0].values[i][0][0],filtered[0].values[i][0][1]],
                        [filtered[0].values[i][1][0],filtered[0].values[i][1][1]]
                    ],
                    color: filtered[0].values[i][2]
                });
            }
            /*select all the previous linestrings*/
            var paths = svg.select("g")
                           .selectAll("path")
                           .data(links)
            /*remvode the selected linestrings*/
            paths.exit().remove()
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
                    color: +data[i]["DepDelay"]
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