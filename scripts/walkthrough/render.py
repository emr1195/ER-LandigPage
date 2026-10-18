"""Render the real ER capture, Spanish captions and chronological review sheets.

Tools are local to the ignored recording directory; no runtime dependency changes.
"""
import json
import math
import subprocess
import sys
from pathlib import Path

from video_tools import ROOT
import hashlib
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FONT = "C:/Windows/Fonts/segoeui.ttf"
BOLD = "C:/Windows/Fonts/segoeuib.ttf"
WIDTH, HEIGHT, FPS = 1920, 1080, 25


def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else FONT, size)


def metadata(file):
    frames = imageio_ffmpeg.read_frames(str(file))
    info = next(frames)
    frames.close()
    return info


def run(arguments):
    result = subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-y", *map(str, arguments)], capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr[-6000:])


def synchronization_offset(file, wall_time):
    # A brief blue marker exists only in the pre-roll, outside the final edit.
    # Locate its first captured frame rather than estimating from close-time padding.
    result = subprocess.run([FFMPEG, "-hide_banner", "-loglevel", "error", "-i", str(file), "-t", "12", "-vf", "fps=25,crop=8:8:0:0", "-pix_fmt", "rgb24", "-f", "rawvideo", "pipe:1"], capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode(errors="replace"))
    size = 8 * 8 * 3
    for frame in range(len(result.stdout) // size):
        pixels = result.stdout[frame * size:(frame + 1) * size]
        r, g, b = (sum(pixels[channel::3]) / 64 for channel in range(3))
        if r < 40 and g < 40 and b > 200:
            return wall_time - frame / FPS
    raise ValueError("No synchronization marker found in the pre-roll.")


def wrapped(draw, text, face, width):
    lines = []
    current = ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if current and draw.textlength(candidate, font=face) > width:
            lines.append(current)
            current = word
        else:
            current = candidate
    return [*lines, current]


def overlay(file, scene, caption, index, count):
    canvas = Image.new("RGBA", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(canvas)
    draw.text((80, 7), "EXPLORADORES DEL REY", font=font(20, True), fill="#F4B393")
    title = scene["title"]
    title_width = draw.textlength(title, font=font(19))
    draw.text((1840 - title_width, 7), title, font=font(19), fill="#F3F5F0")
    if scene["source"] == "desktop":
        draw.rectangle((191, 39, 1728, 850), outline="#547074", width=1)
    else:
        draw.rounded_rectangle((1194, 33, 1581, 857), radius=22, outline="#789394", width=2)
        draw.text((160, 238), "Tu comunidad,", font=font(60, True), fill="#F3F5F0")
        draw.text((160, 318), "en cada pantalla.", font=font(60, True), fill="#F4B393")
        for y, text in [(466, "Navegación clara"), (534, "Edición y vista previa"), (602, "Apariencia por cuenta")]:
            draw.ellipse((164, y+12, 172, y+20), fill="#F4B393")
            draw.text((198, y), text, font=font(29), fill="#CAD9D7")
    face = font(28)
    lines = wrapped(draw, caption, face, 1700)
    if len(lines) > 2:
        raise ValueError(f"Caption is too long: {caption}")
    # Keep 160px below the captions for native controls and their gradient.
    y = 856 + (64 - len(lines)*32)/2
    for line in lines:
        w = draw.textlength(line, font=face)
        draw.text(((WIDTH-w)/2, y), line, font=face, fill="#F3F5F0")
        y += 32
    draw.rectangle((0, 1077, WIDTH, 1079), fill="#29474C")
    draw.rectangle((0, 1077, round(WIDTH*(index+1)/count), 1079), fill="#F4B393")
    canvas.save(file)

def timestamp(seconds):
    milliseconds = round(seconds * 1000)
    hours, milliseconds = divmod(milliseconds, 3600000)
    minutes, milliseconds = divmod(milliseconds, 60000)
    whole, milliseconds = divmod(milliseconds, 1000)
    return f"{hours:02}:{minutes:02}:{whole:02}.{milliseconds:03}"


def render(take):
    manifest = json.loads((take / "manifest.json").read_text(encoding="utf-8"))
    if manifest["rehearsal"]:
        raise ValueError("Render an actual recorded take, not a rehearsal.")
    working = take / "edit"
    working.mkdir(exist_ok=True)
    destination = ROOT / "public/walkthrough"
    destination.mkdir(parents=True, exist_ok=True)
    offsets = {}
    for name, source in manifest["sources"].items():
        info = metadata(take / source["file"])
        offsets[name] = synchronization_offset(take / source["file"], source["syncWallTime"])
        print(f"{name}: {info['duration']:.2f}s, wall offset {offsets[name]:.3f}s", flush=True)
    chapters = []
    vtt = ["WEBVTT", ""]
    elapsed = 0
    files = []
    for index, scene in enumerate(manifest["scenes"]):
        seconds = math.ceil(scene["rawSeconds"] * FPS) / FPS
        start = max(0, scene["start"] - offsets[scene["source"]])
        chapter = {"id": scene["id"], "title": scene["title"], "start": round(elapsed, 3), "duration": seconds}
        chapters.append(chapter)
        overlays = []
        for number, caption in enumerate(scene["captions"]):
            image = working / f"{index:02}-{number}.png"
            overlay(image, scene, caption, index, len(manifest["scenes"]))
            overlays.append(image)
            a = elapsed + seconds * number / len(scene["captions"])
            b = elapsed + seconds * (number + 1) / len(scene["captions"])
            vtt.extend([f"{timestamp(a)} --> {timestamp(b)}", caption, ""])
        output = working / f"{index:02}-{scene['id']}.mp4"
        files.append(output)
        arguments = ["-ss", f"{start:.3f}", "-i", take / manifest["sources"][scene["source"]]["file"]]
        for image in overlays:
            arguments += ["-loop", "1", "-framerate", FPS, "-i", image]
        if scene["source"] == "mobile":
            app = "scale=374:810:flags=lanczos"
            x, y = 1200, 40
        elif scene.get("camera"):
            camera = scene["camera"]
            frames = max(1, round(seconds*FPS)-1)
            # A brief camera move over real footage; it returns to the full frame.
            app = (
                f"zoompan=z='1+0.12*sin(PI*on/{frames})':"
                f"x='min(iw-iw/zoom,max(0,iw*{camera['x']}-iw/zoom/2))':"
                f"y='min(ih-ih/zoom,max(0,ih*{camera['y']}-ih/zoom/2))':"
                f"d=1:s=1536x810:fps={FPS}"
            )
            x, y = 192, 40
        else:
            app = "scale=1536:810:flags=lanczos"
            x, y = 192, 40
        filters = [f"[0:v]trim=duration={seconds},setpts=PTS-STARTPTS,fps={FPS},tpad=stop_mode=clone:stop_duration=0.12,{app},setsar=1[app]", f"color=c=0x102B30:s={WIDTH}x{HEIGHT}:r={FPS}:d={seconds}[bg]", f"[bg][app]overlay={x}:{y}:shortest=1[base]"]
        previous = "base"
        for number in range(len(overlays)):
            a = seconds * number / len(overlays)
            b = seconds * (number + 1) / len(overlays)
            label = f"caption{number}"
            filters.append(f"[{previous}][{number + 1}:v]overlay=0:0:enable='gte(t,{a})*lt(t,{b})':shortest=1[{label}]")
            previous = label
        arguments += ["-filter_complex_threads", "2", "-filter_complex", ";".join(filters), "-map", f"[{previous}]", "-t", seconds, "-an", "-r", FPS, "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", output]
        print(f"Rendering {index + 1}/{len(manifest['scenes'])}: {scene['id']} ({seconds:.2f}s)", flush=True)
        run(arguments)
        elapsed += seconds
    concatenation = working / "shots.txt"
    concatenation.write_text("\n".join(f"file '{file.as_posix()}'" for file in files), encoding="utf-8")
    final = destination / "exploradores-walkthrough.mp4"
    run(["-f", "concat", "-safe", "0", "-i", concatenation, "-c", "copy", "-movflags", "+faststart", final])
    (destination / "exploradores-walkthrough.vtt").write_text("\n".join(vtt), encoding="utf-8")
    poster = destination / "poster.jpg"
    run(["-ss", str(max(0, chapters[1]['start'] - 2)), "-i", final, "-frames:v", "1", "-q:v", "2", poster])
    # Decode the full file to catch truncated or corrupt frames.
    run(["-i", final, "-f", "null", "-"])
    info = metadata(final)
    report = {"applicationCommit": manifest["applicationCommit"], "origin": manifest["origin"], "duration": info["duration"], "size": info["size"], "fps": info["fps"], "bytes": final.stat().st_size, "audio": "none; Spanish captions are embedded", "checks": manifest["checks"], "chapters": chapters, "fullDecode": "passed", "files": ["public/walkthrough/exploradores-walkthrough.mp4", "public/walkthrough/exploradores-walkthrough.vtt", "public/walkthrough/poster.jpg"]}
    (take / "render-report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    # Every two seconds, in chronological order, for review of the entire edit.
    review = take / "review"
    review.mkdir(exist_ok=True)
    run(["-i", final, "-vf", "fps=1/2,scale=480:270", review / "frame-%03d.jpg"])
    frames = sorted(review.glob("frame-*.jpg"))
    for batch in range(math.ceil(len(frames) / 12)):
        sheet = Image.new("RGB", (1920, 900), "#102B30")
        draw = ImageDraw.Draw(sheet)
        for position, file in enumerate(frames[batch * 12:(batch + 1) * 12]):
            row, col = divmod(position, 4)
            x, y = col * 480, row * 300
            with Image.open(file) as frame:
                sheet.paste(frame, (x, y))
            time = (batch * 12 + position) * 2
            draw.text((x + 10, y + 273), timestamp(time)[:8], font=font(17), fill="#EDF0FB")
        sheet.save(review / f"sheet-{batch + 1:02}.jpg", quality=94)
    report["sha256"] = hashlib.sha256(final.read_bytes()).hexdigest()
    report["provisional"] = manifest.get("pilot", False)
    (take / "render-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    qa = ROOT / ".scratch/dashboard-walkthrough/qa"
    qa.mkdir(parents=True, exist_ok=True)
    (qa / ("pilot-render.json" if manifest.get("pilot") else "render.json")).write_text(json.dumps(report, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    content = {
        "duration": round(elapsed, 2),
        "durationLabel": f"{int(elapsed)//60}:{int(elapsed)%60:02}",
        "provisional": manifest.get("pilot", False),
        "chapters": [{**chapter, "captions": manifest["scenes"][i]["captions"]} for i,chapter in enumerate(chapters)]
    }
    content_path = ROOT / "src/walkthrough/content.json"
    content_path.parent.mkdir(parents=True, exist_ok=True)
    content_path.write_text(json.dumps(content, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    transcript = ["# Recorrido del dashboard: transcripción", "",
                  f"Duración: {content['durationLabel']}. Español, sin audio. Datos ficticios de demostración.", "",
                  "[Video MP4](../public/walkthrough/exploradores-walkthrough.mp4) · "
                  "[Reproductor local](http://localhost:3002/walkthrough)", ""]
    for chapter in content["chapters"]:
        start = chapter["start"]
        transcript.extend([f"## {int(start)//60}:{int(start)%60:02} — {chapter['title']}", ""])
        for caption in chapter["captions"]:
            transcript.extend([caption, ""])
    (ROOT / "docs/walkthrough-transcripcion.md").write_text("\n".join(transcript), encoding="utf-8")
    print(json.dumps(report, indent=2), flush=True)


if __name__ == "__main__":
    render(Path(sys.argv[1]).resolve())
