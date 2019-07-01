import numpy as np 

print("size = ")
size = int(input())
mat = np.random.randint(0,20,size=(size,size))
mat = np.triu(mat)
mat += mat.T - 2*np.diag(mat.diagonal())
print(mat)