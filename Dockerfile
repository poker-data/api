FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
#RUN npm ci --only=production
RUN npm i
# Set the env to "production"
#ENV NODE_ENV production
EXPOSE 8080
CMD ["npm", "run", "start"]