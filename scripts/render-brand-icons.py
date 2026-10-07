#!/usr/bin/env python3
"""Render the original SVG with macOS Quick Look; write local app sizes.

Requires macOS qlmanage and Pillow. No remote images or fonts are fetched.
Quick Look places SVG transparency on white. Recover only the rounded frame's
edge alpha against that known background; foreground geometry is untouched.
"""
from pathlib import Path
import math
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from PIL import Image

root = Path(__file__).resolve().parent.parent
source = root / 'assets/favicon.svg'
frame = ET.parse(source).getroot().find('{http://www.w3.org/2000/svg}rect')
background = tuple(bytes.fromhex(frame.attrib['fill'][1:]))
with tempfile.TemporaryDirectory(prefix='dotapk-icons-') as temporary:
    subprocess.run(['qlmanage', '-t', '-s', '512', '-o', temporary, str(source)],
                   check=True, stdout=subprocess.DEVNULL)
    image = Image.open(Path(temporary) / 'favicon.svg.png').convert('RGBA')
    assert image.size == (512, 512)
    scale = 512 / 64
    low = float(frame.attrib['x']) * scale
    high = low + float(frame.attrib['width']) * scale
    radius = float(frame.attrib['rx']) * scale
    pixels = image.load()
    for y in range(512):
        for x in range(512):
            # Only the rounded perimeter can contain composited transparency.
            cx = max(low + radius, min(high - radius, x + .5))
            cy = max(low + radius, min(high - radius, y + .5))
            perimeter = (x < low + 2 or y < low + 2 or x > high - 2 or
                         y > high - 2 or math.hypot(x + .5 - cx, y + .5 - cy) > radius - 2)
            if perimeter:
                rgb = pixels[x, y][:3]
                alpha = round(255 * sum((255 - v) / (255 - b)
                                       for v, b in zip(rgb, background)) / 3)
                pixels[x, y] = (*background, max(0, min(255, alpha)))
    assets = root / 'assets'
    for size in (16, 32):
        image.resize((size, size), Image.Resampling.LANCZOS).save(assets / f'favicon-{size}.png')
    image.save(assets / 'favicon.ico', sizes=[(16, 16), (32, 32)])
    opaque = Image.new('RGBA', image.size, (*background, 255))
    opaque.alpha_composite(image)
    for size in (180, 192, 512):
        opaque.resize((size, size), Image.Resampling.LANCZOS).convert('RGB').save(assets / f'app-icon-{size}.png')
    maskable = Image.new('RGBA', (512, 512), (*background, 255))
    maskable.alpha_composite(image.resize((384, 384), Image.Resampling.LANCZOS), (64, 64))
    maskable.convert('RGB').save(assets / 'app-icon-maskable-512.png')
print('Rendered original SVG: favicon16/32/ICO, app180/192/512, maskable512')
