# 导入redis模块
from redis import *

# 创建数据库连接对象
sr = StrictRedis(host='172.20.10.3',port=6379,db=0)
# 创建string类型的键值对
res = sr.set('gender','man')
# 获取键的值
res = sr.get('gender').decode()
print(res) #man
# 修改gender键的值为woman
res = sr.set('gender','woman')
res = sr.get('gender').decode()
print(res) #woman
# 删除gender键
res = sr.delete('gender')
res = sr.get('gender')
print(res) #None
sr.set('name','nicholas')
sr.set('gender','man')
sr.set('age','25')
sr.set('hobby','eating')
# 获取数据库中所有的键
res = sr.keys()






