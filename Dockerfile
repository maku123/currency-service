# Use Node 24 image
FROM node:24-alpine

# Create app directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "dist/main.js"]