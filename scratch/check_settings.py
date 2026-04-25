import sys
import os
sys.path.append(os.path.join(os.getcwd(), "backend"))
from app.core.config import settings
print(f"Project Name: {settings.PROJECT_NAME}")
try:
    print(f"Gemini Key: {settings.GEMINI_API_KEY}")
    print("✅ GEMINI_API_KEY exists in settings")
except AttributeError:
    print("❌ GEMINI_API_KEY MISSING in settings")
