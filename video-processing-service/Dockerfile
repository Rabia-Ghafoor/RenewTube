# Use an official Node runtime as a parent image
# Set the working directory in the container to /app
# Install ffmpeg in the container
# Copy package.json and package-lock.json into the working directory
# Install any needed packages specified in package.json
# Copy app source inside the docker image
# Make port 3000 available outside this container
# Define the command to run your app using CMD (only one CMD allowed)

FROM node:18
WORKDIR /app
RUN apt-get update && apt-get install -y ffmpeg
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]





