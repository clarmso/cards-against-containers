FROM golang:1.14.4
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN ls -l
RUN pwd
RUN echo $GOPATH
RUN go build -o card-against-containers-rest-api .
CMD ["./card-against-containers-rest-api"]