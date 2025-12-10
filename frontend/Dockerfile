# Build Stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
# We will install dependencies in the container for the build
# RUN npm install
# COPY . .
# RUN npm run build

# Production Stage
FROM nginx:alpine as production-stage
# For now, just a placeholder as we will mount volumes in dev. 
# In a real prod Dockerfile, we would copy dist:
# COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
