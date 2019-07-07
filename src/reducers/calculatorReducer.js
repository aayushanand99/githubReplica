
    
const INITIAL_STATE = {
    output: "",
    expression: ''
};
export function calculator(state = INITIAL_STATE, action) {
    let expression = state.expression
    switch (action.type) {
        case 'NumberPressed':
            expression += action.payload.value
            return {
                ...state,
                expression
            };
            break
        case 'OperationPressed':
            expression += ' '
            expression += action.payload.text
            expression += ' '
            return {
                ...state,
                expression
            };
            break
        case 'DecimalPressed':
            expression += action.payload.text
            return {
                ...state,
                expression
            };
            break
        case 'ClearPressed':
            return {
                expression: '',
                output: ""
            }
            break
        case 'CEPressed':
            return {
                ...state,
                expression: expression.slice(0, -1)
            }
            break
        case 'EqualsPressed':
            let input = expression.split(" ")
            let length = input.length - 1
            let output = 0
            // if (expression !== '') {
            //     if (typeof (parseFloat(input[length])) === 'number') {
            //         output = parseFloat(input[0])
            //         for (let i = 1; input[i]; i += 2) {
            //             let opr = input[i], opd = parseFloat(input[i + 1])
            //             if (typeof (opd) !== 'number')
            //                 output = 'NAN';
            //             else {
            //                 switch (opr) {
            //                     case '+': output += opd
            //                         break
            //                     case '-': output -= opd
            //                         break
            //                     case '*': output *= opd
            //                         break
            //                     case '/': output /= opd
            //                 }

            //             }
            //         }
            //     }
            //     else
            //         output = 'NAN'
            // }
            if(length!==0){
                for (i = 0; i <= input.length; i++) {
                    opr = input[i];
                    if (opr == '*') {
                        operand_1 = parseFloat(input[i - 1]);
                        operand_2 = parseFloat(input[i + 1]);

                        intermediate_val = operand_1 * operand_2;
                        input[i - 1] = intermediate_val;
                        input.splice(i, 2);
                        i = input.length;
                    }
                }

                for (i = 0; i <= input.length; i++) {
                    opr = input[i];
                    if (opr == '/') {
                        operand_1 = parseFloat(input[i - 1]);
                        operand_2 = parseFloat(input[i + 1]);

                        intermediate_val = operand_1 / operand_2;
                        input[i - 1] = intermediate_val;
                        input.splice(i, 2);
                        i = input.length;
                    }
                }

                for (i = 1; i < input.length; i++) {
                    if (input[i] == '+') {
                        operand_1 = parseFloat(input[i - 1]);
                        operand_2 = parseFloat(input[i + 1]);
                        input[i-1] = operand_1+operand_2
                        input.splice(i, 2);
                        i=input.length
                    } else if (input[i] == '-') {
                        operand_1 = parseFloat(input[i - 1]);
                        operand_2 = parseFloat(input[i + 1]);
                        input[i - 1] = operand_1 - operand_2
                        input.splice(i, 2);
                        i = input.length
                    }
                }
                output = input[0].toFixed(3)
            }
            else
                output = expression || 0
            return {
                ...state,
                output: output
            }
            break
        default: return state
    }
}

 