import os
import random
import argparse
from pathlib import Path

def generate_splits(dataset_path):
    path = Path(dataset_path)
    if not path.exists():
        print(f"Error: Path {path} does not exist.")
        return

    print(f"Scanning {path} for .bin files...")
    # Find all .bin files
    files = [f.stem for f in path.glob("*.bin")]
    
    if not files:
        print("No .bin files found!")
        return

    print(f"Found {len(files)} files.")
    
    # Shuffle
    random.shuffle(files)
    
    # Split 80/10/10
    n = len(files)
    n_train = int(n * 0.8)
    n_val = int(n * 0.1)
    
    train_files = files[:n_train]
    val_files = files[n_train:n_train+n_val]
    test_files = files[n_train+n_val:]
    
    print(f"Splits: Train={len(train_files)}, Val={len(val_files)}, Test={len(test_files)}")
    
    # Write files
    with open(path / "train.txt", "w") as f:
        f.write("\n".join(train_files))
        
    with open(path / "val.txt", "w") as f:
        f.write("\n".join(val_files))
        
    with open(path / "test.txt", "w") as f:
        f.write("\n".join(test_files))
        
    print("Split files created successfully in dataset directory.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("dataset_path", help="Path to the dataset directory containing .bin files")
    args = parser.parse_args()
    
    generate_splits(args.dataset_path)
