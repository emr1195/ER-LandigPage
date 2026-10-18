FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# The VPS serves its own dashboard and API on the same origin.
RUN npm run build

FROM node:22-bookworm-slim
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3001
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node server ./server
COPY --chown=node:node shared ./shared
RUN mkdir uploads && chown node:node uploads
USER node
EXPOSE 3001
CMD ["sh", "-c", "node server/scripts/check-production.js && exec node server/index.js"]
