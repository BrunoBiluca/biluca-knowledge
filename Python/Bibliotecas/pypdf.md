---
categoria: biblioteca
---
# pypdf

antigo PyPDF2

> [!info] O que é?
> PDF library capable of splitting, [merging](https://pypdf.readthedocs.io/en/stable/user/merging-pdfs.html), [cropping, and transforming](https://pypdf.readthedocs.io/en/stable/user/cropping-and-transforming.html) the pages of PDF files
> Continua sendo atualizado em 2024.
> 
> - [GitHub - py-pdf/pypdf](https://github.com/py-pdf/pypdf)
> - [pypdf 4.2.0 documentation](https://pypdf.readthedocs.io/en/stable/)


> [!warning] Strict = true
> É possível configurar o PdfReader em relação a robustez do parser, caso configurado como ligado será lançada uma exceção caso o arquivo PDF não siga as especificações.

O `pypdf` permite ler também os [metadados](https://pypdf.readthedocs.io/en/stable/user/metadata.html) relacionados ao documento.

### Extração de textos

A [Extração de texto](https://pypdf.readthedocs.io/en/stable/user/extract-text.html) pode ser feita levando em consideração vários argumentos do PDF.

- Texto
- Matrix do usuário
- Matrix TM
- Dicionário de fonte
- Tamanho da fonte

A partir da matrix de usuário é possível conferir a posição do fragmento de texto, dessa forma podemos ignorar partes do texto ou extrair fragmentos do PDF pela sua posição.

### Extraindo texto de objetos no s3 apenas em memória

Várias vezes não queremos persistir os arquivos em disco para fazer sua leitura, para isso precisamos baixar o arquivo em seu formato binário e ler como `BytesIO.

```python
  
import boto3
from pypdf import PdfReader
from io import BytesIO

  
session = boto3.Session(
    aws_access_key_id=...,
    aws_secret_access_key=...,
    aws_session_token=...,
    region_name=...
)

s3 = session.client('s3')
resposta = s3.get_object(Bucket=bucket, Key=caminho_relatorio)
conteúdo = resposta['Body'].read()
reader = PdfReader(BytesIO(conteúdo))

print(len(reader.pages))
print(reader.pages[0].extract_text())
```

