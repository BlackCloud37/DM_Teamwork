import pandas as pd
import numpy as np
import tqdm as tqdm
import math as math

unformatted_Df = pd.read_csv('../../data/processed/dis_matrix_Zscore.csv')
mat = unformatted_Df.values
mat = np.delete(mat, 0, axis = 1)
mat = mat.round()
Df = pd.DataFrame(mat)
Df.to_csv('../../data/processed/distance_formatted.csv')