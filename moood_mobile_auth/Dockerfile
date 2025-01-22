#e an official OpenJDK runtime as a base image
FROM openjdk:11-jdk-slim

# Install Python and necessary dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt  /app/
COPY main.py  /app/

RUN pip install -r requirements.txt

COPY KmcCrypto.jar /app/
COPY libKmcCryptoJNI.so /app/

ENV LD_LIBRARY_PATH=/app

EXPOSE 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
