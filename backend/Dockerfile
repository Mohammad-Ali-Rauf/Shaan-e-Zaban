FROM golang:alpine3.22

WORKDIR /app

COPY . .

RUN go mod tidy

CMD ["go", "run", "main.go"]