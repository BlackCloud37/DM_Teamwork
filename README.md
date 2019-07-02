# DM_Teamwork
ZZX &amp; YC, 2019-Spring DM homework

# 图论大作业文档

## 一.建模

### 1.数据选用

- **来源:** https://grouplens.org/datasets/movielens/
- **电影数据构成**(引用自数据包内README.txt)：

> ***Ratings Data File Structure (ratings.csv)***
>
> All ratings are contained in the file `ratings.csv`. Each line of this file after the header row represents one rating of one movie by one user, and has the following format:
>
>  userId,movieId,rating,timestamp

- **数据规模：**
  - **用户数：**610
  - **电影数：**9k+

### 2.建模目标

- 用图反应**用户相似度**

### 3.建模方法

- **节点：**用户
- **边：**评论过相同电影则有边
- **权重：** $W(i,j)$

> $$W(i,j) = round ( d(i,j))\\(round()为取整函数) \\d(i,j) = \left \| \vec{v_i}-\vec{v_j} \right \| \\ \vec{v_i} = (x^*_{i1},x^*_{i2}, \dots,x^*_{iM})_{1\times M}\quad\quad\ \{m = 1,2,\dots,M(totalMovie)\}$$





***Remarks:***

- 采用**用户-电影评分**向量，计算两个用户$U_i,U_j$间特征向量的欧氏距离，用户越**相似**则距离越**近**

  - 由于用户打分有偏好(倾向高分或低分)，一个常打三分的用户给出的四分与常打五分的用户给出的四分“价值”是不等的，故对用户打分进行$z-score$标准化，以反映用户打分对应的喜爱程度，$z-score$标准化公式如下：

  > $x^*_{im} = \frac {x_{im}-\bar x_{i}}{\delta _i}$
  >
  > $x^*_{im}:修正后分数\qquad x_{im}:修正前分数\qquad \bar x_{i}:用户平均给分\qquad \delta_i:用户给分的标准差$

  - 计算得到标准化后，用户评分的欧氏距离$d(i,j) \in[1.271,\ 32.77]$，取整后得到整数边权


## 二.编程过程及进度 (待补充)

- **图储存方式：**邻接矩阵 （边较密集，数据规模较小）

- **语言：**

  - **数据处理：** *python*

    > $Index/py/data\_process \\ —average\_Rm.py（求电影平均分）\\—average\_Ru.py （求用户平均分）\\ —edges\_matrix.py （求用户间共同电影数）\\—distance\_matrix.py （求节点间欧式距离）$

- **进度：** 

  - 已完成图的建立(节点、边权的计算)，完成了最短路及最小生成树的算法
  - TODO: 节点中心度算法，可视化等

## 三.算法选择与分析 (待完成)

- **最短路：**采用$dijkstra$算法
- **最小生成树：**采用$Prim$算法
- **节点中心度：**
- **额外算法：**

## 四.说明：

本文档仅记录了到目前为止的工作，模型及算法都可能在后续进行修改，故不完全代表最终结果