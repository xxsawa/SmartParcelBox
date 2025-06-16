
ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.

WORKDIR /usr/src/app
ENV REQUEST_LOGGING=true

# Copy the rest of the source files into the image.
COPY . .

RUN npm install
RUN npm run build
# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "run", "start"]