# Use an official Node.js runtime as a parent image
FROM node:20.18.0

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies, including Vite
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the application (start the Vite dev server)
CMD ["npm", "run", "dev"]
