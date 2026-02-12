# Gunicorn configuration for Render.com deployment
bind = "0.0.0.0:8000"
workers = 1
threads = 1
timeout = 120
keepalive = 5
max_requests = 1000
max_requests_jitter = 100
preload_app = True
worker_class = "sync"
worker_connections = 1000