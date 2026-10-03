FROM node:20-alpine

# Set security labels
LABEL security.hardened="true" \
      security.non-root="true"

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production

COPY . .

# Change ownership to the non-root node user
RUN chown -R node:node /usr/src/app

# Switch to the non-root user
USER node

EXPOSE 80

# Add container healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["npm", "start"]
