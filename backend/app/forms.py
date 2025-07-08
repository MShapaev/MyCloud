from django import forms

from .models import UserData


class AvatarForm(forms.ModelForm):
    class Meta:
        model = UserData
        fields = ['avatar']


class AvatarIdForm(forms.ModelForm):
    class Meta:
        model = UserData
        fields = ['avatar', 'id']
