FROM node:alpine
WORKDIR /app
# Copy certificates from mounted volume to the app's certificates directory
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
#RUN npm ci --only=production
RUN npm i
# Uncomment the next line if you want to set the NODE_ENV to production
# ENV NODE_ENV production
EXPOSE 8080
CMD ["npm", "run", "start"]