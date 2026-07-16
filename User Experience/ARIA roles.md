# ARIA roles

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