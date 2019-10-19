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
        '(': 3,
        ')': 3,
        '/': 3,
        '*': 3,
        '+': 4,
        '-': 4,
    }
for(var i = 0; i <= arrCalc.length; i++) {
    if (
        (arrCalc[i] === '-' && !Number.isNaN(arrCalc[i+1])) 
        && (priorForMinus[arrCalc[i]] === priorForMinus[arrCalc[i+2]])
    ) {
// console.log('да  1-', (arrCalc[i] === '-' && !Number.isNaN(arrCalc[i+1])), '2-', (priorForMinus[arrCalc[i]] === priorForMinus[arrCalc[i+2]]), '3-', arrCalc[i], '4-', arrCalc[i+2])
        let newElem = -1 * arrCalc[i+1];
        arrCalc.splice(i, 2, '+', newElem);
    } else {
// console.log('нет 1-', (arrCalc[i] === '-' && !Number.isNaN(arrCalc[i+1])), '2-', (priorForMinus[arrCalc[i]] === priorForMinus[arrCalc[i+2]]), '3-', arrCalc[i], '4-', arrCalc[i+2])
    }
}

// console.log('arrCalc -', arrCalc);

    let resNum = exprParser(arrCalc)

// console.log('resNum -', resNum[0]);
        
    return resNum[0];
}

let str13 = '24)+(-23)+;   82*80+(-51); )*89+(-17)-;   66)-17-17);   -+() '
let str12 = '24)-23+;       82*80-51;   )*89-17-17);   66(-17-17);   -+() '

let str11 = '24-23*17/(93+52*70*(6+91/(( 4/39/8*30 )/(22*97*(32*20*(82-80*51/89*9)*56+82)*89)-17-17)/29/81))';
// exprParser
// guiding
// calculon2

function exprParser(allArr){
// console.log('exprParser start-->', allArr)
//         let innArr = allArr;
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
// console.log(allArr[i]); //    (  / [88] / 88 * )
    let iMin1Elem = innArr[i-1];//  oper
    let i0Elem = innArr[i];     // num
    let i1Elem = innArr[i+1];   //  oper
    let i2Elem = innArr[i+2];   // num
    let i3Elem = innArr[i+3];   //  oper
// console.log(i0Elem, i1Elem, i2Elem, i3Elem);

    if(typeof i0Elem == 'number' && typeof i2Elem == 'number') {
        let ourIf01 = !!(iMin1Elem !== '/' && prior[iMin1Elem] <= prior[i1Elem]); // Этого Если знак Не равен "/" то -> приор знака Предыдущ меньше-равно 
        let ourIf02 = !!(iMin1Elem === '/' && prior[iMin1Elem] <  prior[i1Elem]); // Этого Если знак Равен    "/" то -> приор знака Предыдущ меньше
        let ourIf03 = !iMin1Elem; // Предыдущ знака Нет 
        let ourIf04 = !!(prior[i1Elem] >= prior[i3Elem]); // приор Этого знака больше-равен Следующ
        let ourIf05 = !i3Elem; // Следующ знака Нет
        
// console.log((ourIf03 || (ourIf01 && ourIf02)), (ourIf05 || ourIf04))

        if( 
            (ourIf03 || (ourIf01 || ourIf02)) && (ourIf05 || ourIf04)
        ){

// console.log('do    operation -0 -', i0Elem, i1Elem, i2Elem);
            i0Elem = calculon(i0Elem, i1Elem, i2Elem);                
            innArr.splice(i, 3, i0Elem);
// console.log('operation     next -', i0Elem, i1Elem, i2Elem, 'i =', i);  
            
                        
            if (innArr[i-1] === '(' && innArr[i+1] === ')'){
                                                                            // console.log('if (innArr[i-1] === ( && innArr[i+1] === )', innArr[i-1], innArr, innArr[i+1]);    
                innArr.splice(i+1, 1); 
                innArr.splice(i-1, 1);
                            
            }
            // i -= 1;
// console.log('do operation -1 -', innArr, allArr);
        } else {
// console.log('do not operation. next step');
        }
    } else {
// alert('qqq');
// console.log('next step');
    }
}

if(innArr.length > 1) {
// console.log('innArr = exprParser(innArr) -', innArr, innArr.length);
    innArr = exprParser(innArr);
}
//         let num = innArr;
// console.log('3  3) -',num[0], innArr, innArr.length);

    return innArr

// end exprParser       
}

function checkBrackets(str, myConf){
    str = str.replace(myConf, "");
    return (str.includes(myConf) 
      ? checkBrackets(str, myConf) 
      : str);
}

function calculon(num1, oper, num2){
    let res;
//         num1 = num1.toFixed(8);
//         num2 = num2.toFixed(8);
    switch (true){
        case ((oper === '/') && !num2):
            throw new Error('TypeError: Division by zero.');

        case (oper === '/'):
            res = num1 / num2;
// console.log('          calc-0.1 -', num1, oper, num2, '=', res);
            return res 

        case (oper === '*'):
            res = num1 * num2;
// console.log('          calc-0.2 -', num1, oper, num2, '=', res);
            return res 

        case (oper === '+'):
//                 num1 = Number(num1.toFixed(8));
//                 num2 = Number(num2.toFixed(8));
            res = num1 + num2
// console.log('          calc-0.3 -', num1, oper, num2, '=', res);
            return res 

        case (oper === '-'):

            res = num1 - num2;
// console.log('          calc-0.4 -', num1, oper, num2, '=', res);
            return res 

        default:
// alert('calc-0.5 -', num1, oper, num2);
    }

    return res;
}


}

module.exports = {
    expressionCalculator
}