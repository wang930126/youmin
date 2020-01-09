# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gamecenter', '0004_auto_20200109_1038'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='game_type',
            field=models.SmallIntegerField(default=0, choices=[(0, '未知'), (1, '动作游戏'), (2, '角色扮演'), (3, '即时战略')]),
        ),
    ]
