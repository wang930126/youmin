from django.conf.urls import include,url
from apps.gamecenter.views import *

app_name = 'gamecenter'
urlpatterns = [
    url(r'^index',index,name='index'),
]