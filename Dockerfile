# syntax=docker/dockerfile:1
# Lumio AI — statically served website on Nginx Alpine.
# No build step is required because this is a pure HTML/CSS/JS site.

# Stage 1: gather files (kept lightweight; no compilation needed).
FROM alpine AS gather
RUN mkdir -p /srv/site
COPY . /srv/site

# Stage 2: serve with Nginx Alpine.
FROM nginx:alpine

# Install curl for a lightweight health check probe during container start.
RUN apk add --no-cache curl

# Copy the built site into the default HTML directory.
COPY --from=gather /srv/site /usr/share/nginx/html

# Expose the port the app listens on inside the container (mapped to 8080).
EXPOSE 80

# Bind to 0.0.0.0 so the container accepts connections outside Docker.
CMD ["nginx", "-g", "daemon off;"]
