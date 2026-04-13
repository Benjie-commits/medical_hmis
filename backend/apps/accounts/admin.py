from django.contrib import admin
from .models import *

# Register all models automatically
for model in [m for m in globals().values() if hasattr(m, '_meta')]:
    try:
        admin.site.register(model)
    except:
        pass