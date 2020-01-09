#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "youmin.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)

    # import re
    # from apps.gamecenter.models import *
    # from datetime import datetime
    #
    # string = '''三国志14|龙珠卡卡罗特|如龙7|WAR3:RE|DOOM永恒|生化3:RE|漫威复联|最后生还者2|看门狗军团|仁王2|赛博朋克2077|FF7:RE|暗黑破坏神4|
    # '''
    # for item in re.findall(r'(.*?)\|', string):
    #     game = Game()
    #     game.name = item
    #     game.pub_date = datetime.now()
    #     game.save()