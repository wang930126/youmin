# celery_tasks/tasks.py
from django.core.mail import send_mail
from celery_tasks import app

@app.task
def celery_send_mail(subject,message,from_email,recipient_list,html_message):
    send_mail(subject,message,from_email,recipient_list,html_message=html_message)



