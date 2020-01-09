# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gamecenter', '0005_game_game_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='create_date',
            field=models.DateTimeField(verbose_name='创建时间', null=True, auto_now_add=True),
        ),
        migrations.AddField(
            model_name='category',
            name='is_delete',
            field=models.BooleanField(verbose_name='删除标记', default=0),
        ),
        migrations.AddField(
            model_name='category',
            name='last_update',
            field=models.DateTimeField(verbose_name='最近更新时间', null=True, auto_now=True),
        ),
        migrations.AddField(
            model_name='game',
            name='create_date',
            field=models.DateTimeField(verbose_name='创建时间', null=True, auto_now_add=True),
        ),
        migrations.AddField(
            model_name='game',
            name='is_delete',
            field=models.BooleanField(verbose_name='删除标记', default=0),
        ),
        migrations.AddField(
            model_name='game',
            name='last_update',
            field=models.DateTimeField(verbose_name='最近更新时间', null=True, auto_now=True),
        ),
        migrations.AddField(
            model_name='gameimage',
            name='create_date',
            field=models.DateTimeField(verbose_name='创建时间', null=True, auto_now_add=True),
        ),
        migrations.AddField(
            model_name='gameimage',
            name='is_delete',
            field=models.BooleanField(verbose_name='删除标记', default=0),
        ),
        migrations.AddField(
            model_name='gameimage',
            name='last_update',
            field=models.DateTimeField(verbose_name='最近更新时间', null=True, auto_now=True),
        ),
        migrations.AddField(
            model_name='platform',
            name='create_date',
            field=models.DateTimeField(verbose_name='创建时间', null=True, auto_now_add=True),
        ),
        migrations.AddField(
            model_name='platform',
            name='is_delete',
            field=models.BooleanField(verbose_name='删除标记', default=0),
        ),
        migrations.AddField(
            model_name='platform',
            name='last_update',
            field=models.DateTimeField(verbose_name='最近更新时间', null=True, auto_now=True),
        ),
        migrations.AddField(
            model_name='type',
            name='create_date',
            field=models.DateTimeField(verbose_name='创建时间', null=True, auto_now_add=True),
        ),
        migrations.AddField(
            model_name='type',
            name='is_delete',
            field=models.BooleanField(verbose_name='删除标记', default=0),
        ),
        migrations.AddField(
            model_name='type',
            name='last_update',
            field=models.DateTimeField(verbose_name='最近更新时间', null=True, auto_now=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='game_type',
            field=models.SmallIntegerField(verbose_name='游戏类型', default=0, choices=[(0, '未知'), (1, '动作游戏'), (2, '角色扮演'), (3, '即时战略')]),
        ),
    ]
