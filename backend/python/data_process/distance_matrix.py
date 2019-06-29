import pandas as pd 
import numpy as np 
import math
import itertools
from tqdm import tqdm

INFINITY = 10000.000
def distance(i, j):
	_vec1 = ratingMatrix[i]
	_vec2 = ratingMatrix[j]
	return np.linalg.norm(_vec1-_vec2)/math.log(1+edgesMat[i,j],2)

def calculateDistance(i, j):
	if i == j:
		disMatrix[i,j] = 0.000
	elif edgesMat[i,j] != 0:
		if i < j:
			disMatrix[i,j] = distance(i,j)
		else:
			disMatrix[i,j] = disMatrix[j,i]

def inputRatings(i):
	_userId = int(ratingsDf.loc[i]['userId'])
	_movieId = int(ratingsDf.loc[i]['movieId'])
	_rating = ratingsDf.loc[i]['rating']
	ratingMatrix[_userId,_movieId] = _rating

def correctRatings(i):
	_userId = int(aveRuDf.loc[i]['userId'])
	_aveRu = aveRuDf.loc[i]['aveRu']
	sum = 0
	num = 0
	for j in range(0,totMovie_no0):
		_movieId = int(aveRmDf.loc[j]['movieId'])
		if ratingMatrix[_userId,_movieId] != 0:
			sum += pow((ratingMatrix[_userId,_movieId] - _aveRu),2)
			num += 1
	delta = math.sqrt(sum / num)
	for j in range(0,totMovie_no0):
		_movieId = int(aveRmDf.loc[j]['movieId'])
		if ratingMatrix[_userId,_movieId] != 0:
			ratingMatrix[_userId,_movieId] = (ratingMatrix[_userId,_movieId] - _aveRu)/delta

ratingsDf = pd.read_csv('../../data/movies/ratingsProcessed.csv')
moviesDf = pd.read_csv('../../data/movies/movies.csv')
aveRuDf = pd.read_csv('../../data/movies/aveRu.csv')
aveRmDf = pd.read_csv('../../data/movies/aveRm_no0.csv')
edgesMatDf = pd.read_csv('../../data/movies/edgesMat.csv')

totUser = int(ratingsDf.max()['userId']+1)#use 1 ot 610
totMovie = int(moviesDf.max()['movieId']+1)
totMovie_no0 = int(aveRmDf.shape[0])

##generate ratingMatrix: [userId,movieId] => rating  //rating == 0 means no rating
ratingMatrix = np.zeros((totUser,totMovie))

_aveRmDf_rows = int(aveRmDf.shape[0])
_ratingsDf_rows = int(ratingsDf.shape[0])
_aveRuDf_rows = int(aveRuDf.shape[0])

#input the ratings
for i in tqdm(range(0, _ratingsDf_rows)):
	inputRatings(i)
#

#to correct the rating by minusing "user's average rating"
for i in tqdm(range(1,_aveRuDf_rows)):
	correctRatings(i)
##over

##generate disMatrix: [user1,user2] => sim, default sim = 0
disMatrix = np.zeros((totUser,totUser))
edgesMat = np.array(edgesMatDf.drop(['0'],axis = 1))

#default distance, if no edge
for i in tqdm(range(1,totUser)):
	disMatrix[i] = INFINITY
#calculate the distance
for i in tqdm(range(1,totUser)):
	for j in tqdm(range(1,totUser)):
		calculateDistance(i, j)
##over

disDf = pd.DataFrame(disMatrix)
np.savetxt('../../data/movies/dis_matrix_Zscore.txt', disMatrix, fmt = '%.3f')
disDf.to_csv('../../data/movies/dis_matrix_Zscore.csv',float_format = '%.3f')

