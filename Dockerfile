FROM node:12 as react-build
WORKDIR /app
COPY / ./
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
