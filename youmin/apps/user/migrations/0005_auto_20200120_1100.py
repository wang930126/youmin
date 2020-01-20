# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_auto_20200114_0926'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='city',
            field=models.CharField(verbose_name='居住市', max_length=30, default=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='nation',
            field=models.CharField(verbose_name='居住国家', max_length=30, default=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='province',
            field=models.CharField(verbose_name='居住省', max_length=30, default=''),
        ),
    ]
