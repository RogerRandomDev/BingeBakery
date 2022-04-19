for(const product of document.getElementsByClassName("orderListItem")){
    let addOne=document.createElement("input")
    addOne.type="button"
    addOne.classList="asSquare"
    addOne.value="+"
    addOne.name=product.innerHTML
    addOne.style.float="right"
    addOne.style.fontSize="4vmin"
    product.appendChild(addOne)

}