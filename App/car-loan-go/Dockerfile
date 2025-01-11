# Etapa de construcción
FROM golang:1.23.2-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY go.mod go.sum ./

# Descargar dependencias
RUN go mod download

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Etapa final
FROM alpine:latest

WORKDIR /app

# Copiar el ejecutable desde la etapa de construcción
COPY --from=builder /app/main .
COPY --from=builder /app/index.html .

# Crear directorio config y archivo de credenciales
RUN mkdir -p /app/config
ARG FIREBASE_CREDENTIALS
RUN echo "$FIREBASE_CREDENTIALS" > /app/config/firebase-credentials.json

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["./main"]