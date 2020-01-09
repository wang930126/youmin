# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gamecenter', '0006_auto_20200109_1330'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='gameimage',
            options={'verbose_name': '游戏图片', 'verbose_name_plural': '游戏图片'},
        ),
        migrations.AlterModelTable(
            name='gameimage',
            table='gameimage',
        ),
    ]
