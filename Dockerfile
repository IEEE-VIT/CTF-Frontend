FROM node:13.12.0-alpine

RUN npm install -g react-scripts
WORKDIR /app
COPY . ./
RUN npm install
RUN GENERATE_SOURCEMAP=false react-scripts build
RUN cp -r /app/build/ /build/
WORKDIR /build
RUN rm -rf /app
RUN npm -g i serve

CMD ["serve", "-p", "80", "-s", "."]
