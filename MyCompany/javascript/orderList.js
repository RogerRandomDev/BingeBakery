//the current cart, holds what you are buying
class cart{
    constructor(cartElement){
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
    }
    //creates the item element to add to your cart zone
    createItem(name,quantity){
        let item=document.createElement("li")
        item.setAttribute("value",name)
        item.innerHTML=quantity+" "+name
        item.onclick=()=>myCart.removeItem(name)
        this.cartElement.appendChild(item)
        return item
    }
    
}
let myCart=new cart(document.getElementById("purchasedItems"));


//this is for adding the items to the order list
const forSale=[
    
]
const regularSale={
    "Chocolate Fudge":5.95,
    "White Chocolate Fudge":5.95,
    "Apple Pie":13.95,
    "Brownies":6.95,
    "Asstd. Cupcakes":10.95,
}
let regular = document.getElementById("RegularDesserts")
let special = document.getElementById("SpecialDesserts")
for(const item of Object.keys(regularSale)){
let itemHolder=document.createElement("p")
itemHolder.innerHTML=item
itemHolder.appendChild(createAddButton(item))

itemHolder.className="sellingItem"
regular.appendChild(itemHolder)

}
for(const item of Object.keys(forSale)){

}

function createAddButton(item_name){
    let btn=document.createElement("button")
    btn.className="addButton"
    btn.onclick=()=>myCart.addItem(item_name)
    btn.innerHTML="+"
    return btn
}