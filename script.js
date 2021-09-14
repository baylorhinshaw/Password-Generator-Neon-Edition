//This section selects all HTML elements that will refer to when generating a password

//From line 4-22 this will get the slider to show the amount of characters the user wants
//Slider Selector (length of password)
const slider = document.querySelector(".length-slider");

//This is the text that'll show the length property of a password
const sliderLength = document.querySelector(".length-title");

//This will get the number when "Length:" is moved with the slider
slider.querySelector("input").addEventListener("input", event => {
    sliderLength.setAttribute("data-length", event.target.value);
    showValue(event.target);
});

//Passes the range input into the showValue function
showValue(slider.querySelector("input"));

//Applies a number to "Length"
function showValue(slider) {
    sliderLength.setAttribute("data-length", slider.value)
}
 