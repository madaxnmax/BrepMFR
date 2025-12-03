FROM cadquery/cadquery:2.2.0

WORKDIR /app

COPY requirements.txt .

# Install dependencies
# CadQuery image has conda environment. We install our extra packages there.
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose port
EXPOSE 8000

# Run command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
