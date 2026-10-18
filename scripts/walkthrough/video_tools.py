"""Local video production tools; never imported by the application."""
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOOLS = Path(os.environ.get('WALKTHROUGH_PYTHON_TOOLS', ROOT / '.tmp/walkthrough-tools.local'))
sys.path.insert(0, str(TOOLS))
