FROM golang:1.14.4
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN go build -o card-against-containers-rest-api .
EXPOSE 8080
CMD ["/app/card-against-containers-rest-api"]