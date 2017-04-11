import json
import random


with open("Data/1987_sample.json") as fd:
	data = json.load(fd)
	aux = []
	for air in data:
		# aux.append(air["Origin"])
		if air["origin_long"] == -144.7959825:
			air["origin_long"] = abs(air["origin_long"])
			
		if air["dest_long"] == -144.7959825:
			air["dest_long"] = abs(air["dest_long"])
	# output = random.sample(data, 100000)
	# output = data[:10000]
	# for elem in data:
	# 	elem["origin_lat"] = float(elem["origin_lat"])
	# 	elem["origin_long"] = float(elem["origin_long"])
		
	# 	elem["dest_lat"] = float(elem["dest_lat"])
	# 	elem["dest_long"] = float(elem["dest_long"])
	with open("Data/coordinates_fix"+".json", 'w') as fd:
		json.dump(data, fd)
	