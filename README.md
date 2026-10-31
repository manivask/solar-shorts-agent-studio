# Orbit Studio — Multi-Agent Shorts Workflow

A polished, dependency-free workflow dashboard for a four-agent, 10-second YouTube Shorts production line.

## The agent handoffs

1. **Scout** researches concise, age-appropriate facts and creates a visual-search brief.
2. **Voice** turns that fact pack into a 9–10 second voiceover and scene beats.
3. **Maker** combines approved media, captions, and narration into a 1080×1920 video.
4. **Guardian** validates duration, format, captions, factual claims, rights, and stages an upload for human approval.

## Run it

Open `index.html` in a browser, or serve the folder with any static web server.

## Add video-title ideas

Edit [`titles.txt`](titles.txt) in any plain-text editor (including Notepad). Put one title on each line; lines that begin with `#` are notes. On opening the dashboard, and whenever **Pick another title** is pressed, Orbit Studio randomly chooses one entry from this file for the next agent run.

## Connect YouTube later

Use [YOUTUBE_SETUP.md](YOUTUBE_SETUP.md) for the one-time Google Cloud and OAuth configuration. Do not commit OAuth secrets to this repository.

## Production integrations to add

The UI is intentionally safe by default: it demonstrates each handoff but does not invent external media, create an account connection, or publish.

To make the workflow run for real, add backend adapters for:

- An LLM/research provider with authoritative sources (e.g., NASA/JPL) and citation storage.
- Licensed visual-video provider or a rights-cleared asset library.
- Text-to-speech and a renderer (FFmpeg/Remotion) for the 9:16 MP4.
- Google OAuth configured in a Google Cloud project, with **YouTube Data API v3** enabled. A Google email address alone cannot authorize uploads.

Keep the final `videos.insert` call behind a user approval gate. The Guardian should provide the final caption, title, description, thumbnail and copyright checklist before upload.
