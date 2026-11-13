# Lumio AI — Landing Page

Responsive static landing page for a local AI services business, built with
vanilla HTML, CSS, and JavaScript (no framework).

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: hero, services, workflow, why-us, testimonials, contact, footer |
| `css/styles.css` | All styling (mobile-first, CSS variables, responsive breakpoints) |
| `js/script.js` | Vanilla JS: mobile menu, scroll effects, reveal animation, form feedback |
| `Dockerfile` | Builds a static site with `nginx:alpine` |
| `docker-compose.yml` | Runs the site on host port `8080` |
| `.dockerignore` | Excludes files from the Docker build context |
| `README.md` | This file |

## Run locally (no Docker)

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Run with Docker

```bash
# Build and start
docker compose up --build

# Visit http://localhost:8080
```

Stop with `Ctrl+C`, then `docker compose down`.

## Checks

```bash
# JavaScript syntax
node --check js/script.js

# Docker configuration
docker build -t lumio-ai-web .
```

## Notes

- No API keys or secrets are stored in the repository. The `docker-compose.yml`
  only contains non-secret environment values (timezone).
