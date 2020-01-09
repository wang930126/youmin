# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20200109_0955'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birthday',
            field=models.DateField(verbose_name='生日', null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='intruduction',
            field=models.TextField(verbose_name='个性介绍', null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='signature',
            field=models.TextField(verbose_name='个性签名', null=True),
        ),
    ]
