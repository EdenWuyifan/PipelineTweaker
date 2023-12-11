FROM python:3.11.6

ADD . /flask/
WORKDIR /flask/

RUN pip3 install -e .

EXPOSE 4455
CMD python3 server.py