import csv
import json

file = "Data/1987"
reader = json.load(open('Data/1987_sample.json'))
data = json.load(open('Data/airports.json'))
d = []
i = 0
for row in reader:
	# for elem in row:
	# 	if row[elem] == "NA":
	# 		row[elem] = 0
	for key in data:
		if key["iata"] == row["Dest"]:
			if key["state"] == "PR" or key["state"] == "AK" or key["state"] == "HI" or key["state"] == 0 or key["state"] == "VI":
				i = 1
			# row["origin_lat"] = float(key["lat"])
			# row["origin_long"] = float(key["long"])
		# if key["iata"] == row["Dest"]:
		# 	row["dest_lat"] = float(key["lat"])
		# 	row["dest_long"] = float(key["long"])
	if i == 0:
		d.append(row)
	else:
		i = 0
	# d.append(row)
	
# with open(file+".csv", 'w') as fd:
# 	writer = csv.DictReader(fd, fieldnames= d[0].keys())
# 	writer.writeheader()
# 	writer.writerows(d)

with open("Data/coordinates_fix"+".json", 'w') as fd:
		json.dump(d, fd)
		
print "finished"
