# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('gamecenter', '0002_auto_20200109_1025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='gamemainimage',
            field=models.ImageField(verbose_name='游戏主宣传画', blank=True, null=True, upload_to='gamemainimage'),
        ),
        migrations.AlterField(
            model_name='game',
            name='introduction',
            field=tinymce.models.HTMLField(verbose_name='游戏简介', blank=True, null=True),
        ),
    ]
