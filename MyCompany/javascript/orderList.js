//the current cart, holds what you are buying
class cart{
    constructor(cartElement){
        this.currentCost=0;
        this.items={}
        this.cartElement=cartElement;
    }
    addItem(item_name){
        if(!Object.keys(this.items).includes(item_name)){
            let itemObject=this.createItem(item_name,1)
            this.items[item_name]=[0,itemObject]
        }
        this.items[item_name][0]++
        this.items[item_name][1].innerHTML=this.items[item_name][0]+" "+item_name
        this.updateCart()
    }
    removeItem(item_name){
        if(!Object.keys(this.items).includes(item_name)){return}
        this.items[item_name][0]--
        this.items[item_name][1].innerHTML=this.items[item_name][0]+" "+item_name
        if(this.items[item_name][0]<=0){
            this.items[item_name][1].remove()
            delete this.items[item_name]
        }
        this.updateCart()
    }
    //this will calculate cost
    updateCart(){
        this.currentCost=5;
        //goes through both sale sections to add the total cost
        for(let [item,value] of Object.entries(this.items)){
            if(Object.keys(forSale).includes(item)){
                this.currentCost+=forSale[item]*value[0]
            }else if(Object.keys(regularSale).includes(item)){
                this.currentCost+=regularSale[item]*value[0]
            }
        }
        let currencyForm=this.makeCurrencyForm(this.currentCost)
        document.getElementById("costLabel").innerHTML="Cost: "+currencyForm
        if(parseFloat(currencyForm.split("$")[0])>125.00){
            alert("The order has exceeded 125$, Please contact us directly or by phone to place orders this large")
        }
    }
    //creates the item element to add to your cart zone
    createItem(name,quantity){
        let item=document.createElement("li")
        item.setAttribute("value",name)
        item.innerHTML=quantity+" "+name
        
        this.cartElement.appendChild(item)
        return item
    }
    makeCurrencyForm(num){
        let numString=String(num)
        if(!numString.includes(".")){numString+=".00"}
        //makes sure there are enough zeroes at the end
        while(numString.split(".")[1].length<2){
            numString+="0"
        }
        while(numString.split(".")[1].length>2){
            numString=numString.substr(0,numString.length-1)
        }
        return numString+"$"
    }
}
let myCart=new cart(document.getElementById("purchasedItems"));


//this is for adding the items to the order list
const forSale={
    "Matcha Mochi":10.95,
    "Italian tiramisu":11.95,
    "cannoli":8.95,
    "Eclairs":8.95,
}
const regularSale={
    "Chocolate Fudge":5.95,
    "White Chocolate Fudge":5.95,
    "Apple Pie":15.95,
    "Brownies 6''":6.95,
    "Cupcakes":12.95,
    
}

//these are the zones that hold the products
let regular = document.getElementById("RegularDesserts")
//we add the objects into their zones
let tag=document.createElement("h3")
tag.innerHTML="REGULAR"
regular.append(tag)
for(const [item,cost] of Object.entries(regularSale)){
let itemHolder=document.createElement("div")
let img=document.createElement("img")
let thisSrc="./images/products/"+item.replaceAll(" ","\ ")+".jpeg"
img.src=thisSrc
itemHolder.onmousedown=()=>showProduct(thisSrc)
itemHolder.appendChild(img)
itemHolder.innerHTML+=item+": "+cost+"$"
itemHolder.appendChild(createAddButton(item))
itemHolder.appendChild(createSubButton(item))
itemHolder.className="sellingItem"
regular.appendChild(itemHolder)

}
let tag2=document.createElement("h1")
tag2.innerHTML="SPECIAL"
regular.appendChild(tag2)
//now we do the special zone
for(const [item,cost] of Object.entries(forSale)){
    let itemHolder=document.createElement("div")
    let img=document.createElement("img")
    let thisSrc="./images/products/"+item.replaceAll(" ","\ ")+".jpeg"
img.src=thisSrc
itemHolder.onmousedown=()=>showProduct(thisSrc)
    itemHolder.appendChild(img)
    itemHolder.innerHTML+=item+": "+cost+"$"
    itemHolder.appendChild(createAddButton(item))
    itemHolder.appendChild(createSubButton(item))
    itemHolder.className="sellingItem"
    regular.appendChild(itemHolder)
}

//creates thebuttons for adding and removing from the cart
function createAddButton(item_name){
    let btn=document.createElement("button")
    btn.className="addButton"
    btn.onclick=()=>myCart.addItem(item_name)
    btn.innerHTML="+"
    return btn
}
function createSubButton(item_name){
    let btn=document.createElement("button")
    btn.className="subButton"
    btn.onclick=()=>myCart.removeItem(item_name)
    btn.innerHTML="-"
    return btn
}

function showProduct(src){
    let modal=document.getElementById("imagePopup")
    modal.lastChild.src=src
    modal.style.visibility="visible"
}