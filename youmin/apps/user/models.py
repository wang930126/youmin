from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser,models.Model):

    gender = models.BooleanField(verbose_name='性别',default=1)
    birthday = models.DateField(null=True,verbose_name='生日')
    nation = models.CharField(default='',verbose_name='居住国家',max_length=30)
    province = models.CharField(default='',verbose_name='居住省',max_length=30)
    city = models.CharField(default='',verbose_name='居住市',max_length=30)
    signature = models.TextField(null=True,verbose_name='个性签名',blank=True)
    intruduction = models.TextField(null=True,verbose_name='个性介绍',blank=True)
    phone = models.CharField(null=True,max_length=30,verbose_name='手机号码')

    class Meta:
        db_table = 'user'
        verbose_name = '用户信息'
        verbose_name_plural = verbose_name

