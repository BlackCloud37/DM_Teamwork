import pandas as pd 
import numpy as np 
import math as math

ratingsDf = pd.read_csv('../../data/movies/ratingsProcessed.csv')
moviesDf = pd.read_csv('../../data/movies/movies.csv')

totMovies = moviesDf.max()['movieId']#total movies
aveRm = np.zeros(totMovies)

#generate aveRm[movieId], default zero
for i in range(0,totMovies):
	_average = ratingsDf.loc[ratingsDf['movieId'] == i].mean()['rating']
	if math.isnan(_average):
		aveRm[i] = 0
	else:
		aveRm[i] = _average
	print(i/totMovies)

aveRm = pd.DataFrame(aveRm)
aveRm.columns = ['aveRm']
aveRm.to_csv('../../data/movies/aveRm.csv',float_format = '%.3f')
#over

#