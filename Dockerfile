# Base on offical Node.js Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Generate types from prisma schema
RUN npx prisma generate

# Add proper permissions
RUN mkdir node_modules/.cache && chown node:node node_modules/.cache

# build app
RUN npm run build

# Remove installed dev dependencies
RUN npm prune

# Expose the listening port
EXPOSE 3000/tcp

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD [ "npm", "run", "start:migrate:prod" ]
