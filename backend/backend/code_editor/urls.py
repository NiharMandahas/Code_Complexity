from django.urls import path
from . import views

urlpatterns = [
    path('execute_code/', views.run_code, name='simple_view'),
]