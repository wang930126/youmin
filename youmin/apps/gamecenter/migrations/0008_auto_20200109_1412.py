# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gamecenter', '0007_auto_20200109_1358'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='game_type',
            field=models.SmallIntegerField(verbose_name='游戏类型', default=0, choices=[(0, '未知'), (1, '动作游戏'), (2, '角色扮演'), (3, '即时战略'), (4, '第一人称射击'), (5, '第三人称射击'), (6, '策略'), (7, '动作角色扮演'), (8, '3D沙盒益智'), (9, '益智游戏')]),
        ),
    ]
