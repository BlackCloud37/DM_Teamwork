import numpy as np 
import pandas as pd
import tqdm as tqdm

def save(filename, contents):
      fh = open(filename, 'w', encoding='utf-8')
      fh.write(contents)
      fh.close()

def generateOne(key_pair_list):
	res = "{"
	for each in key_pair_list:
		key ,value = each
		res = res + "\"" + key + "\":" + str(value) + ","
	res = res[:-1]
	res += "}"
	return res



def mat2json(matrix):
	totNode = matrix.shape[0]
	countEdge = 0
	NODE_NAME = "Nodes"
	EDGE_NAME = "Edges"
	json_target = "{\"" + NODE_NAME + "\":\n["
	for i in range(1,totNode):
		json_target += generateOne( [("nodeId", i) ] )
		json_target += ",\n"
	json_target = json_target[:-2]
	json_target += "],\n"
	json_target += "\"" + EDGE_NAME + "\":\n["

	for i in range(1, totNode):
		for j in range(1, totNode):
			if i > j and matrix[i, j] != 0 and matrix[i,j] != 10000:
				countEdge += 1
				json_target += generateOne([("edgeId", countEdge), ("fromId", i), ("toId", j), ("weight", matrix[i, j])])
				json_target += ",\n"
	json_target = json_target[:-2]
	json_target += "]\n"
	json_target += "}"
	
	save("test_json.json", json_target)


'''
import numpy as np
from mat_to_json import mat2json as m2j
mat = np.matrix([[0,0,0,0],[0,0,1,2],[0,1,0,3],[0,2,3,0]])
m2j(mat)
'''
