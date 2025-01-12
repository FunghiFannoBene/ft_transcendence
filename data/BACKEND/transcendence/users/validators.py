from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email as django_validate_email
from django.contrib.auth.password_validation import validate_password as django_validate_password
import re

def validate_email(email):
    try:
        django_validate_email(email)
    except:
        raise ValidationError(
            'invalid_email',
        )
    if len(User.objects.filter(email=email)) != 0:
        raise ValidationError(
            'email_in_use',
        )

def validate_username(username):
    if len(username) < 5:
        raise ValidationError(
            'short_username',
        )
    if not re.search('^[a-zA-Z0-9_]*$', username):
        raise ValidationError(
            'username_invalid_char',
        )
    if not re.search('(?=.*[a-zA-Z])', username):
        raise ValidationError(
            'username_no_letters',
        )
    if len(User.objects.filter(username__iexact=username)) != 0:
        raise ValidationError(
            'username_in_use',
        )

def validate_password(password):
    try:
        django_validate_password(password)
    except:
        raise ValidationError(
            'invalid_password',
        )
