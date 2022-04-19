//current cart
let cart=[]
//this is the element that holds the information for the product you purchase
const productOrderForm=document.getElementById("orderData")

for(const product of document.getElementsByClassName("orderListItem")){
    let addOne=document.createElement("input")
    addOne.type="button"
    addOne.classList="asSquare"
    addOne.value="+"
    //splits it to right after the svg
    addOne.name=product.innerHTML.split(">")[1]
    addOne.style.float="right"
    addOne.style.fontSize="4vmin"
    product.appendChild(addOne)
    addOne.addEventListener("click",selectProduct)
}
//this one will get batter types and do the work for me
for(const typeOfBatter of document.getElementById("BatterType").children){
    typeOfBatter.innerHTML=typeOfBatter.value
}
for(const typeOfBatter of document.getElementById("FudgeType").children){
    typeOfBatter.innerHTML=typeOfBatter.value
}
for(const typeOfBatter of document.getElementById("CookieType").children){
    typeOfBatter.innerHTML=typeOfBatter.value
}

function selectProduct(targetEvent){
    let target=targetEvent.target
    productOrderForm.className=target.name
    //this is the h1 for the current product you are trying to order
    productOrderForm.children[0].innerHTML="ORDERING:"+target.name
    switch(target.name){
        case("Cakes"):
        case("Cupcakes"):
            document.getElementById("chooseBatter").setAttribute("list","BatterType")
            break
        case("Cookies"):
            document.getElementById("chooseBatter").setAttribute("list","CookieType")
            break
        case("Fudge"):
            document.getElementById("chooseBatter").setAttribute("list","FudgeType")
            break
    }
}

function closeOrder(){
    productOrderForm.className="noOrder"
}