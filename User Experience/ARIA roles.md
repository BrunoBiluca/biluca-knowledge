# ARIA roles

## Rotulando elementos

Elementos podem ser definidos e rotulados para melhor o entendimento de suas funcionalidades e reduzir confusão para aqueles navegando com tecnologias assistivas. **Os rótulos servem para descrever o propósito do elemento.**

> [!tip] **Os rótulos devem ser concisos, descritivos e transmitir o conteúdo e o contexto do elemento.**

**Elementos visuais** que precisam de rótulos

- Ícones ou botões interativos sem texto visível ou sem contexto suficiente no texto (por exemplo, um botão de edição com um ícone de lápis)
- Imagens interativas
- Dicas visuais (incluindo barras de progresso e tratamento de erros)
- Ícones significativos (como ícones de status)
- Imagens significativas (por exemplo, diagramas, fotos substantivas e ilustrações)
- Ícones e Imagens que não melhoram a experiência para um usuário deficiente visual devem ser marcadas como decorativas para serem ignoradas pelo leitores de tela

**Elementos de texto** precisam de rótulos para adicionar contexto adicional

- Links genéricos (por exemplo, "Saiba mais")
- Botões com texto genérico (por exemplo, "Salvar" quando há vários desses botões em uma página)

**Elementos que não precisam de rótulos**

- Texto de interface do usuário não interativo, pois isso será lido automaticamente pelo leitor de tela
- Botões com texto suficiente (por exemplo, "Download image")

> [!warning] Não inclua o nome do elemento em rótulos
> Não use um o papel do elemento (por exemplo, botão ou menu) no rótulo. Este identificador é adicionado automaticamente quando o elemento é atribuído a sua função adequada, normalmente por um desenvolvedor.
> Por exemplo, o rótulo **botão de favoritos** será lido como **botão botão de favoritos**.

## Navegação

The eight landmark roles in the W3C ARIA guidelines include:

1. **Navigation**: Contains lists of navigation links (there can be multiple, in which case you should differentiate in label)
2. **Search**: A search field
3. **Main**: The main content area as defined by UX. There should be only one.
4. **Banner**: Typically the header; content repeated from page to page, often contains navigation and toolbars. There should be only one.
5. **Complementary**: A sidebar or aside to main content that can stand alone without the main content
6. **Contentinfo**: Typically the footer; contains information describing the site and its content (for example,  copyright). There should be only one.
7. **Region**: Content regions are important content blocks. They can be nested inside the “main” landmark. Regions should be labeled with names that make the purpose of that region clear. 
8. **Form**: Takes and stores user info.

Add **clear and specific labels** to any landmark roles that appear multiple times (regions or navigation typically). This will help users differentiate information. 

Labels should be added to **all regions**, as well as any landmark where a label will enhance meaning. For example, explaining the contents or purpose of a sidebar. 

**Don't repeat the landmark role within a label**.