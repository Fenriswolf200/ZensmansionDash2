FROM node:20-alpine

WORKDIR /app

# Copy just the package files first
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy everything else
COPY app/ .

EXPOSE 5173

ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true

# Run without any volume mounts
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]