FROM python:3.9-slim

WORKDIR /app

# Install system dependencies for CadQuery/OCP if needed
# OCP often requires libgl1-mesa-glx libglib2.0-0
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Install dependencies
# Note: Installing cadquery via pip on slim might be tricky due to OCP binary wheels.
# We hope the pip install cadquery works as it did locally (it pulls cadquery-ocp).
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose port
EXPOSE 8000

# Run command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
