# Natural Language Toolkit (NLTK) 
# https://www.nltk.org/install.html
# corpus is responsible for create the stopwords list
from nltk.corpus import stopwords
# tokenize is responsible to tokenize the sentences
from nltk.tokenize import word_tokenize
  
# X ="I love horror movies"
X ="I love Lights out in a horror movies"
Y ="Lights out is a horror movie"
  
X_list = word_tokenize(X) 
Y_list = word_tokenize(Y)
  
sw = stopwords.words('english') 
l1 = []
l2 = []
  
X_set = {w for w in X_list if w not in sw} 
Y_set = {w for w in Y_list if w not in sw}
  
# form a set containing keywords of both strings 
rvector = X_set.union(Y_set) 
for w in rvector:
    if w in X_set: l1.append(1) # create a vector
    else: l1.append(0)
    if w in Y_set: l2.append(1)
    else: l2.append(0)

def dot_product(vec1, vec2):
    c = 0
    # cosine formula 
    for i in range(len(vec1)):
        c += vec1[i] * vec2[i]
    return c

def magnitude(vec):
    m = 0
    for i in range(len(vec)):
        m += vec[i] ** 2
    return m ** 0.5

def cross_product(vec1, vec2):
    m1 = magnitude(vec1)
    m2 = magnitude(vec2)
    return m1 * m2

cosine = dot_product(l1, l2) / cross_product(l1, l2)

print("similarity: ", cosine)