import numpy as np 
import pandas as pd

def table2mat(filename):
	tableFile = open(filename,"r")
	lines = []
	for i in range(0,4):
		lines.append(tableFile.readline()[:-1].split())
	for i in range(0,4):
		for j in range(0,len(lines[i])):
			lines[i][j] = int(lines[i][j])

	nodeNum = lines[0][0]
	edgeNum = lines[0][1]

	mat = np.zeros((nodeNum+1,nodeNum+1))

	for i in range(0,len(lines[1])-1):
		tmpNode = i+1
		tmpPos = lines[1][i]
		tmpNextPos = lines[1][i+1]
		for j in range(tmpPos, tmpNextPos):
			mat[tmpNode,lines[2][j]+1] = lines[3][j]
	tableFile.close()
	return mat

filename = '/Users/blackcloud/THU/课程/离散2/test2/test2/Test202.txt'
print(table2mat(filename))


'''#
mat row0 and column0 all 0
from table2mat import table2mat as t2m
filename = 'test203.txt'
mat = t2m(filename)
'''