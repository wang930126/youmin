from django.db import models

class BaseModel(models.Model):

    create_date = models.DateTimeField(auto_now_add=True,verbose_name='创建时间',null=True,blank=True)
    last_update = models.DateTimeField(auto_now=True,verbose_name='最近更新时间',null=True,blank=True)
    is_delete = models.BooleanField(default=0,verbose_name='删除标记')

    class Meta:
        abstract = True


