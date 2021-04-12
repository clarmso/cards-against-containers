FROM golang:1.16.3
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN go build -o cards-against-containers-rest-api .
EXPOSE 8080
CMD ["/app/cards-against-containers-rest-api"]
