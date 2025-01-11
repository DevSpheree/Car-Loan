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

# Crear directorio config
RUN mkdir -p /app/config

# No escribimos el archivo aquí, lo haremos en tiempo de ejecución
ENV FIREBASE_CREDENTIALS=""

EXPOSE ${PORT}

# Modificar el comando de inicio para escribir las credenciales antes de ejecutar
CMD sh -c 'echo "$FIREBASE_CREDENTIALS" > /app/config/firebase-credentials.json && ./main'