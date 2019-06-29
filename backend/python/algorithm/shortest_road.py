#return False or [road_stack, shortest_distance]
import numpy as np
import pandas as pd
import queue

INF = 32767
MAXSIZE = 611

class Node(object):
	def __init__(self, id):
		self.id = id
	def __lt__(self,other):
		return shtDis[self.id] < shtDis[other.id]

shtDis = np.empty([MAXSIZE], dtype = int)
shtDis[:] = INF

def shortestRoad(graph , fromId, toId):
	road = np.empty([MAXSIZE], dtype = int)
	road[:] = -1
	shtDis[:] = INF
	totNode = graph.shape[0]-1

	shtDis[fromId] = 0
	ansS = []

	priorityQ = queue.PriorityQueue()
	priorityQ.put(Node(fromId))

	while priorityQ.qsize():
		tmpId = priorityQ.get().id
		weight = graph[tmpId]
		for nextId in range(1,totNode):
			if weight[nextId] != 0:
				if(shtDis[nextId] > shtDis[tmpId] + weight[nextId]):
					shtDis[nextId] = shtDis[tmpId] + weight[nextId]
					priorityQ.put(Node(nextId))
					road[nextId] = tmpId
	back = toId
	while back != -1:
		ansS.append(back)
		back = road[back]

	if shtDis[toId] == INF:
		return False
	else:
		return [ansS, shtDis[toId]]

