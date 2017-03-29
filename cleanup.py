import json

with open("Data/1987_sample.json") as fd:
	data = json.load(fd)
	# output = data[:10000]
	# for elem in data:
	# 	elem["origin_lat"] = float(elem["origin_lat"])
	# 	elem["origin_long"] = float(elem["origin_long"])
		
	# 	elem["dest_lat"] = float(elem["dest_lat"])
	# 	elem["dest_long"] = float(elem["dest_long"])

	# with open("Data/1987_sample"+".json", 'w') as fd:
	#	json.dump(output, fd)
	for elem in data:
		print data["origin_long"]