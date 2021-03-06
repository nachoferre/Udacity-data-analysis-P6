# Udacity-data-analysis-P6


## Summary

This visualizations shows the 10 best airports to departure from the US in 1987. It offers a bubble map of the 10 most efficient airports with a color code to understand each ones efficiency. In addition it gives you the exact percentage of on-time flights for the selected airport as well as the city for an easier understanding.

## Design
First I started using only the us map, however I was told that the visualization was off and that there were some flights outside the us, so I decided to use the world map.
Once I was using the world map some people found difficult to easily see the flight patterns so i decided to implement the zoom feature.
During the capture of feedback a colleague found an error in the coordinates for the Guam airport. I corrected the issue in the data.
Finally I added the color coded feature to be able to distinguish the different delays. I have enhanced the data with the coordinates of every airport as well as changed it to json file. The one I have worked with is 1987_sample.json.
After the reviews I settled and went back to the US map and deleted the airports outside the US territory to avoid unwanted points. In addition I changed from a line-related map to a bubble map for an easier understanding and to be able to better differenciate one airport efficiency from another. 

## Feedback
"The map is beautiful, but there seems to be some points leading to the sea"
This feedback helped me find an error in the input data and fixed it so the coordinates of the Guam airport are correct
"The map seems good but see the flight lines is quite difficult in a map that big"
This feedback made me try to find new ways of seeing or focusing on the data, and that is why I implemented the zoom feature.
"The map looks great but the buttons seem to be misplaced in the middle of the page, and it would be great if there were a limit between the map and the rest of the page"
This feedback that helped me shape the map and set the placing of the buttons where it is, because as we remember the buttons created by d3 natively are positioned and formatted differently. Also I set the frame around the map so it can be more comfortable to the eye.


## Readers Summary
Here we see the map which gives the ability of seeing the different plane paths of the 10 most efficient departure airports of the US in 1987. It is good to see the percentage of on-time flights so it can give an idea of the volume of traffic being departed in or ahead of schedule. And thanks to that we can infer the efficiency of the airport in handling departures.


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
http://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
http://bl.ocks.org/d3noob/5193723