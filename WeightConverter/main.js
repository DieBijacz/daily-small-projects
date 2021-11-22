document.getElementById("output").style.visibility = "hidden"

document.getElementById("selector").addEventListener("input", function(e) {
    let pounds = e.target.value

document.getElementById("output").style.visibility = "visible"


    document.getElementById("g-output").innerHTML = pounds /0.0022046
    document.getElementById("kg-output").innerHTML = pounds /2.2046
    document.getElementById("oz-output").innerHTML = pounds * 16
})