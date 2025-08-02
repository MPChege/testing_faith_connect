from django.contrib import admin

from business.models import Review, Service, BusinessHour, Business
# Register your models here.
admin.site.register(Business)
admin.site.register(Service)
admin.site.register(BusinessHour)
admin.site.register(Review)
