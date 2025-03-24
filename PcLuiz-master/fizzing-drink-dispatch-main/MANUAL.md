# Manual de Alterações do Projeto

Este documento explica como fazer alterações manuais no projeto da Distribuidora Dois Irmãos.

## 1. Como Adicionar ou Remover Abas de Categorias

Para adicionar ou remover abas de categorias, você precisa modificar o arquivo `src/components/Navbar.tsx`:

1. Localize o array `categories` no início do arquivo:
```typescript
const categories = [
  { id: "todos", label: "Todos" },
  { id: "refrigerantes", label: "Refrigerantes" },
  // ... outras categorias
];
```

2. Para adicionar uma nova categoria:
   - Adicione um novo objeto ao array com `id` e `label`
   - Exemplo: `{ id: "bebidas-alcoolicas", label: "Bebidas Alcoólicas" }`

3. Para remover uma categoria:
   - Simplesmente delete o objeto correspondente do array

## 2. Como Adicionar ou Remover Produtos

Para gerenciar produtos, você precisa editar o arquivo `src/data/products.ts`:

1. Os produtos são organizados por categoria em objetos separados:
```typescript
export const products = {
  "refrigerantes": [
    {
      name: "Nome do Produto",
      description: "Descrição do Produto",
      price: 10.99,
      image: "URL_DA_IMAGEM",
      discount: 10 // opcional
    },
    // ... outros produtos
  ],
  // ... outras categorias
};
```

2. Para adicionar um novo produto:
   - Localize a categoria correta
   - Adicione um novo objeto com as propriedades necessárias
   - Certifique-se de incluir todas as propriedades obrigatórias (name, description, price, image)

3. Para remover um produto:
   - Localize o produto na categoria correspondente
   - Delete o objeto inteiro do array

## 3. Como Adicionar Novas Imagens

Existem duas maneiras de adicionar imagens ao projeto:

### 3.1. Usando URLs Externas (recomendado)

1. Faça upload da imagem para um serviço como ImgBB ou similar
2. Copie a URL direta da imagem
3. Use a URL no campo `image` do produto

### 3.2. Usando Imagens Locais

1. Adicione a imagem na pasta `public/`
2. Use o caminho relativo no campo `image` do produto
   - Exemplo: Se a imagem está em `public/images/produto.png`, use `/images/produto.png`

## 4. Como Atualizar Preços e Informações

1. Abra o arquivo `src/data/products.ts`
2. Localize o produto que deseja atualizar
3. Modifique os valores necessários:
   - `price`: para alterar o preço
   - `description`: para alterar a descrição
   - `discount`: para adicionar ou remover desconto

## 5. Como Fazer o Deploy de Alterações

1. Commit suas alterações no repositório Git:
```bash
git add .
git commit -m "Descrição das alterações"
git push
```

2. O site será automaticamente atualizado após o push

## 6. Dicas Importantes

- Sempre faça backup antes de realizar alterações
- Teste as alterações localmente antes de fazer deploy
- Mantenha as imagens com tamanhos otimizados para melhor performance
- Siga o padrão de formatação existente ao adicionar novos itens
- Certifique-se de que todas as URLs de imagens são válidas e acessíveis

## 7. Suporte

Em caso de dúvidas ou problemas, entre em contato com o suporte técnico ou consulte a documentação completa do projeto.