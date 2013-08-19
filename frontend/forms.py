from django import forms
from models import Hacker


class HackerAdminForm(forms.ModelForm):

    class Meta:
        model = Hacker
        widgets = {}
