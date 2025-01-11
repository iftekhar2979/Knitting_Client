# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code (excluding ignored files)
COPY . .

# Expose the development port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=development

# Start the Next.js development server
CMD ["npm", "run", "dev"]
