from django.conf.urls import url
from apps.user.views import *

# 在app的user/urls.py模块中配置 应用（app_name）命名空间，为url函数添加name属性
app_name = 'user'
urlpatterns = [
    url(r'^register$',RegisterView.as_view(),name='register'),#注册
    url(r'^verifyphone',Verifyphone.as_view(),name='verifyphone'),#电话号码注册验证电话号码是否重复
    url(r'^verifyemail',Verifyemail.as_view(),name='verifyemail'),#邮箱注册验证邮箱是否重复
    url(r'^register_done',RegisterDone.as_view(),name='register_done'),#提交邮箱注册后弹出的页面
    url(r'^register_activate',Register_Activate.as_view(),name='register_activate'),
    url(r'^register_supply$',RegisterSupply.as_view(),name='register_supply'),# 用户补充信息处理url
    url(r'^login$',Login.as_view(),name='login'),# 用户登录页面
]