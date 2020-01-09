# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gamecenter', '0003_auto_20200109_1030'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='gameid',
            field=models.ManyToManyField(verbose_name='大类对应的游戏', blank=True, null=True, to='gamecenter.Game'),
        ),
        migrations.AlterField(
            model_name='type',
            name='gameid',
            field=models.ManyToManyField(verbose_name='小类对应的游戏', blank=True, null=True, to='gamecenter.Game'),
        ),
    ]
