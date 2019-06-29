import pandas as pd 
import numpy as np 
import math
import itertools


ratingsDf = pd.read_csv('../../data/movies/ratingsProcessed.csv')
moviesDf = pd.read_csv('../../data/movies/movies.csv')
aveRuDf = pd.read_csv('../../data/movies/aveRu.csv')
aveRmDf = pd.read_csv('../../data/movies/aveRm_no0.csv')

totUser = int(ratingsDf.max()['userId']+1)#use 1 ot 610
totMovie = int(moviesDf.max()['movieId']+1)
totMovie_no0 = int(aveRmDf.shape[0])

##确定谁之间有边
edgesMat = np.zeros((totUser,totUser))
for _pos in range(0,totMovie_no0):
	_movieId = int(aveRmDf.loc[_pos]['movieId'])
	_vec = np.array(ratingsDf[ratingsDf['movieId'] == _movieId]['userId'])
	for each in itertools.product(_vec,_vec):
		edgesMat[each[0],each[1]] += 1 
	print(_pos/totMovie_no0*100,"%")
edgesDf = pd.DataFrame(edgesMat)
edgesDf.to_csv('../../data/movies/edgesMat.csv')
##