from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import tempfile
from .processing import process_step_file

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "BrepMFR API is running"}

@app.post("/upload")
async def upload_step(file: UploadFile = File(...)):
    if not file.filename.endswith(('.step', '.stp')):
        raise HTTPException(status_code=400, detail="Invalid file type. Only .step or .stp files are allowed.")

    # Create a temporary file to save the uploaded content
    with tempfile.NamedTemporaryFile(delete=False, suffix=".step") as tmp:
        shutil.copyfileobj(file.file, tmp)
        tmp_path = tmp.name

    try:
        result = process_step_file(tmp_path)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up the temp file
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
