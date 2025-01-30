# from django.urls import path
# from . import views
# from dj_rest_auth.registration.views import RegisterView
# from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
# from django.urls import path
# from dj_rest_auth.registration.views import (ResendEmailVerificationView, VerifyEmailView,)
# from dj_rest_auth.views import(PasswordResetConfirmView, PasswordResetView,)
# from .views import custom_login_view, custom_logout_view

# # Add your URLs here.
# urlpatterns = [
# # path('register/', RegisterView.as_view(), name='rest_register'),
# # path('api-login/', LoginView.as_view(), name='rest_login'), # 42
# path('login/', custom_login_view, name='custom_login'),
# path('logout/', custom_logout_view, name='logout'),
# # path('user/', UserDetailsView.as_view(), name='rest_user_details'),
# # path('register/verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
# # path('register/resend-email/', ResendEmailVerificationView.as_view(), name="rest_resend_email"),
# # path('account-confirm-email/<str:key>/', email_confirm_redirect, name='account_confirm_email'),
# # path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
# # path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
# # path('password/reset/confirm/<str:uidb64>/<str:token>/', custom_password_reset_confirm, name='custom_password_reset_confirm'),
# # path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
# ]

from django.urls import path
from . import views
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from dj_rest_auth.registration.views import (
    ResendEmailVerificationView, VerifyEmailView
)
from dj_rest_auth.views import (
    PasswordResetConfirmView, PasswordResetView
)
from .views import custom_login_view, custom_logout_view

urlpatterns = [
    # Register view (you can uncomment it if needed)
    # path('register/', RegisterView.as_view(), name='rest_register'),
    
    # Custom login view
    path('login/', custom_login_view, name='custom_login'),

    # Custom logout view
    path('logout/', custom_logout_view, name='custom_logout'),

    # DJ Rest Auth views (optional if using dj-rest-auth built-in views)
    path('api/login/', LoginView.as_view(), name='rest_login'),  # Custom login endpoint
    path('api/logout/', LogoutView.as_view(), name='rest_logout'),  # Custom logout endpoint
    
    # # User details view (this provides user info if authenticated)
    # path('user/', UserDetailsView.as_view(), name='rest_user_details'),

    # # Registration and email verification views
    # path('register/verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    # path('register/resend-email/', ResendEmailVerificationView.as_view(), name="rest_resend_email"),

    # # Password reset views
    # path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    # path('password/reset/confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
]
