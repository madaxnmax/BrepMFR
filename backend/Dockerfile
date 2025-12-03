FROM continuumio/miniconda3

WORKDIR /app

# Install CadQuery via conda
RUN conda install -c cadquery -c conda-forge cadquery=2.2.0

COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expose port
EXPOSE 8000

# Run command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
