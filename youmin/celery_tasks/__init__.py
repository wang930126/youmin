
# celery_tasks/__init__.py
from celery import Celery

app = Celery('celery_tasks.tasks',broker="redis://172.20.10.3:6379/5",\
             backend="redis://172.20.10.3:6379/6",include='celery_tasks.tasks')




