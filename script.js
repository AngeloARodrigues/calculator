let numHolder = '';
let canPlaceDot = true;
let canPlaceSign = true;

let parenthesesCounter = 0;

function brackets(expression) {
    let stack = [];
    let current;
    const matchLookup = {
          "(": ")"
        };
                      
    for (let i = 0; i < expression.length; i++) {
      current = expression[i]; 
      
      if (current === '(') {
        stack.push(current);        
      } 
      else if (current === ')') {
        const lastBracket = stack.pop();

        if (matchLookup[lastBracket] !== current) {        
          return false; 
        }
      }
    }
    
    return stack.length === 0; 
};

const displayReload = function(){
    document.getElementById('calc-display').textContent = numHolder;
};



const canUseButton = function(buttonBool, characterSTR){
    if(numHolder.length <= 20 && buttonBool === true){    
        numHolder += characterSTR;
        //console.log(numHolder)
        displayReload();
    }
    //else{console.log('Error');}
};

const limitCharNumberto20 = function(char){
    if(numHolder.length <= 20){    
        numHolder += char;
        displayReload();
    }   
    else{
        console.log('Numero maximo de digitos exedidos');
    }
}

const addNum = function(num){
    if(numHolder.charAt(0) === '0' && num == '0'){
        return
    }

    if(numHolder.charAt(0) === '0' && numHolder.charAt(1) !== '.' && numHolder.charAt(1) == '' ){
        backSpace()
    }

    if(numHolder.charAt(numHolder.length - 1) != ')'){
       
        limitCharNumberto20(num);
        canPlaceSign = true;
    }
};

const addParentheses = function(parentheses){
    if(numHolder.charAt(numHolder.length - 1) != '.'){
        if(numHolder.charAt(numHolder.length - 1) === '-' || 
        numHolder.charAt(numHolder.length - 1) === '+' || 
        numHolder.charAt(numHolder.length - 1) === '*' || 
        numHolder.charAt(numHolder.length - 1) === '/' || 
        numHolder.charAt(numHolder.length - 1) === ''){
            if(parentheses === "("){
                
                parenthesesCounter += 1;
                limitCharNumberto20(parentheses)
            }
        }
    }

   if(parentheses === ")") {
        if(numHolder.charAt(numHolder.length - 1) != '(')
        {
            if(numHolder.charAt(numHolder.length - 1) !== '-' && 
            numHolder.charAt(numHolder.length -1) !== '+' &&
            numHolder.charAt(numHolder.length -1) !== '*' &&
            numHolder.charAt(numHolder.length -1) !== '/')
            {
                if(parenthesesCounter > 0){
                    
                    limitCharNumberto20(parentheses);
                        parenthesesCounter -= 1;
                }
            }
        }
    };
    canPlaceSign = true;
};

const addDot = function(){
    if(numHolder.charAt(numHolder.length - 1) === ')'){
        return
    }
    
    canUseButton(canPlaceDot,'.');
    canPlaceDot = false;
};

const addSign = function(sign) {
    if(numHolder.charAt(numHolder.length - 1) === ''){
        if(sign === '+' || sign === '-')        
        canUseButton(canPlaceSign,sign);
        canPlaceSign = false;
        canPlaceDot= true;
    }

    if(sign === '/' && numHolder.charAt(numHolder.length - 1) == ''){
        canPlaceSign = true;
        return
    }

    if(sign === '*' && numHolder.charAt(numHolder.length - 1) == ''){
        canPlaceSign = true;
        return
    }

    if(numHolder.charAt(numHolder.length - 1) !== ''){       
        canUseButton(canPlaceSign,sign);
        canPlaceSign = false;
        canPlaceDot= true;
    }
    //console.log(numHolder)
};

const result = function(){
    if(numHolder.charAt(numHolder.length - 1) == ''){
        return
    }

    if(brackets(numHolder)){
        if(numHolder === eval(numHolder).toString()){
            return;
        }        
        numHolder = eval(numHolder).toString();
        displayReload()
    }
    else{
        alert('Operação invalida');
        numHolder = '';
        displayReload()
    }
    parenthesesCounter = 0;
    canPlaceDot = true;
    canPlaceSign = true;
};

const clean = function(){
    if(numHolder.charAt(numHolder.length - 1) != ''){
        canPlaceSign = true;
    }
    parenthesesCounter = 0; 
    numHolder = '';
    displayReload();
    canPlaceDot = true;
};

const backSpace = function(){
    if(numHolder.charAt(numHolder.length - 1) != ''){
        canPlaceSign = true;
    }
    numHolder = numHolder.substring(0, numHolder.length - 1);
    displayReload();
    if(numHolder.charAt(numHolder.length - 1) == '('){parenthesesCounter -= 1}
    if(numHolder.charAt(numHolder.length - 1) == '.'){ canPlaceDot = true;}
    if(numHolder.charAt(numHolder.length - 1) == '-' || numHolder.charAt(numHolder.length - 1) == '+' || numHolder.charAt(numHolder.length - 1) === '*' ||numHolder.charAt(numHolder.length - 1) === '/'){
        canPlaceSign = false;
        //console.log(canPlaceSign)
    }
};