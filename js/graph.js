


function draw(geo_data) {
    "use strict";
        var margin = 150,
            width = 1000 - margin,
            height = 400 - margin;
        var graticule = d3.geo.graticule()

        var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin)
            .attr("height", height + margin)
            .append("g");
            
        var projection = d3.geo.mercator()
                               .scale(100)
                               .translate([width / 2, height / 1.2]);

        var path = d3.geo.path().projection(projection);
        var zoom = d3.behavior.zoom()
                  .translate(projection.translate())
                  .scale(projection.scale())
                  .scaleExtent([height, 8 * height])
                  .on("zoom", zoomed);
        var g = svg.call(zoom);

        g.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height);
        var map = svg.selectAll('path')
                     .data(geo_data.features)
                     .enter()
                     .append('path')
                     .attr('d', path)
                     .style('fill', 'lightBlue')
                     .style('stroke', 'black')
                     .style('stroke-width', 0.5)
                     .on("click", clicked);
        

      d3.json("Data/1987_sample.json", function(error, data) {
        if (error) throw error;

        console.log(data)

        console.log(_.map(data, (d, i) => {
          return [d["origin_long"], d["origin_lat"]]
        }))

      var origins = ["JFK", "GSP", "FNT", "SIT", "MIA", "BOS", "OAK", "BGM", "CCR", "LIT", "BOI", "BGR", "YUM", "DRO", "CPR", "AGS", "GSO", "SAN", "PIA", "MYR", "BTM", "DCA", "LBB", "HSV", "GRB", "SPN", "BWI", "PIT", "SAV", "SAT", "CHA", "ILM", "IAH", "TPA", "ALO", "IAD", "BFL", "JAN", "HRL", "CHS", "EYW", "WRG", "GPT", "BNA", "JAC", "LAN", "ITH", "JNU", "PHL", "SNA", "PHF", "BIS", "SYR", "PHX", "LAX", "MAF", "MBS", "APF", "LAS", "CRP", "CRW", "CMI", "CMH", "LMT", "GJT", "GUM", "FLL", "DEN", "SMF", "HDN", "DTW", "EVV", "LSE", "MFE", "SCK", "SFO", "BUR", "ROA", "ROC", "SCC", "MFR", "GEG", "LIH", "ROR", "IDA", "BUF", "ANC", "TRI", "GRR", "SHV", "BDL", "CSG", "DLH", "YKM", "GCN", "ORF", "DSM", "BLI", "EWR", "MHT", "PBI", "BTV", "RNO", "RAP", "BTR", "PSC", "FOE", "AVP", "PSG", "MGM", "MOT", "AVL", "HLN", "OKC", "HTS", "IND", "MOB", "PSP", "TYS", "ILG", "COS", "FSD", "ATL", "ISP", "HNL", "PIE", "ATW", "ISO", "ACV", "LFT", "BZN", "SUX", "FWA", "CID", "TVL", "PVD", "SEA", "ICT", "OAJ", "MDW", "MDT", "RDU", "LNK", "GTF", "PDX", "CLE", "DFW", "YAP", "SJU", "RDD", "AUS", "SRQ", "YAK", "CLT", "SJC", "ELP", "TLH", "MSO", "OMA", "FAR", "OME", "BET", "MEM", "LYH", "TUS", "ALB", "PUB", "RIC", "CDV", "SBA", "TUL", "ORH", "LEX", "ORD", "SBN", "MKE", "GNV", "MSY", "AZO", "KOA", "MSP", "CAK", "MSN", "TOL", "CVG", "ERI", "CAE", "MRY", "BIL", "FAY", "RDM", "JAX", "DAB", "GFK", "DAL", "ELM", "OTZ", "FAT", "FAI", "FLG", "UCA", "EAU", "DAY", "ONT", "SGF", "MLB", "ABE", "STL", "MLI", "EUG", "FCA", "STT", "ABQ", "KTN", "HOU", "HPN", "MLU", "CWA", "CHO", "STX", "SLC", "MCO", "PWM", "BHM", "VPS", "MCI", "LGB", "PNS", "LGA", "PFN", "AMA", "SDF", "RST", "OGG", "RSW"]
      var buttons = d3.select("body")
                      .append("div")
                      .attr("class", "origins_buttons")
                      .selectAll("div")
                      .data(origins)
                      .enter()
                      .append("div")
                      .text(function(d) {
                          return d;
                      });
      var nest = d3.nest().key(function(d){
                              return d["Origin"]
                            })
                          .rollup(function(d){
                                  return d.map(function(d){
                                      return [[d["origin_long"], d["origin_lat"]],[d["dest_long"],d["dest_lat"]]]
                                    })
                                })
                          .entries(data)
      function update(origin) {
          var filtered = nest.filter(function(d) {
                  return d["key"] === origin;
                  debugger;
              });


          console.log(_.map(filtered, (d, i) => {
            return [d["origin_long"], d["origin_lat"]]
          }))

          var links = [];
          for(var i=0, len=filtered[0].values.length-1; i<len; i++){
              links.push({
                  type: "LineString",
                  coordinates: [
                      [filtered[0].values[i][0][0],filtered[0].values[i][0][1]],
                      [filtered[0].values[i][1][0],filtered[0].values[i][1][1]]
                  ]
              });
          }
          debugger;
          var paths = svg.select("g")
                         .selectAll("path")
                         .data(links)
          paths.exit().remove()
          console.log(links)
          
          paths.enter()
               .append('path')
               .transition()
               .duration(1000)
               .attr('d', path)
               .style({
                  stroke: 'grey',
                  'stroke-width': 0.5})
          
          debugger;
        }


      var links = [];
          for(var i=0, len=data.length-1; i<len; i++){
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
          var paths = svg.append('g')
                         .selectAll('path')
                         .data(links)
                         .enter()
                         .append('path')
                         .attr('d', path)
                         .style({
                            stroke: 'grey',
                            'stroke-width': 0.5})
      buttons.on("click", function(d) {
          d3.select(".origins_buttons")
            .selectAll("div")
            .transition()
            .duration(500)
            .style("color", "black")
            .style("background", "rgb(251, 201, 127)");

          d3.select(this)
            .transition()
            .duration(500)
            .style("background", "lightBlue")
            .style("color", "white");
          update(d);
        
        debugger;
                   
      })
    });

function clicked(d) {
  var centroid = path.centroid(d),
      translate = projection.translate();

  projection.translate([
    translate[0] - centroid[0] + width / 2,
    translate[1] - centroid[1] + height / 2
  ]);

  zoom.translate(projection.translate());

  g.selectAll("path").transition()
      .duration(700)
      .attr("d", path);
}

function zoomed() {
  projection.translate(d3.event.translate).scale(d3.event.scale);
  g.selectAll("path").attr("d", path);
}


}