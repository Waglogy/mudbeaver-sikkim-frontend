FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
# The /api proxy target is baked into the build by next.config.mjs rewrites
ARG BACKEND_URL=http://mudbeaver-backend:4000
ARG SITE_URL=https://mudbeaversikkim.in
ENV BACKEND_URL=$BACKEND_URL \
    SITE_URL=$SITE_URL \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ARG BACKEND_URL=http://mudbeaver-backend:4000
ARG SITE_URL=https://mudbeaversikkim.in
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    BACKEND_URL=$BACKEND_URL \
    SITE_URL=$SITE_URL
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
