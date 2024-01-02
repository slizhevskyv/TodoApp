FROM node
WORKDIR /app
COPY . /app
RUN npm i
RUN npm run build
CMD ["npm", "start"]
