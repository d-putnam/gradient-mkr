
// Called when user changes a color slider
let colorSlider = function(slider, type, target) {
    let value = slider.value;
    // If it's an alpha slider, divide by 100
    if (type === "3"){
        value = slider.value / 100;
    }
    // Get the target object's rgb values
    let img = document.getElementById(target);
    let rgbColor = img.getAttribute("stop-color");
    // Split them into a list
    rgbArr = rgbColor.substring(5, rgbColor.length-1).replace(/ /g, '').split(',');
    // Update the /R/ /G/ /B/ or /A/
    rgbArr[type] = value;
    // Pack the new values
    newcolor = "rgba("+rgbArr[0]+", "+rgbArr[1]+", "+rgbArr[2]+", "+rgbArr[3]+")";
    // Update the gradient attribute
    img.setAttribute("stop-color", newcolor);
    // Update the codeblock
    document.getElementsByClassName(target)[0].innerHTML = newcolor;
}


// Called when user changes the rotate slider
let rotateSlider = function(slider, type, target) {
    let value = slider.value;
    // Get the gradient transform object
    let img = document.getElementById(target);
    // Insert the value into a string
    rotation = "rotate("+value+", .5, .5)";
    // Update the animation attribute
    img.setAttribute("gradientTransform", rotation);
    // Get the animate transform object
    let anim = document.getElementById("spin");
    // Reformat the string for spin animation index
    start = ""+value+" .5 .5";
    to = Number(value) + 360;
    end = ""+to+" .5 .5";
    // Update the spin index
    anim.setAttribute("from", start);
    anim.setAttribute("to", end);
    // Update the codeblock
    document.getElementsByClassName('rotation')[0].innerHTML = value;
    document.getElementsByClassName('from')[0].innerHTML = value;
    document.getElementsByClassName('to')[0].innerHTML = to;
}


// Called when user changes the offset slider
let offsetSlider = function(slider, type, target) {
    // Scale the value
    let value = (slider.value / 100);
    // Get the stop2 object
    let img = document.getElementById(target);
    // Set image offset based on slider
    img.setAttribute(type, value.toFixed(2));
    // Update codebox text
    document.getElementsByClassName('stop2offset')[0].innerHTML = value.toFixed(2);
    // Get animation endpoint values e.g. (0.2; 0.5; 0.2)
    let anim = document.getElementById("breath");
    let endpoints = anim.getAttribute("values")
    // Split them into a list e.g. "0.2" "0.5" "0.2"
    animArr = endpoints.split(';').map(function(item) {
        return item.trim();
      });
    // Set the start and end point to the scaled slider value
    animArr[0] = value.toFixed(2);;
    animArr[2] = value.toFixed(2);;
    // Pack the new values
    newvalues = ""+animArr[0]+"; "+animArr[1]+"; "+animArr[2]+"";
    // Update the gradient attribute
    anim.setAttribute("values", newvalues)
    // Update the codeblock
    document.getElementsByClassName("breathrange")[0].innerHTML = newvalues;
}


// Called when user changes the spin slider
let spinSlider = function(slider, target) {
    // Invert the value
    let inverse = (slider.value * -1) + 2600
    // Scale the value
    let value = ((inverse / 100) + 0.2).toFixed(1);
    //console.log(value);
    // Get the offset animation object
    let img = document.getElementById(target);
    // Insert the value into a string
    dur = ""+value+"s";
    // Update the animation attribute
    img.setAttribute("dur", dur);
    // Update the codeblock
    document.getElementsByClassName("spindur")[0].innerHTML = dur;
}


// Called when user changes the breath slider
let breathSlider = function(slider, target) {
    // Invert the value
    let inverse = (slider.value * -1) + 1300;
    // Scale the value
    let value = ((inverse / 100) + 0.2).toFixed(1);
    // Get the offset animation object
    let img = document.getElementById(target);
    // Insert the value into a string
    dur = ""+value+"s";
    // Update the animation attribute
    img.setAttribute("dur", dur);
    // Update the codeblock
    document.getElementsByClassName("breathdur")[0].innerHTML = dur;
}


// The SVG animation seemingly has to be enabled at start...
// Call this on load to run the animation once at 0.1s then disable
let open = function() {
    let bstate = document.getElementById("breath");
    bstate.setAttribute("repeatCount", "none");
    let sstate = document.getElementById("spin");
    sstate.setAttribute("repeatCount", "none");
    randomAll();
}


let firstspin = "false";	
// "Spin" animation toggle - starts/stops the rotation animation and reveals relavent codeblock	
let toggleSpin = function(){	
    let img = document.getElementById("spin");	
    if (firstspin === "false"){	
        console.log("first")	
        firstspin = true;	
        // Set animation spin duration equal to scaled slider value	
        // Necessary to override the 0.1s initial value for open()	
        let slider = document.getElementById("spinr");	
        // Invert the slider value	
        let inverse = (slider.value * -1) + 2600;
        let value = (slider.value / 100) + 0.2;	
        dur = ""+value+"s";	
        img.setAttribute("dur", dur);	
    }

    // Enable the spin slider
    document.getElementById("spinr").disabled = !document.getElementById("spinr").disabled;

    // Enable the animation in the actual SVG element
    if (img.getAttribute("repeatCount") === "indefinite"){
        img.setAttribute("repeatCount", "none");
    }
    else {
        img.setAttribute("repeatCount", "indefinite");
    }
    console.log(img.getAttribute("repeatCount"))

    // Toggle visibility on each codeblock span related to the rotation animation
    if (document.getElementsByClassName("rota")[0].style.display === "block"){
        for (let i = 0; i < document.getElementsByClassName("rota").length; i++){
            document.getElementsByClassName("rota")[i].style.display = "none";
        }
    }
    else {
        for (let i = 0; i < document.getElementsByClassName("rota").length; i++){
            document.getElementsByClassName("rota")[i].style.display = "block";
        }
    }

}


