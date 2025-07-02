# ASSC-2025 Program Explorer

This repository contains a simple single-page application to browse ASSC 2025 sessions. The app loads schedule data from `program.json` and lets you filter by day, session type and session title.

## Usage

Open `index.html` in any modern web browser. No build step is needed; all files are static.

The repository includes sample data in `program.json`. To fetch the real program directly from the ASSC website (if your environment allows outgoing requests) run:

```bash
node fetchProgram.js
```

The script downloads the program page, parses the sessions and writes `program.json`. If the network request fails you can still edit `program.json` manually.
