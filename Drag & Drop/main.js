
//creates list of elements with same class
const drags = document.querySelectorAll('.drag')
const containers = document.querySelectorAll('.container')


//loop through lists and check for dragging event
drags.forEach(drag => {
    drag.addEventListener('dragstart', () => {
        drag.classList.add('dragging')
    })

    drag.addEventListener('dragend', () => {
        drag.classList.remove('dragging')
    })
})

//loop through list of containers to check for dragover event over them
containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        //run function pass container and y pos of mouse
        const afterElement = getDragAfterElement(container, e.clientY)
        //only one box will have active class of dragging
        const draggable = document.querySelector('.dragging')
        if (afterElement == null){
            //appened that element to container
            container.appendChild(draggable)            
        } else {
            container.insertBefore(draggable, afterElement)
        }


    })
})

function getDragAfterElement (container, y) {
    //in container select all but not that with class dragging and make array
    const dragElements = [...container.querySelectorAll('.drag:not(.dragging)')]

    return dragElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element

}