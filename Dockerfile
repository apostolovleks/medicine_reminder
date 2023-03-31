FROM python:3.10.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN python -m pip install --upgrade pip
RUN apt update & apt upgrade

COPY . /usr/medicine_back
WORKDIR /usr/medicine_back
RUN pip install -r requirements.txt