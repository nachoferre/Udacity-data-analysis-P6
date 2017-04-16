# Udacity-data-analysis-P6


## Summary

This visualization hopes to ilustrate the delays occurred in a random sample of all the flights that took place in 1987. I have used a sample as a case study for the user to understand the potencial of map visualizations. 

## Design
First I started using only th us map, however I was told that the visualization was off and that there were some flights outside the us, so I decided to use the world map.
Once I was using the world map some people found difficult to easily see the flight patterns so i decided to implement the zoom feature.
During the capture of feedback a colleage found an error in the coordinates for the Guam airport. I corrected the issue in the data.
Finally I added the color coded feature to be able to distinguish the different delays. I have enhanced the data with the coordinates of every airport as well as changed it to json file. The one I have worked with is 1987_sample.json

## Feedback
"The map is beautiful, but there seems to be some points leading to the sea"
This feedback helped me find an error in the input data and fixed it so the coordinates of the Guam airport are correct
"The map seems good but see the flight lines is quite difficult in a map that big"
This feedback made me try to find new ways of seeing or focusing on the data, and that is why I implemented the zoom feature.
"The map looks great but the buttons seem to be misplaced in the middle of the page, and it would be great if there were a limit between the map and the rest of the page"
This feedback that helped me shape the map and set the placing of the buttons where it is, because as we remeber the buttons created by d3 natively are positioned and formatted differently. Also I set the frame around the map so it can be more confortable to the eye.


## Readers Summary
Here we see the map which gives the ability of seeing the different plane paths of the 10 most efficient departure airports of the US in 1987. It is good to see the percentage of on-time flights so it can give an idea of the volume of traffic being departed in or ahead of scechedule. And thanks to that we can infer the efficiency of the airport in handling departures.


## Resources

https://maori.geek.nz/drawing-maps-with-d3-js-and-other-geographical-fun-3a6eedeb8e3
http://bl.ocks.org/erikhazzard/6201948
https://www.dashingd3js.com/svg-paths-and-d3js
http://stackoverflow.com/questions/18153234/center-a-column-using-twitter-bootstrap-3
https://www.w3schools.com/cssref/css3_pr_box-sizing.asp
http://stackoverflow.com/questions/4622808/html-changing-colors-of-specific-words-in-a-string-of-text
https://bl.ocks.org/mbostock/2206340
http://bl.ocks.org/pere/3012590
http://stackoverflow.com/questions/18493505/straight-lines-on-map-in-d3-js
http://www.tnoda.com/blog/2014-04-02
http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects