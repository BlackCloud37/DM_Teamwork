import numpy as np
import pandas as pd
import queue

class Node(object):
	def __init__(self, id, pre, dis):
		self.id = id
		self.pre = pre
		self.dis = dis

	def __lt__(self,other):
		return self.dis < other.dis

def minSpanTree(graph):
	vNum = graph.shape[0] - 1
	wSum = 0
	ifAdded = np.empty([vNum+1], dtype = bool)
	ifAdded[:] = False

	pQueue = queue.PriorityQueue()
	pQueue.put(Node(1,-1,0))
	outputQ = queue.Queue()

	while pQueue.qsize():
		tmpNode = pQueue.get()
		tmpId = tmpNode.id

		if ifAdded[tmpId]:
			pQueue.get()
			continue

		weight = graph[tmpId]
		for nextId in range(1,vNum):
			if weight[nextId] != 0:
				pQueue.put(Node(nextId, tmpId, weight[nextId]))

		wSum += tmpNode.dis
		outputQ.put(tmpNode)
		ifAdded[tmpId] = True

	return [outputQ, wSum]