let firstbreath = "false";
// "Breath" animation toggle - starts/stops the offset animation and reveals code
let toggleBreath = function(){
    let img = document.getElementById("breath");
    if (firstbreath === "false"){
        firstbreath = "true";
        // Set animation offset duration equal to scaled slider value
        // Necessary to override the 0.1s initial value for open()
        let slider = document.getElementById("breathr");
        // Invert the value
        let inverse = (slider.value * -1) + 1300;
        let value = (inverse / 100) + 0.2;
        dur = ""+value+"s";
        img.setAttribute("dur", dur);
    }

    // Enable the breath slider
    document.getElementById("breathr").disabled = !document.getElementById("breathr").disabled;

    // Enable the animation in the actual SVG element
    if (img.getAttribute("repeatCount") === "indefinite"){
        img.setAttribute("repeatCount", "none");
    }
    else {
        img.setAttribute("repeatCount", "indefinite");
    }
    console.log(img.getAttribute("repeatCount"))

    // Toggle visibility on each codeblock span for the breath animation
    if (document.getElementsByClassName("breath")[0].style.display === "block"){
        for (let i = 0; i < document.getElementsByClassName("breath").length; i++){
            document.getElementsByClassName("breath")[i].style.display = "none";
        }
    }
    else {
        for (let i = 0; i < document.getElementsByClassName("breath").length; i++){
            document.getElementsByClassName("breath")[i].style.display = "block";
        }        
    }
    // Toggle the end of stop tag on codeblock line 7
    if (document.getElementsByClassName("endstop")[0].innerHTML === "/&gt;") {
        document.getElementsByClassName("endstop")[0].innerHTML = "&gt;";
    }
    else {
        document.getElementsByClassName("endstop")[0].innerHTML = "/&gt;";
    }
}


// Randomize all slider values using the randomize button
let randomAll = function() {
    // For each slider
    let slides = document.getElementsByClassName("slider");
    for (var i = 0; i < slides.length; i++) (function(i){
        setTimeout(function(){
            // Get the function called by the slider on input
            let slide = slides[i].oninput;

            // If it's a color slider
            if (slides[i].max === "255") {
                // Give the slider a random value in range
                slides[i].value = Math.floor((Math.random() * 255) + 1);
                // Parse the arguments so we can call it here
                slide = slide.toString().substring(43, 60);
                let type = slide.substring(2, 3)
                let target = slide.substring(7, 12)
                // Call the color-setting function
                colorSlider(slides[i], type, target, 1);
            }
            // If it's the alpha slider
            else if (slides[i].max === "100") {
                // Give the slider a random value in range
                slides[i].value = Math.floor((Math.random() * 100) + 1);
                // Parse the arguments so we can call it here
                slide = slide.toString().substring(43, 60);
                let type = slide.substring(2, 3);
                let target = slide.substring(7, 12);
                // Call the color-setting function
                colorSlider(slides[i], type, target, 100);
            }
            // If it's the offset slider
            else if (slides[i].id === "offset") {
                // Give the slider a random value in range
                slides[i].value = Math.floor((Math.random() * 80) + 11);
                // Parse the arguments so we can call it here
                let type = slide.toString().substring(46, 52);
                let target = slide.toString().substring(56, 61);
                // Call the offset-setting function
                offsetSlider(slides[i], type, target);
            }
            // If it's the rotation slider
            else if (slides[i].id === "rotation") {
                // Give the slider a random value in range
                slides[i].value = Math.floor((Math.random() * 360) + 1);
                // Parse the arguments so we can call it here
                let type = slide.toString().substring(46, 52);
                let target = slide.toString().substring(56, 64);
                // Call the offset-setting function
                rotateSlider(slides[i], type, target);
            }     
            // If it's disabled (animation off), do nothing
            else if (slides[i].disabled) {
                return;
            }
            // If it's the spin slider
            else if (slides[i].id === "spinr") {
                // Give the slider a random value in range
                slides[i].value = Math.floor((Math.random() * 2600) + 1); 
                // Parse the arguments so we can call it here
                let target = slide.toString().substring(26, 30);
                // Call the rota-setting function  
                spinSlider(slides[i], target); 
            }
            // If it's the breath slider
            else if (slides[i].id === "breathr") {
                // Give the slider a random value in range
                slides[i].value = Math.floor((Math.random() * 1300) + 1); 
                // Parse the arguments so we can call it here
                let target = slide.toString().substring(26, 32);
                console.log(target)
                // Call the rota-setting function  
                breathSlider(slides[i], target); 
            }
        });
    })(i);
}


