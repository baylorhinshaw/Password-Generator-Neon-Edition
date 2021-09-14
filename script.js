// This section selects all HTML elements that will refer to when generating a password
// This will get the slider to show the amount of characters the user wants 4-21
// Slider Selector (length of password)
const slider = document.querySelector(".length-slider");

// This is the text that'll show the length property of a password
const sliderLength = document.querySelector(".length-title");

// This will get the number when "Length:" is moved with the slider
slider.querySelector("input").addEventListener("input", event => {
  sliderLength.setAttribute("data-length", event.target.value);
   showValue(event.target);
});

// Passes the range input into the showValue function
showValue(slider.querySelector("input"));

// Applies number to "Length"
function showValue(slider) {
  sliderLength.setAttribute("data-length", slider.value);
}

// These functions are for randomizing password rules 
// Math.floor() = rounding up whatever number that is inside of it
// Math.random() = gives random number
// For the functions randomize Uppercase, Lowercase and Number we are using unicode
// This is why we start with certain numbers like 65 which is a "A" and 97 being an "a" in unicode and 48 for "0"
// Then the 26 is for how many letters are in the alphabet and 10 bc we are using numbers 0-9
function randomizeUppercase(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function randomizeLowercase(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function randomizeNumber(){
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function randomizeSymbol(){
  const symbols = "!@#$%^&()*,./<=>?@[]^_`{}~"
  return symbols[Math.floor(Math.random() * symbols.length)]
}

// This is an object that is defined to hold all functions to ensure randomized passwords based on the user's rules
const randomFunc = {
  uppercase: randomizeUppercase,
  lowercase: randomizeLowercase,
  number: randomizeNumber,
  symbols: randomizeSymbol
}

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const passwordEl = document.getElementById("password");
const sliderLengthEl = document.getElementById("slider");
const generateBtn = document.getElementById("generate");


// This function has paramerters to generate a password along with a for loop that interates until the length is met
// In line 69 we want to account for the checkboxes if its being checked by counting each individual required input
// In line 70 we want to filter the indiviual inputs if they have value or if they are checked
// If the typesCount === 0, which means that the user is not inputing any of the checked boxes, leaving it blank
function generateRandomPassword(uppercase, lowercase, number, symbols, length) {
  let generatedPassword = "";
  const typesCount = uppercase + lowercase + number + symbols;
  const typesArray = [{uppercase}, {lowercase}, {number}, {symbols}].filter(item => Object.values(item)[0]);
    if (typesCount === 0){
        return '';
    }
// 1st position in this loop initiates where its first intergrated
// 2nd position shows us how many times i should iterate. ex if length is 100, it'll iterate its functions up to 100 times
// 3rd position defines how the loop will iterate. It'll increment based on the typesCount 
    else {
    for (let i = 0; i < length; i+=typesCount){
// Each item in the array, we are wanting to retrieve its key to perform a specific randomization function
// If the key is 1, functionTypeName would be equal lowercase, randomFunc will access the object and look for "lowercase" and perform lowercase randomization
// This function will continue to run for this key until it reaches the length being defined by the user
    typesArray.forEach(type => {
      const functionTypeName = Object.keys(type)[0];
      generatedPassword += randomFunc[functionTypeName]();
    });
  }
// After the loop "generatedPassword" has now changed from "(blank)" to a new random one, based on the requirements
// generatedPassword will slice from its first character position to the end of the specified length 
    console.log(generatedPassword)
    return generatedPassword.slice(0, length)
  }
}


// When the button is clicked, we want to attach a event listener to it so that way it'll:
// 1: check to see if the uppercase box is checked
// 2: if the lowercase box is checked
// 3: if number is checked
// 4: if symbols is checked
// 5: input value for the slider
// Once the relevant elements are declared as variables, pass them through the generateRandomPassword and change the inner text to the password container (textarea)
generateBtn.addEventListener('click', () => {
  const hasUpperCase = uppercaseEl.checked;
  const hasLowerCase = lowercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;
  const length = sliderLengthEl.value;
  passwordEl.innerText = generateRandomPassword(hasUpperCase, hasLowerCase, hasNumber, hasSymbols, length);
});


