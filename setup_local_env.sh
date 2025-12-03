#!/bin/bash

# Create a virtual environment
python3 -m venv venv
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install PyTorch (CPU version for Mac)
pip install torch torchvision torchaudio

# Install DGL (CPU version)
# DGL installation can be tricky. We'll try the standard pip install.
# If it fails, user might need to specify version.
pip install dgl -f https://data.dgl.ai/wheels/repo.html

# Install PyTorch Geometric and dependencies
pip install torch-scatter torch-sparse torch-cluster torch-spline-conv torch-geometric -f https://data.pyg.org/whl/torch-2.0.0+cpu.html

# Install other dependencies
pip install pytorch-lightning==1.7.1 numpy==1.23.5 fairseq tqdm scipy prefetch_generator

# Install backend dependencies
pip install fastapi uvicorn python-multipart cadquery

echo "Setup complete. Activate with 'source venv/bin/activate'"
