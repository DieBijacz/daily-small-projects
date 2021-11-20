
// get input from filter
const input = document.getElementById('filter-input')
//add eventListener to input
input.addEventListener("keyup", filterNames)

function filterNames() {
    //get value of input
    let filterValue = document.getElementById('filter-input').value.toUpperCase()
    // get names ul
    let ul = document.getElementById('names')
    // get item from ul
    let li = ul.querySelectorAll("li.collection-item")
    //loop through collection-item
    for (let i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName('a')[0]
        // if matched || innerHTML will be names like Bożena
        if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            li[i].style.display = ''
        } else {
            li[i].style.display = 'none'
        }
    }
}