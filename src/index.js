function eval() {
    // Do not use eval!!! OK!!!
    return;
}

function expressionCalculator(expr) {
    const myReg = /[\*|\/|+|\-|(|)]|(\d+)/g
    const primaryArray = expr.match(myReg).map(el => Number.isNaN(+el) ? el : +el)
    const exitArray = []
    const stackArray = []
    const priorityRank = {
                '(': 0,
                ')': 0,
                '+': 1,
                '-': 1,
                '/': 2,
                '*': 2,
            }
    function calculon(num1, num2, oper){
        if((oper === '/') && !num2) throw new Error('TypeError: Division by zero.')
        switch (oper){
            case ('/'):
                return num1 / num2
                break
            case ('*'):
                return num1 * num2
                break
            case ('+'):
                return num1 + num2
                break
            case ('-'):
                return num1 - num2
        }
    }  
    while (primaryArray.length) { //! проходим по всему первичному массиву
        let elPrimaryArr = primaryArray.shift()  // достаем элемент из первичного массива
        if (typeof elPrimaryArr === 'number') { //! может это число?
            exitArray.push(elPrimaryArr) // пушим в выходной массив из первичного массива
        } else if (elPrimaryArr === '(') { //! может это - "(" ?
            stackArray.push(elPrimaryArr) // пушим в стэк
        } else if (elPrimaryArr === ')') { //! а если это - ")" ?
            while (stackArray.length) { // то проходим по всему(почти) стэку
                let elStackArr = stackArray.pop() // достаем элемент из стэка
                if (elStackArr !== '(') { // проверяем элемент стэка - если это не "("
                    if (!stackArray.length) { // стэк уже закончился, а "(" все нет
                        throw new Error('ExpressionError: Brackets must be paired')
                    }
                    exitArray.push(elStackArr) // то пушим в выходной массив из стэка
                } else {
                    break //! - если все-же "(", то закончим обход стэка
                }
            }
        } else { //! ага, элемент это операция бинарная
            while (stackArray.length) { // пройдемся по всему(почти) стэку
                let elStackArr = stackArray.pop() // и достаем элемент из стэка
                if (priorityRank[elStackArr] >= priorityRank[elPrimaryArr]) { // если стэк-приоритет >= элемент_примари_массива-приоритет
                    exitArray.push(elStackArr) // то пушим в выходной массив из стэка
                } else {
                    stackArray.push(elStackArr) // не понадобился
                    break
                }
            }
            stackArray.push(elPrimaryArr) // и затем пушим в стэк
        }
    }
    //! а теперь все из стэка на выход, и заодно проверим скобочки
    while (stackArray.length) {
        let elStackArr = stackArray.pop() // достаем элемент из стэка
        if (elStackArr === "(" || elStackArr === ")") {
            throw new Error('ExpressionError: Brackets must be paired')
        } else {
            exitArray.push(elStackArr) // пушим в выходной массив элемент из стэка
        }
    }   
    while (exitArray.length) { //! а теперь вычисляем
        let elExitArr = exitArray.shift();
        if (typeof elExitArr === 'number') { // может это число?
            stackArray.push(elExitArr); // отправим в стэк
        } else {
            let elSecondStackArr = stackArray.pop(); // достаем элемент из стэка
            let elFirstStackArr = stackArray.pop(); // достаем элемент из стэка
            stackArray.push(calculon(elFirstStackArr, elSecondStackArr, elExitArr)) //! а теперь калькулён
        }
    }
    return stackArray[0]
  }

module.exports = {
    expressionCalculator
}