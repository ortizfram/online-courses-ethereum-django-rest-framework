from pathlib import Path
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

SECRET_KEY = os.getenv("SECRET_KEY")

SITE_NAME = "MelonBlog"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

if not DEBUG:
    ALLOWED_HOSTS = ["www.melonblog.com", "melonblog.com", ".melonblog.com"]
else:
    ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# for deployment
RENDER_EXTERNAL_HOSTNAME = os.getenv("RENDER_EXTERNAL_HOSTNAME")
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Application definition
PROJECT_APPS = [
    "apps.blog",
    "apps.category",
    "apps.contacts",
    "apps.courses"
]

THIRD_PARTY_APPS = [
    "corsheaders",
    "rest_framework",
    "ckeditor",
    "ckeditor_uploader",
]

DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

INSTALLED_APPS = DJANGO_APPS + PROJECT_APPS + THIRD_PARTY_APPS

# to create blogs toolbar
CKEDITOR_CONFIGS = {"default": {"toolbar": "full", "autoParagraph": False}}
CKEDITOR_UPLOAD_PATH = "/media/"


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "build")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
DATABASES["default"]["ATOMIC_REQUESTS"] = True

ACTIVE_CAMPAIGN_URL= os.getenv('ACTIVE_CAMPAIGN_URL')
ACTIVE_CAMPAIGN_KEY= os.getenv('ACTIVE_CAMPAIGN_KEY')



if not DEBUG:
    # react frotontend and django
    CORS_ORIGIN_WHITELIST = [
        "https://melonblog.com",
        "https://admin.melonblog.com",
        "https://blog.melonblog.com",
    ]
    CSRF_TRUSTED_ORIGINS = [
        "https://melonblog.com",
        "https://admin.melonblog.com",
        "https://blog.melonblog.com",
    ]
else:
    # react frotontend and django
    CORS_ORIGIN_WHITELIST = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:8000",
    ]
    CSRF_TRUSTED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:8000",
    ]

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
]

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATIC_URL = "/static/"

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"

STATICFILES_DIRS = [os.path.join(BASE_DIR, "build/static")]

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 16,
}


AUTHENTICATION_BACKENDS = ("django.contrib.auth.backends.ModelBackend",)

FILE_UPLOAD_PERMISSIONS = 0o640

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

if not DEBUG:
    DEFAULT_FROM_EMAIL = "Uridium <mail@uridium.network>"
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_HOST = os.getenv("EMAIL_HOST")
    EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
    EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
    EMAIL_PORT = os.getenv("EMAIL_PORT")
    EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS")

    # django-ckeditor will not work with S3 through django-storages without this line in settings.py
    AWS_QUERYSTRING_AUTH = False

    # aws settings
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")

    AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
    AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}
    AWS_DEFAULT_ACL = "public-read"

    # s3 static settings

    STATIC_LOCATION = "static"
    STATIC_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{STATIC_LOCATION}/"
    STATICFILES_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"

    # s3 public media settings

    PUBLIC_MEDIA_LOCATION = "media"
    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/"
    DEFAULT_FILE_STORAGE = "core.storage_backends.MediaStore"
