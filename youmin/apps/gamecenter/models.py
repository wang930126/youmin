from django.contrib.auth.models import AbstractUser
from django.db import models
from tinymce.models import HTMLField
from db.base_model import BaseModel

# Create your models here.

class Game(BaseModel):

    name = models.CharField(max_length=30,null=False,verbose_name='游戏名称',default='Unknown')
    introduction = HTMLField(null=True,verbose_name='游戏简介',blank=True)
    gamemainimage = models.ImageField(null=True,upload_to='gamemainimage',verbose_name='游戏主宣传画',blank=True)
    distributor = models.CharField(max_length=30,verbose_name='游戏发行商',default='Unknown')
    producer = models.CharField(max_length=30,verbose_name='游戏制作商',default='Unknown')
    pub_date = models.DateField(verbose_name='游戏发行日期')
    hot = models.IntegerField(default=0,verbose_name='游戏热度')

    # choice选项传入的元组 ((数据库中存储的字段值,显示的字段值)..)
    # game.game_type = 5
    # print(game.get_game_type_display) ---> 第三人称射击
    # verbose_name字段指定了game_type字段在页面中显示时的形式
    GAME_TYPE = (
        (0,'未知'),(1,'动作游戏'),(2,'角色扮演'),(3,'即时战略'),(4,'第一人称射击'),
        (5,'第三人称射击'),(6,'策略'),(7,'动作角色扮演'),(8,'3D沙盒益智'),(9,'益智游戏'),
    )
    game_type = models.SmallIntegerField(default=0,choices=GAME_TYPE,verbose_name='游戏类型')

    class Meta:
        # 指定在mysql数据库中该表的名字
        db_table = 'game'
        # 指定该表在显示时（给人看的）名字
        verbose_name = '游戏'
        verbose_name_plural = verbose_name

    def __str__(self):
        return '<Game %r>'%self.name

class Platform(BaseModel):

    platname = models.CharField(max_length=30,verbose_name='平台名称')
    gameid = models.ManyToManyField('Game',verbose_name='平台对应游戏')

    class Meta:
        db_table = 'platform'
        verbose_name = '平台'
        verbose_name_plural = verbose_name

    def __str__(self):
        return '<Platform %r>'%self.platname


class Category(BaseModel):

    catename = models.CharField(max_length=30,default='Unknown',verbose_name='游戏大类')
    gameid = models.ManyToManyField('Game',verbose_name='大类对应的游戏',null=True,blank=True)

    class Meta:
        db_table = 'category'
        verbose_name = '游戏大类'
        verbose_name_plural = '游戏大类'

    def __str__(self):
        return '<Category %r>'%self.catename

class Type(BaseModel):

    typename = models.CharField(max_length=30,default='Unknown',verbose_name='游戏小类')
    gameid = models.ManyToManyField('Game',verbose_name='小类对应的游戏',null=True,blank=True)

    class Meta:
        db_table = 'type'
        verbose_name = '游戏小类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return '<Type %r>'%self.typename

class GameImage(BaseModel):

    gameid = models.ForeignKey('Game',verbose_name='图片所属游戏')
    image = models.ImageField(upload_to='games',verbose_name='游戏图片路径')

    class Meta:
        db_table = 'gameimage'
        verbose_name = '游戏图片'
        verbose_name_plural = verbose_name














