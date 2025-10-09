FROM --platform=$BUILDPLATFORM node:22 AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build


FROM nginx:alpine3.22

LABEL org.opencontainers.image.authors="NoNamer777"
LABEL org.opencontainers.image.source="https://github.com/dnd-mapp/dma-web-client"
LABEL org.opencontainers.image.licenses=AGPL-3.0
LABEL org.opencontainers.image.title="D&D Mapp - Web client"
LABEL org.opencontainers.image.description="The main web client of the D&D Mapp platform."

COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/dma-web-client/browser /urs/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
