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
        this.updateCart(item_name)
    }
    removeItem(item_name){
        if(!Object.keys(this.items).includes(item_name)){return}
        this.items[item_name][0]--
        this.items[item_name][1].innerHTML=this.items[item_name][0]+" "+item_name
        if(this.items[item_name][0]<=0){
            this.items[item_name][1].remove()
            delete this.items[item_name]
        }
        this.updateCart(item_name)
    }
    //this will calculate cost
    updateCart(n_item){
        this.currentCost=10;
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
            this.removeItem(n_item)
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


//these are the zones that hold the products
let regular = document.getElementById("RegularDesserts")
//we add the objects into their zones
let tag=document.createElement("h3")
tag.innerHTML="REGULAR"
regular.append(tag)
for(const [item,cost] of Object.entries(regularSale)){
    buildItem(item,cost)
}
let tag2=document.createElement("h1")
tag2.innerHTML="SPECIAL"
regular.appendChild(tag2)
//now we do the special zone
for(const [item,cost] of Object.entries(forSale)){
    buildItem(item,cost)
}
//sets the top item id so you can move to it using the back button
regular.children[1].id="topofdesserts"

//creates the buttons for adding and removing from the cart
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

function showProduct(src,name){
    let modal=document.getElementById("imagePopup")
    modal.lastChild.src=src
    let newInner=name+"<button"+modal.firstChild.innerHTML.split("<button")[1]
    modal.firstChild.innerHTML=newInner
    modal.style.visibility="visible"
}
function buildItem(item,cost){
    let itemHolder=document.createElement("div")
    let img=document.createElement("img")
    let thisSrc="./images/products/"+item.replaceAll(" ","\ ")+".jpeg"
img.src=thisSrc
    itemHolder.appendChild(img)
    itemHolder.onmousedown=function(ev){if(ev.pageX<innerWidth/2){showProduct(thisSrc,item)}}
    itemHolder.innerHTML+="<p>"+item+": "+cost+"$</p>"
    itemHolder.appendChild(createAddButton(item))
    itemHolder.appendChild(createSubButton(item))
    itemHolder.innerHTML
    itemHolder.className="sellingItem"
    regular.appendChild(itemHolder)
}


//this is to make sure you can scroll to the bottom
let itemHolder=document.createElement("div")
itemHolder.className="sellingItem"
regular.appendChild(itemHolder)