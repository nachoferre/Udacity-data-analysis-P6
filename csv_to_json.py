import csv
import json

file = "Data/1987"
reader = csv.DictReader(open(file+".csv", 'r'))
data = json.load(open('Data/airports.json'))
d = []
i = 0
for row in reader:
	for elem in row:
		if row[elem] == "NA":
			row[elem] = 0
	for key in data:
		if key["iata"] == row["Origin"]:
			row["origin_lat"] = float(key["lat"])
			row["origin_long"] = float(key["long"])
		if key["iata"] == row["Dest"]:
			row["dest_lat"] = float(key["lat"])
			row["dest_long"] = float(key["long"])
	d.append(row)
	
with open(file+".csv", 'w') as fd:
	writer = csv.DictReader(fd, fieldnames= d[0].keys())
	writer.writeheader()
	writer.writerows(d)
		
print "finished"
