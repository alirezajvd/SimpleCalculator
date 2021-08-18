const userInput = document.querySelectorAll('button')
const display = document.querySelector('.disp')
var operator = [];      //stores all operation in array
var nums = [];          //stores all numbers that the user has entered
var displayTemp = '';   //isolates number from operators and the number is stored in num array
var j = 0;              //index of operator array
var i = 0;              // index of num array
//*have to change to local var*

userInput.forEach(function(button) {
    button.addEventListener('click', calculate);
});


function calculate(event){
    
    const buttonVal = event.target.value;

    if (buttonVal == "C"){
        displayTemp = '';
        display.value = '';
        reset_array();        //resets all the var and arrays to the first place
    }
    

    else if(buttonVal == "back"){
        //...to do: *check first time entering exception here*
        if (displayTemp == '')                           //this means that last input was an operation
        {
            display.value = display.value.slice(0, -1);
            operator = operator.slice(0, -1);
            i--,j--;
            displayTemp = display.value;
           
            var a = 0 , b = 0
            slice_displayTemp(a,b);
        }

        else{
            display.value = display.value.slice(0, -1);
            displayTemp = displayTemp.slice(0,-1);
        }

    }


   //  else if(buttonVal == "x2"){
   //     displayTemp *= displayTemp;
    //}


    else if (buttonVal == "="){
        if (display.value != ''){
            nums[i] = parseFloat(displayTemp);

            display.value = operation(j);

            displayTemp = display.value ;         //stores the result of operation in temp in order to save it for the next operation
            reset_array();
        }
    }


    else
    {
        if (event.target.className == "operation")
        {

            if (display.value == ''){
                reset_array();
            } 

            else if (displayTemp == ''){                //consecutive operations will be replaced by the last user input
                display.value = display.value.slice(0, -1); 
                operator[j-1] =buttonVal;
            }

            else{
                nums[i] = parseFloat(displayTemp); //stores the isolated numbers to num array
                operator[j] = buttonVal;          
                j++, i++;
                displayTemp = ''; 
            }     
            display.value += buttonVal;     

        }
        else{
            
            if (event.target.value =="." && check_dot_exception(event.target.value)){}
            else{
                display.value += buttonVal;  
                displayTemp += buttonVal;
            }
        }      
    }
}

function check_dot_exception(x){
    if (display.value.charAt(display.value.length-1) == "." ){
        return true;
    }

    for(var k=0; k<displayTemp.length; k++){
        if (displayTemp[k] == "."){
            return true;
        }
    }
}

function slice_displayTemp(a,b){
    for (var k = 0; k < (displayTemp.length); k++){
        a++;
        if (displayTemp.charAt(k) == "+" || displayTemp.charAt(k) == "-" || displayTemp.charAt(k) == "*" || displayTemp.charAt(k) == "/"){
            b = a;
        }
    }
    displayTemp = displayTemp.slice(b);
}


function reset_array(){
    operator = []; //*might be problematic (reference)
    nums = [];
    j = 0;
    i = 0;
}

function operation(y){
    var k = 0;
    for(; k < y ; k++){
        if (operator[k] == "*"){
            nums[k+1] = nums[k] * nums[k+1];
        }
        else if (operator[k] == "/"){
            nums[k+1] = nums[k] / nums[k+1];
        }
        else if (operator[k] == "+"){
            nums[k+1] = nums[k] + nums[k+1];
        }
        else if (operator[k] == "-"){
            nums[k+1] = nums[k] - nums[k+1];
        }
        else if (operator[k] == "%"){
            nums[k+1] = nums[k] % nums[k+1];
        }
    }
    return nums[k];
}

