# DRY

O princípio DRY significa *Don't repeat yourself*. Muitas pessoas entendem isso como evitar cópia de código em multiplos lugares, porém esse princípio nos diz algo muito mais poderoso que isso. O DRY tem a **intensão de garantir que um conceito dentro de um sistema esteja restrito apenas a um único ponto**. Ou seja, qualquer mudança no sistema deve ser feita em apenas um único lugar.

## Exemplo

Considerando um método que imprime o saldo de um client em relação a sua conta bancária. Exemplo adaptado do livro [The Pragmatic Programmer](#pragmatic-programmer-the-your-journey-to-mastery-20th-anniversary-edition-english-edition).

```javascript
function printBalance(account){

    console.log(`Debits: ${account.debits.toFixed(2)}\n`)
    console.log(`Credits: ${account.debits.toFixed(2)}\n`)

    console.log("        -----------\n")

    if(account.fees < 0){
        console.log(`Fees: ${-account.fees.toFixed(2)}`)
    }
    else {
        console.log(`Fees: ${account.fees.toFixed(2)}`)
    }

    if(account.balance < 0){
        console.log(`Balance: ${-account.balance.toFixed(2)}`)
    }
    else {
        console.log(`Balance: ${account.balance.toFixed(2)}`)
    }

}
```

Esse método fere o princípio DRY pelo menos umas 3 vezes.

Primeiramente caso a formatação do valores seja alterada precisamos mudar em 4 lugares no nosso código. Para resolver essa inconsistência extrairmos esse comportamento para ele ser definido como um único ponto do nosso sistema.

```javascript
function printBalance(account){

    console.log(`Debits: ${formatAmount(account.debits)}\n`)
    console.log(`Credits: ${formatAmount(account.credits)}\n`)

    console.log("        -----------\n")

    if(account.balance < 0){
        console.log(`Fees: -${formatAmount(account.fees)}`)
    }
    else {
        console.log(`Fees: ${formatAmount(account.fees)}`)
    }

    if(account.balance < 0){
        console.log(`Balance: -${formatAmount(account.debits)}`)
    }
    else {
        console.log(`Balance: ${formatAmount(account.debits)}`)
    }
}

function formatAmount(amount) {
    return amount.toFixed(2)
}
```

Com essa refatoração garantimos que a formatação do valor sempre irá respeitar a mesma regra e em caso de mudança, apenas um ponto do nosso sistema deve ser alterado, assim o princípio ETC é respeitado.

Porém ainda existem pontos que ferem o príncipio DRY. O segundo é o que diz respeito a formatação de valores negativos. Temos dois pontos do código que precisam ser alterados em caso de mudança.

```javascript
function printBalance(account){
    console.log(`Debits: ${formatAmount(account.debits)}\n`)
    console.log(`Credits: ${formatAmount(account.credits)}\n`)
    console.log("        -----------\n")
    console.log(`Fees: ${formatAmount(account.fees)}\n`)
    console.log(`Balance: ${formatAmount(account.debits)}\n`)
}

function formatAmount(amount) {
    result = Math.abs(amount).toFixed(2)

    if(amount < 0){
        return "-" + result
    }
    
    return " " + result
}

```

Por último temos apenas a quantidade de espaços em branco de cada um dos seguimentos. Caso no futuro a exibição do saldo fosse alterada precisaria ser alterada em todos os pontos to código que são exibidos.

```javascript
function printBalance(account){
    console.log(reportLine("Debits", account.debits))
    console.log(reportLine("Credits", account.credits))
    console.log(printLine("", "-----------"))
    console.log(reportLine("Fees", account.fees))
    console.log(reportLine("Balance", account.balance))
    console.log(reportLine("Debits", account.debits))
}

function reportLine(label, amount){
    return printLine(label + ":", formatAmount(amount))
}

function formatAmount(amount) {
    result = Math.abs(amount).toFixed(2)

    if(amount < 0){
        return "-" + result
    }
    
    return " " + result
}

function printLine(label, value){
    return `${label} ${value}\n`
}
```

Após toda essa refatoração o código repeita o princípio do DRY e é ordens de grandeza mais fácil de ser modificado no futuro.

<!-- TODO: Adicionar explicação da diferença em duplicação de código e duplicação de conceitos -->