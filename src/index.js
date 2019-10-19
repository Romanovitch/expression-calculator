function eval() {
    // Do not use eval!!! OK!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let exprForCheck = expr.replace(/ /g, '')
    .replace(/[^()]/g, '');
exprForCheck = checkBrackets(exprForCheck, '()');
if (exprForCheck) {
    throw new Error('ExpressionError: Brackets must be paired');
} else {
    let arrCalc = expr
        .split(/(\d+|[+-/*()])/)
        .map(el => el.trim() )
        .filter(el => el !== '')
        .map(el => Number.isNaN(+el) ? el : +el); 
    const priorForMinus = {
        '(': 1,
        ')': 1,
        '/': 1,
        '*': 1,
        '+': 2,
        '-': 2,
    }
for(var i = 0; i <= arrCalc.length; i++) {
    if (
        (arrCalc[i] === '-' && !Number.isNaN(arrCalc[i+1])) 
        && (priorForMinus[arrCalc[i]] === priorForMinus[arrCalc[i+2]])
    ) {
        let newElem = -1 * arrCalc[i+1];
        arrCalc.splice(i, 2, '+', newElem);
    }
}
    let resNum = exprParser(arrCalc)
    return resNum[0];
}
function exprParser(allArr){
    let innArr = Array.from(allArr);
    const prior = {
        '(': 1,
        ')': 1,
        '/': 5,
        '*': 4,
        '+': 2,
        '-': 3,
    }
for(var i = 0; i <= innArr.length; i++) {
    let iMin1Elem = innArr[i-1];
    let i0Elem = innArr[i];  
    let i1Elem = innArr[i+1]; 
    let i2Elem = innArr[i+2];  
    let i3Elem = innArr[i+3]; 

    if(typeof i0Elem == 'number' && typeof i2Elem == 'number') {
        let ourIf01 = !!(iMin1Elem !== '/' && prior[iMin1Elem] <= prior[i1Elem]); // Этого Если знак Не равен "/" то -> приор знака Предыдущ меньше-равно 
        let ourIf02 = !!(iMin1Elem === '/' && prior[iMin1Elem] <  prior[i1Elem]); // Этого Если знак Равен    "/" то -> приор знака Предыдущ меньше
        let ourIf03 = !iMin1Elem; // Предыдущ знака Нет 
        let ourIf04 = !!(prior[i1Elem] >= prior[i3Elem]); // приор Этого знака больше-равен Следующ
        let ourIf05 = !i3Elem; // Следующ знака Нет
        if( 
            (ourIf03 || (ourIf01 || ourIf02)) && (ourIf05 || ourIf04)
        ){
            i0Elem = calculon(i0Elem, i1Elem, i2Elem);                
            innArr.splice(i, 3, i0Elem);
            if (innArr[i-1] === '(' && innArr[i+1] === ')'){
                innArr.splice(i+1, 1); 
                innArr.splice(i-1, 1);
            }
        } 
    } 
}

if(innArr.length > 1) {
    innArr = exprParser(innArr);
}
    return innArr
}

function checkBrackets(str, myConf){
    str = str.replace(myConf, "");
    return (str.includes(myConf) 
      ? checkBrackets(str, myConf) 
      : str);
}

function calculon(num1, oper, num2){
    switch (true){
        case ((oper === '/') && !num2):
            throw new Error('TypeError: Division by zero.');
        case (oper === '/'):
            return num1 / num2;
        case (oper === '*'):
            return num1 * num2;
        case (oper === '+'):
            return num1 + num2
        case (oper === '-'):
            return num1 - num2;
    }
}


}

module.exports = {
    expressionCalculator
}