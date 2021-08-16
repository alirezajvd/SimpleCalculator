const userInput = document.querySelectorAll('button')
const display = document.querySelector('.disp')
var operator = [];      //stores all operation in array
var nums = [];          //stores all numbers that the user has entered
var displayTemp = '';   //isolates number from operators and the result is stored in num array
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
        reset_array();
        //resets all the var and arrays to the first place
    }

    else if (buttonVal == "="){
        if (display.value != ''){
            nums[i] = parseInt(displayTemp);

            display.value = operation(j);

            displayTemp = display.value ;
            reset_array();
        }
    }

    else{
        if (event.target.className == "operation"){
            nums[i] = parseInt(displayTemp); //stores the isolated numbers to num array
            operator[j] = buttonVal;         //stores the isolated numbers operator array
            j++, i++;
            displayTemp = '';            
        }

        else{
            displayTemp += buttonVal;
        }
        display.value += buttonVal;        
    }
}

function reset_array(){
    operator = []; //*might be problematic reference
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
    }
    return nums[k];
}

//add float point and back space 


