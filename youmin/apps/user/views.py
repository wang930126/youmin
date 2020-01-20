from time import time
from youmin.settings import EMAIL_FROM
from django.core.urlresolvers import reverse
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views.generic import View
from youmin.settings import SECRET_KEY
from apps.user.models import *
from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, SignatureExpired
from celery_tasks.tasks import celery_send_mail

# Create your views here.

# 注册视图
class RegisterView(View):

    def get(self,request):
        return render(request,'user/register.html',context={})

    def post(self,request):
        if request.POST.get('Email'):
            email = request.POST.get('Email')
            password = request.POST.get('Password')
            user = User()
            user.email = email
            user.password = password
            user.is_active = 0
            user.username = '我是一只小游民%d'%(time()*1000)
            user.is_superuser = 0
            user.first_name = ''
            user.last_name = ''
            user.date_joined = datetime.now()
            user.save()

            # 通过序列化对象对info进行加密生成token
            serializer = Serializer(SECRET_KEY,60*60*48)
            info = {'confirm':user.id}
            token = serializer.dumps(info)
            token = token.decode()

            '''
            def send_mail(subject, message, from_email, recipient_list,
                fail_silently=False, auth_user=None, auth_password=None,
                connection=None, html_message=None):
            '''

            # 发送邮件
            subject = '游民星空注册激活'
            from_email = EMAIL_FROM
            recipient_list = [email]
            message = ''
            html_message = '''
            <h3>尊敬的用户 %s </h3></br><p>您好！</p></br><p>这是来自 游民星空 的一封登录邮件，请点击下面的链接进行用户的激活，并进行用户信息完善，有效期为2天</p></br><a href="http://127.0.0.1:8000/user/register_activate?token=%s">http://127.0.0.1:8000/user/register_activate?token=%s</a>
            '''%(user.username,token,token)

            celery_send_mail.delay(subject,message,from_email,recipient_list,html_message=html_message)
            return redirect(reverse('user:register_done')+'/?email='+email+'&type=1')
        else:
            pass

# 用户邮件中对应的激活url
class Register_Activate(View):

    def get(self,request):
        token = request.GET.get('token')
        if token:
            try:
                serializer = Serializer(SECRET_KEY, 60 * 60 * 48)
                resolver = serializer.loads(token)
                user = User.objects.get(id=resolver.get('confirm'))
                user.is_active = 1
                user.save()
                return render(request,'user/register_activate.html',context={'token':token})
            except SignatureExpired:
                return render(request,'500.html',context={'message':'您的Signature已经超时！请登录用户激活!'})
        else:
            return render(request,'500.html',context={'message':'您要激活的用户不存在!'})


# 验证用户输入的电话号码是否重复
class Verifyphone(View):

    def post(self,request):
        phone = request.POST.get('phone')
        if not User.objects.filter(phone = phone):
            return JsonResponse({'StatusCode': 1})
        else:
            return JsonResponse({'StatusCode': 0,'Message':'手机号已存在！'})

# 用于验证用户输入的邮箱是否已经存在于mysql数据库
class Verifyemail(View):

    def get(self,request):
        email = request.GET.get('email')
        if not User.objects.filter(email = email):
            return JsonResponse({'StatusCode':1})
        else:
            return JsonResponse({'StatusCode':0,'Message':'邮箱已存在！'})

# 用户注册完成界面
class RegisterDone(View):

    def get(self,request):
        return render(request,'user/register_done.html',context={})

# 用户补充信息url
class RegisterSupply(View):

    def get(self,request):
        token = request.GET.get('token')
        serializer = Serializer(SECRET_KEY, 60 * 60 * 48)
        resolver = serializer.loads(token)
        username = request.GET.get('username')
        sex = request.GET.get('sex')
        select_year = request.GET.get('select_year')
        select_month = request.GET.get('select_month')
        select_day = request.GET.get('select_day')
        select_country = request.GET.get('select_country')
        select_province = request.GET.get('select_province')
        select_city = request.GET.get('select_city')
        user = User.objects.get(id = resolver.get('confirm'))
        user.gender = sex
        user.username = username
        user.nation = select_country
        user.province = select_province
        user.city = select_city
        if select_year != 0:
            birthday = datetime.strptime('%s-%s-%s'%(select_year,select_month,select_day),'%Y-%m-%d')
            user.birthday = birthday
        user.save()
        return redirect(reverse('user:login'))

class Login(View):

    def get(self,request):
        return render(request,'user/login.html',context={})