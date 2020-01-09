# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('catename', models.CharField(verbose_name='游戏大类', max_length=30, default='Unknown')),
            ],
            options={
                'verbose_name': '游戏大类',
                'verbose_name_plural': '游戏大类',
                'db_table': 'category',
            },
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('name', models.CharField(verbose_name='游戏名称', max_length=30)),
                ('introduction', models.TextField(verbose_name='游戏简介')),
                ('gamemainimage', models.ImageField(verbose_name='游戏主宣传画', upload_to='gamemainimage')),
                ('distributor', models.CharField(verbose_name='游戏发行商', max_length=30, default='Unknown')),
                ('producer', models.CharField(verbose_name='游戏制作商', max_length=30, default='Unknown')),
                ('pub_date', models.DateField(verbose_name='游戏发行日期')),
                ('hot', models.IntegerField(verbose_name='游戏热度', default=0)),
            ],
            options={
                'verbose_name': '游戏',
                'verbose_name_plural': '游戏',
                'db_table': 'game',
            },
        ),
        migrations.CreateModel(
            name='GameImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('image', models.ImageField(verbose_name='游戏图片路径', upload_to='games')),
                ('gameid', models.ForeignKey(verbose_name='图片所属游戏', to='gamecenter.Game')),
            ],
        ),
        migrations.CreateModel(
            name='Platform',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('platname', models.CharField(verbose_name='平台名称', max_length=30)),
                ('gameid', models.ManyToManyField(verbose_name='平台对应游戏', to='gamecenter.Game')),
            ],
            options={
                'verbose_name': '平台',
                'verbose_name_plural': '平台',
                'db_table': 'platform',
            },
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('typename', models.CharField(verbose_name='游戏小类', max_length=30, default='Unknown')),
                ('gameid', models.ManyToManyField(verbose_name='小类对应的游戏', to='gamecenter.Game')),
            ],
            options={
                'verbose_name': '游戏小类',
                'verbose_name_plural': '游戏小类',
                'db_table': 'type',
            },
        ),
        migrations.AddField(
            model_name='category',
            name='gameid',
            field=models.ManyToManyField(verbose_name='大类对应的游戏', to='gamecenter.Game'),
        ),
    ]
