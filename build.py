from pathlib import Path
import shutil


def build():
    source_dir = Path(__file__).resolve().parent
    dist_dir = source_dir / "dist"
    dist_dir.mkdir(parents=True, exist_ok=True)

    print(">>> Building single-page Blacklist Tech site...")

    for item in ("index.html", "site-assets"):
        source_path = source_dir / item
        destination_path = dist_dir / item

        if not source_path.exists():
            raise FileNotFoundError(f"Required production item is missing: {source_path}")

        if source_path.is_dir():
            shutil.copytree(source_path, destination_path, dirs_exist_ok=True)
        else:
            shutil.copy2(source_path, destination_path)

        print(f"Copied {item}")

    print(f">>> Build complete: {dist_dir}")


if __name__ == "__main__":
    build()
