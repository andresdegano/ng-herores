FROM node:16 AS ui-build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install -g @angular/cli
RUN npm install

# Generate the build of the application
RUN npm run build

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=ui-build /usr/local/app/dist/heroes /usr/share/nginx/html

# Expose port 80
EXPOSE 80
