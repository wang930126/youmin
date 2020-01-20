# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20200109_0957'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='intruduction',
            field=models.TextField(verbose_name='个性介绍', blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='signature',
            field=models.TextField(verbose_name='个性签名', blank=True, null=True),
        ),
    ]
