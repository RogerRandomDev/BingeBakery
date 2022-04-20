//the current cart, holds what you are buying
class cart{
    constructor(){
        this.items={}
    }
    addItem(item_name){
        if(!this.items.includes(item_name)){
            this.items[item_name]=0
        }
        this.items[item_name]++
    }
    removeItem(item_name){
        this.items[item_name]--
        if(this.items[item_name]<=0){
            delete this.items[item_name]
        }
    }
}
let myCart=new cart();