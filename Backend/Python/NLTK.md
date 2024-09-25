
# Natural language Toolkit

[Livro: Natural Language Processing with Python](https://www.nltk.org/book/)

Principais conceitos

- Text: é uma sequência de palavras e pontuações (pode ser o resultado do `word_tokenize`).
- 

# Funcionalidades
## Tags

> [!warning] Compatibilidade
> Apenas as línguas são compatíveis: `english` e `russian`.


## Tokenizer

Produz uma lista de palavras e pontuações.

- `word_tokenize`: divide a string em palavras
- `sent_tokenize`: divide a string em sentenças

### Concordância

Mostra a palavra procurada junto com algum contexto.

```python
from nltk.book import *
text.concordance("word")
# Irá trazer as ocorrências da palavra "word" e algum contexto
```

### Collocation (arranjo)

É uma sequência de palavras que ocorrem juntas frequentemente. Uma característica desse tipo de arranjo de palavras é a dificuldade de alterar as palavras por similares e manter o sentido, por exemplo vinho tinto é um arranjo, assim fazer as alterações "vinho marrom" ou "cerveja tinto" não faz muito sentido.

Para obter arranjos primeiramente extraímos dos textos combinações de duas palavras chamadas de bigrams.

```python
list(bigrams(['more', 'is', 'said', 'than', 'done']))
# [('more', 'is'), ('is', 'said'), ('said', 'than'), ('than', 'done')]
```
# Processando texto puro

### Identificando uma seção

```python
raw.find("PART I")
# 5338
raw.rfind("End of Project Gutenberg's Crime")
# 1157743
raw = raw[5338:1157743]
raw.find("PART I")
# 0
```

Estatísticas para análise do texto

- Distribuição de frequências: quantidade que cada palavra aparece no texto

## Stemmers

São operadores que definem os radicais das palavras. Removendo partes como sufixos das palavras podemos analisar melhor o texto.

Podemos desenvolver Steammers a partir de expressões regulares como

```python
def stem_english(word):
	return re.findall(r'^(.*?)(ing|ly|ed|ious|ies|ive|es|s|ment)$', word)
```

A biblioteca NLTK também apresenta vários stemmer nativos que podem ser utilizados. Sua utilização irá depender bastante do tipo de texto que está sendo utilizado. Por exemplo o Stemmer Porter é uma boa opção para indexar texto que suportam pesquisas por formas alternativas de palavras.

```python
porter = nltk.PorterStemmer()
lancaster = nltk.LancasterStemmer()
[porter.stem(t) for t in tokens]
# ['denni', ':', 'listen', ',', 'strang', 'women', 'lie', 'in', 'pond', 'distribut', 'sword', 'is', 'no', 'basi', 'for', 'a', 'system', 'of', 'govern', '.', 'suprem', 'execut', 'power', 'deriv', 'from', 'a', 'mandat', 'from', 'the', 'mass', ',', 'not', 'from', 'some', 'farcic', 'aquat', 'ceremoni', '.']
[lancaster.stem(t) for t in tokens]
# ['den', ':', 'list', ',', 'strange', 'wom', 'lying', 'in', 'pond', 'distribut', 'sword', 'is', 'no', 'bas', 'for', 'a', 'system', 'of', 'govern', '.', 'suprem', 'execut', 'pow', 'der', 'from', 'a', 'mand', 'from', 'the', 'mass', ',', 'not', 'from', 'som', 'farc', 'aqu', 'ceremony', '.']
```

### Exemplos de Stemmers

- PorterStemmer
- LancasterStemmer
- WordNetLemmatizer

