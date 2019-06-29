import pandas as pd 
import numpy as np 
import math as math

ratingsDf = pd.read_csv('../../data/movies/ratingsProcessed.csv')

totUsers = int(ratingsDf.max()['userId']+1)#total movies
aveRu = np.zeros(totUsers)

#cal aveRu[userId], default zero
for i in range(0,totUsers):
	_average = ratingsDf.loc[ratingsDf['userId'] == i].mean()['rating']
	if math.isnan(_average):
		aveRu[i] = 0
	else:
		aveRu[i] = _average
	print(i/totUsers)

aveRu = pd.DataFrame(aveRu)
aveRu.columns = ['aveRu']
aveRu.to_csv('../../data/movies/aveRu.csv',float_format = '%.3f')
#over

#