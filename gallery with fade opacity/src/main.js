const [current, imgs] = [document.querySelector("#current"), document.querySelectorAll(".imgs img")]
const opacity = 0.6;

//set first img opacity
imgs[0].style.opacity = opacity

// sets #current for 'click' target
// imgs.forEach(img => img.addEventListener("click", e => (current.src = e.target.src)));

imgs.forEach(img => img.addEventListener("click", imgClicked))

function imgClicked(e) {
    //reset opacity of all
    imgs.forEach(img => img.style.opacity = 1)
    //changes src in current for src of clicked
    current.src = e.target.src;
    //add fadein class 
    current.classList.add('fade-in')
    //remove class fade-in after .5s
    setTimeout(() => current.classList.remove('fade-in'), 500);
    // change opacity
    e.target.style.opacity = opacity;
}





