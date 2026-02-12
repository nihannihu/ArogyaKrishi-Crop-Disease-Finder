# WSGI entry point for Gunicorn
from render_optimized_ai_server import app

if __name__ == "__main__":
    app.run()