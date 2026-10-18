"""Create fictional upload illustrations for the recorded demonstration."""
import sys
from pathlib import Path
import video_tools
from PIL import Image, ImageDraw, ImageFont

destination = Path(sys.argv[1])
destination.mkdir(parents=True, exist_ok=True)
for name, title, subtitle, color in [
    ('portada', 'Explorar juntos', 'Una comunidad que crece', '#155e63'),
    ('evento', 'Jornada de exploradores', 'Aprender, compartir y servir', '#2467bd'),
]:
    image = Image.new('RGB', (1200, 800), '#edf2ee')
    draw = ImageDraw.Draw(image)
    draw.ellipse((820, 80, 1030, 290), fill='#f4b393')
    draw.polygon([(0, 560), (330, 210), (650, 560)], fill='#6c9898')
    draw.polygon([(250, 600), (720, 180), (1200, 600)], fill=color)
    draw.polygon([(620, 270), (720, 180), (830, 278), (750, 250), (708, 272), (670, 250)], fill='#fffefa')
    draw.rectangle((0, 580, 1200, 800), fill='#233b3d')
    draw.text((64, 616), title, font=ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 56), fill='#fffefa')
    draw.text((66, 704), subtitle, font=ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 32), fill='#f4b393')
    image.save(destination / (name + '.png'))
