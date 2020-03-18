const containers = document.querySelectorAll('.container')
const draggables = document.querySelectorAll('.draggable')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
        draggable.classList.add('dragging')
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getClosestAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if(!afterElement){
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

function getClosestAfterElement(container, Y) {
    const childElement = [...container.querySelectorAll('.draggable:not(.dragging)')]
    //console.log(childElement)
    return childElement.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset =  Y - box.top - box.height/2
        if(offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: -Infinity}).element
}
