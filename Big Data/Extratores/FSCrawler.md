---
tags:
  - engenharia_de_dados
---
# FSCrawler

This crawler helps to index binary documents such as PDF, Open Office, MS Office.

**Main features**:
- Local file system (or a mounted drive) crawling and index new files, update existing ones and removes old ones.
- Remote file system over SSH/FTP crawling.
- REST interface to let you “upload” your binary documents to elasticsearch.

o FSCrawler utiliza Tika como fundação e armazena os dados extraídos no Elasticsearch.

[Crawler options](https://fscrawler.readthedocs.io/en/latest/user/options.html)

# Integração OCR

Para lidar com imagens contendo texto, é necessário instalar o [Tesseract](https://tesseract-ocr.github.io/tessdoc/).