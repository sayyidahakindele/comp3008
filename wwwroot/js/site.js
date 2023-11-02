// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let user = 0
let pastOrders = {
    0: [],
    1: [],
    2: []
};

//id:{user_name,email,password,cart{id,item_name,price,item_amount,in_store}}
//for cart [store_id,item_id,amount in cart,in_store]
let users = {
    0:{user_name:"mike",email:"mike@you.com",password:"mike123",cart:{},pastOrders:[]},
    1:{user_name:"ella",email:"ella@you.com",password:"ella123",cart:{0:[1,1,2,false],1:[2,0,4,true],2:[2,1,4,false]},pastOrders:[]},
    2:{user_name:"jack",email:"jack@you.com",password:"jack123",cart:{},pastOrders:[]}}

//id:{store_name,address,catalog:{id,item_name,price,item_amount,in_store,store_id,rating (out of 5)}}
shops = {0:{name:"zara",address:"123 zara ave",catalog:{
    0:{item_name:"Black shirt",price:400,amount:5,in_store:false,store_id:0,rating:3, image: "Zara blackshirt.jpg", size:"L"},
    1:{item_name:"Black jeans",price:700,amount:2,in_store:false,store_id:0,rating:5, image: "Zara blackjeans.jpg", size: "M"},
    2:{item_name:"Blue jeans",price:500,amount:10,in_store:false,store_id:0,rating:3, image: "Zara bluejeans.png", size:"S"}}},
1:{name:"northface",address:"123 northface ave",catalog:{
    0:{item_name:"Black shirt",price:40,amount:4,in_store:false,store_id:1,rating:4, image: "Zara blackshirt.jpg", size:"XS"},
    1:{item_name:"Black jeans",price:75,amount:3,in_store:false,store_id:1,rating:5, image: "Zara blackjeans.jpg", size:"L"},
    2:{item_name:"Blue jeans",price:501,amount:9,in_store:false,store_id:1,rating:2, image: "Zara bluejeans.png", size:"M"},
    3:{item_name:"Boxer",price:2,amount:45,in_store:false,store_id:1,rating:2, image: "boxer.jpeg", size:"M"}}},
2:{name:"hm",address:"123 H&M ave",catalog:{
    0:{item_name:"Black shirt",price:10,amount:5,in_store:false,store_id:2,rating:5,image: "Zara blackshirt.jpg", size:"XL"},
    1:{item_name:"Black jeans",price:10,amount:2,in_store:false,store_id:2,rating:4,image: "Zara blackjeans.jpg", size:"XS"},
    2:{item_name:"Blue jeans",price:50,amount:10,in_store:false,store_id:2,rating:4,image: "Zara bluejeans.png",size:"M"},
    3:{item_name:"Boots",price:80,amount:6,in_store:false,store_id:2,rating:1, image: "boots.jpg",size:"M"}}},
3:{name:"zara",address:"123 zara ave",catalog:{
    0:{item_name:"Black shirt",price:400,amount:5,in_store:false,store_id:0,rating:3, image: "Zara blackshirt.jpg", size:"L"},
    1:{item_name:"Black jeans",price:700,amount:2,in_store:false,store_id:0,rating:5, image: "Zara blackjeans.jpg", size: "M"},
    2:{item_name:"Blue jeans",price:500,amount:10,in_store:false,store_id:0,rating:3, image: "Zara bluejeans.png", size:"S"}}}}


function loadlocal(){
    if (localStorage.getItem("shops")==null){
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("shops", JSON.stringify(shops));
    }
}

loadlocal();


document.addEventListener("DOMContentLoaded", function () {
    // Get the URL of the current page
    const currentURL = window.location.href;

    // Parse the URL to extract the user's name
    const parts = currentURL.split('=');
    const adminPart = parts[parts.length - 1];
    console.log(adminPart);

    //save the current user
    for (const key in users) {
        if (users[key].user_name === adminPart) {
          user = key;
        }
    }
    console.log(user);

    const budgetInput = document.getElementById("budget");
    const updateButton = document.getElementById("updateButton");
    const progressBar = document.querySelector(".progress");

    updateButton.addEventListener("click", function () {
        const budget = parseFloat(budgetInput.value);

        if (isNaN(budget) || budget <= 0) {
            alert("Please enter a valid budget greater than zero.");
            return;
        }

        const spent = 50; //DAMI CHANGE THIS TO CART TOTAL!!!
        const progressPercentage = (spent / budget) * 100;

        if (progressPercentage > 100) {
            alert("You've exceeded your budget!");
            progressBar.style.width = "100%";
            progressBar.style.backgroundColor = "red"; // Change color to red for budget exceeded
        } else {
            progressBar.style.width = progressPercentage + "%";
            
            // Change color based on budget progress
            if (progressPercentage < 25) {
                progressBar.style.backgroundColor = "green"; // Green for low progress
            } else if (progressPercentage < 75) {
                progressBar.style.backgroundColor = "yellow"; // Yellow for medium progress
            } else {
                progressBar.style.backgroundColor = "orange"; // Orange for high progress
            }
        }
    });
});


function loadproducts(store, product_div) {
    // Check if the div exists in the DOM
    let targetDiv = document.getElementById(product_div);
    if (!targetDiv) {
        console.error(`Div with ID ${product_div} not found.`);
        return; // Exit the function early if div doesn't exist
    }

    // Rest of your function...
    let string_shops = localStorage.getItem("shops");
    let st = JSON.parse(string_shops)[store];
    let cat = st.catalog;
    let result = "";

    // for each product
    Object.keys(cat).forEach(id => {
        let item = cat[id];
        //adds in the individual clothing items
        result += `<div class="item-container">
                    <img class="item-image" src="${item.image}" alt="${item.item_name}" style="width: 159px; height: 190px;">
                    <div>
                    <p>${item.item_name}</p> 
                    <p>Store: ${st.name}; </p> 
                    <p id="sizeS">Size: ${item.size}</p> 
                    <p id="PriceS">Price: $${item.price}</p> 
                    <button type="button" id="myBtn" onclick="addtocart(${store},${id})">+</button>
                    </div>
                   </div>`;
        console.log(`product_add_button(${store},${id},${st["name"]+"_cart"})`);
    });

    // Set the innerHTML of the target div
    targetDiv.innerHTML = result;

    // Your logging statements
    console.log(shops);
    console.log("Loading products for:", product_div);
}


function product_add_button(store_id,item_id,store_cart_div){
    addtocart(store_id,item_id);
    spec_cart(store_id,store_cart_div);
    
    


}

document.addEventListener("DOMContentLoaded", function() {
    loadproducts(0,"zara_products");
    loadproducts(1,"northface_products");
    loadproducts(2,"hm_products");
    loadproducts(3,"ftg_products");
});


function toggleActive(buttonId) {
    const inStoreContent = document.getElementById('inStoreContent');
    const cartSection = document.getElementById('csection');

    if (buttonId === 'shoppingListButton') {
        inStoreContent.style.display = 'block';
        cartSection.style.display = 'none';
    } else {
        inStoreContent.style.display = 'none';
        cartSection.style.display = 'block';
    }

    const buttons = document.querySelectorAll('.toggle-buttons button');
    buttons.forEach(button => {
        if (button.id === buttonId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function filterStores() {
    // 1. Get the search term
    const searchTerm = document.getElementById('storeSearchInput').value.toLowerCase();

    // 2. Loop through the list of stores
    const stores = document.querySelectorAll('.store-name');
    let storeFound = false; // Flag to check if any store matches the search term

    stores.forEach(storeElement => {
        const storeName = storeElement.textContent.toLowerCase();

        if (storeName.includes(searchTerm)) {
            storeElement.parentElement.style.display = 'block'; // Show the store if it matches
            storeFound = true;
        } else {
            storeElement.parentElement.style.display = 'none'; // Hide the store if it doesn't match
        }
    });

    // 3. Display a message if no stores match
    const noResultsMessage = document.getElementById('noResultsMessage');
    if (storeFound) {
        noResultsMessage.style.display = 'none';
    } else {
        noResultsMessage.style.display = 'flex';
    }
}


function addtocart(store_id,item_id){

    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);

    console.log("see me");
    let incart = false;

   for (const key in usersT[user]["cart"]){
        if (usersT[user]["cart"][key][1]==item_id && usersT[user]["cart"][key][0]==store_id){
            incart=true;

            usersT[user]["cart"][key][2]=usersT[user]["cart"][key][2]+1;
            console.log("after add");
            console.log(usersT[user]["cart"]);
            

        };
    };

    if (incart==false){
        // addtostorecart();
        let keys = Object.keys(usersT[user]["cart"]);
        let newkey = keys;
        
        usersT[user]["cart"][keys.length]=[store_id,item_id,1,false]
        console.log("after add");
        console.log("keys");
        console.log(Object.keys(usersT[user]["cart"]));
        console.log(usersT[user]["cart"]);
        
    }  

    localStorage.setItem("users", JSON.stringify(usersT));

    let s = localStorage.getItem("shops");
    let shopsT = JSON.parse(s);

    cartTotal();
    
    spec_cart(store_id,shopsT[store_id]["name"]+"_cart");
    
    loadCartItems("cart-section");
    load_instore("inStoreContent");

};

function cartTotal(){//sums up the price of cloths stored in the cart
    
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);
    let ct = usersT[user]["cart"];//local cart variable
    let total = 0;//the total 
    

    let s = localStorage.getItem("shops");
    let shopsT = JSON.parse(s);


    

    for (key in ct){//loops over the cart
        console.log(ct[key][3]);
        if (!(ct[key][3])){
            
            total+=shopsT[ct[key][0]]["catalog"][ct[key][1]]["price"]*ct[key][2];
            
        }
    } 
    
    return total;
};



let to = cartTotal();


function displayTotal(total_div){
    
    let t = cartTotal();
    let result ="";
    result += `<p>Total: ${t}</p>`;
    document.getElementById(total_div).innerHTML = result;
}

displayTotal("zara_total");


function loadCartItems(cart_div) {
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);

    let s = localStorage.getItem("shops");
    let shopsT = JSON.parse(s);

    document.getElementById(cart_div).innerHTML = "";
    let result = "";
    const ratings = [];  // To store ratings and corresponding element IDs

    for (const product in usersT[user]["cart"]) {
        
        if (!usersT[user]["cart"][product][3]) {
            const st = usersT[user]["cart"][product][0];
            const i = usersT[user]["cart"][product][1];
            const item = shopsT[st]["catalog"][i];
            const ratingId = `rating-${st}-${i}`;  // Unique ID for the rating span
            ratings.push({id: ratingId, rating: item.rating});  // Store rating info

            result += `<div class="flex-container">
                        <img src="${item.image}" alt="${item.item_name}" style="margin-top: -20px; width: 159px; height: 190px;">
                        <div id="itembox">
                            <div id="${st},${i},del"> 
                                <p>Name: ${item.item_name}</p> 
                                <p>Store: ${shopsT[st]["name"]} </p>
                                <span class="star-rating" id="${ratingId}" data-rating="${item.rating}">Rating: ${item.rating}</span> 
                                <p id="size">Size: ${item.size}</p> 
                                <p id="Price">Price: $${item.price}</p>
                                <p>Amount: ${usersT[user]["cart"][product][2]}</p>
                                <label for="${st},${i},amount":</label><input type="number" id="${st},${i},amount" name="${st},${i},amount" value=${usersT[user]["cart"][product][2]} min="-1" max="100" onchange=updateamount([${st},${i},${usersT[user]["cart"][product][2]}],"${st},${i},amount")>
                                <button id="${st},${i},button"  onclick="put_instore([${st},${i},${usersT[user]["cart"][product][2]}],'${st},${i},del')">To In Store</button><br></br>
                            </div>
                        </div>
                        </div>`;
        }
    }

    document.getElementById(cart_div).innerHTML = result;
   

    for (const {id, rating} of ratings) {
        showRating(rating, id);
    }

    displayTotal("totall")
}

function SearchCart() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const items = document.getElementsByClassName('flex-container');
    const cartDiv = document.getElementById('cart-section');

    let itemsFound = false;
  
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemNameElement = item.querySelector('p');
        let itemName = "";

        if (itemNameElement) {
            itemName = itemNameElement.innerText;
        }

        if (itemName.toUpperCase().indexOf(filter) > -1) {
            item.style.display = '';
            itemsFound = true;
        } else {
            item.style.display = 'none';
        }
    }

    let notFoundDiv = cartDiv.querySelector(".not-found");

    if (!itemsFound) {
        if (!notFoundDiv) {
            notFoundDiv = document.createElement("div");
            notFoundDiv.classList.add("not-found");
            cartDiv.appendChild(notFoundDiv);
        }
        notFoundDiv.innerHTML = "Item not found";
        notFoundDiv.style.display = '';
    } else if (notFoundDiv) {
        notFoundDiv.style.display = 'none';
    }
}



function showRating(rating, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear any existing content
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.innerHTML = "&#9733;"; // Star character
        star.style.color = (i <= rating) ? 'Black' : 'lightgray';
        container.appendChild(star);
    }
}



function loadzara(){
    displayTotal("zara_total");
    loadproducts(0,"zara_products");
    loadCartItems("zara_cart");
}

function spec_cart(s,cart_div){
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);

    let st = localStorage.getItem("shops");
    let shopsT = JSON.parse(st);

    
    document.getElementById(cart_div).innerHTML = "";
    let result = ""
    result += "<br><h2>Cart</h2>";
    

    let ttemp = usersT[user]["cart"]
    for (item in ttemp){
        
        if(ttemp[item][0] == s){
            const st = usersT[user]["cart"][item][0];
            const i = usersT[user]["cart"][item][1];
            let xx = shopsT[s]["catalog"][ttemp[item][1]]
            
            result += ` <div class="item-container"> 
                        <img class="item-image" src="${xx.image}" alt="${xx.item_name}" style="margin-top: -20px; width: 159px; height: 190px;">
                        <div>
                        <p>Name: ${xx.item_name}</p> 
                        <p id="sizeS">Size: ${xx.size}</p> 
                        <p id="PriceS">Price: $${xx.price}</p>
                        <p>Amount: ${xx["amount"]}</p> 
                        </div>
                        <label for="${st},${i},amount":</label><input type="number" id="${st},${i},amount" name="${st},${i},amount" value=${usersT[user]["cart"][item][2]} min="0" max="100" onchange=updateamount_store([${st},${i},${usersT[user]["cart"][item][2]}],"${st},${i},amount","${shopsT[st]["name"]}_cart")
                        
                        <button type="button" id="myBtn" onclick="removeFromcart(${s},${item[1]})">-</button>
                    </div>`;
            
        }
    }

    document.getElementById(cart_div).innerHTML = result;
}

displayTotal("cart_total");

document.addEventListener("DOMContentLoaded", function() {
    loadCartItems("cart_div");

});


function instoreCheck(li,check_id) {

    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);

    
    for (item in usersT[user]["cart"]){
        if (usersT[user]["cart"][item][1]==li[1]&&usersT[user]["cart"][item][0]==li[0]){//checks the store id and item id of the item in order to make sure its the right item
            if (document.getElementById(check_id).checked){
                usersT[user]["cart"][item][3]=true;
            }
            else {
                usersT[user]["cart"][item][3]=false;
            }
            
            load_instore("inStoreContent");
            
           
        }
    }
    
    
}

function put_instore(li,item_div_id){
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);



    console.log(usersT[user]["cart"])
    for (item in usersT[user]["cart"]){
        if (usersT[user]["cart"][item][1]==li[1]&&usersT[user]["cart"][item][0]==li[0]){//checks the store id and item id of the item in order to make sure its the right item
            
            usersT[user]["cart"][item][3]=true;
            

            localStorage.setItem("users",JSON.stringify(usersT));
            load_instore("inStoreContent");
            loadCartItems("cart-section");
            break;
        }
    }
    console.log(usersT[user]["cart"])
    
}

function put_indelivery(li,item_div_id){
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);

    console.log(usersT[user]["cart"])
    for (item in usersT[user]["cart"]){
        if (usersT[user]["cart"][item][1]==li[1]&&usersT[user]["cart"][item][0]==li[0]){//checks the store id and item id of the item in order to make sure its the right item
            
            usersT[user]["cart"][item][3]=false;
            
            localStorage.setItem("users",JSON.stringify(usersT));
            load_instore("inStoreContent");
            loadCartItems("cart-section");
            break;
                
        }
    }

    console.log(usersT[user]["cart"])
}

function load_instore(in_div){
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);

    let st = localStorage.getItem("shops");
    let shopsT = JSON.parse(st);

    // console.log("instore started loading");
    document.getElementById(in_div).innerHTML = "";
    let result = "";
    const ratings = [];  // To store ratings and corresponding element IDs

    for (product in usersT[user]["cart"]){
        if (usersT[user]["cart"][product][3]==true){
            let st = usersT[user]["cart"][product][0];
            let i = usersT[user]["cart"][product][1];
            let item = shopsT[st]["catalog"][i];
            const ratingId = `rating-${st}-${i}`;  // Unique ID for the rating span
            ratings.push({id: ratingId, rating: item.rating});  // Store rating info

            result += `<div class="flex-container">
                        <img src="${item.image}" alt="${item.item_name}" style="margin-top: -20px; width: 159px; height: 190px;">
                        <div id="itembox">
                            <div id="${st},${i},del"> 
                                <p>Name: ${item.item_name}</p> 
                                <p>Store: ${shopsT[st]["name"]} </p>
                                <span class="star-rating" id="${ratingId}" data-rating="${item.rating}">Rating: ${item.rating}</span> 
                                <p id="size">Size: ${item.size}</p> 
                                <p id="Price">Price: $${item.price}</p>
                                <p>Amount: ${usersT[user]["cart"][product][2]}</p>
                                </div>
                                </div>
                                <div id="del">
                                <button id="${st},${i},del"  onclick="delete_item_instore([${st},${i},${usersT[user]["cart"][product][2]}])">delete</button>
                                <button class=move id="${st},${i},button"  onclick="put_indelivery([${st},${i},${usersT[user]["cart"][product][2]}],'${st},${i},del')">To Delivery</button><br></br>
                                </div>
                                </div>`;

            
        }

       
    }

    
    
    document.getElementById(in_div).innerHTML = result;

    for (const {id, rating} of ratings) {
        showRating(rating, id);
    }
}


document.addEventListener("click", function () {
    loadCartItems("cart-section");
    load_instore("inStoreContent");
      
});

function updateamount(i,amount_id){
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);


    console.log("testers fa");
    for (item in usersT[user]["cart"]){
        if (usersT[user]["cart"][item][0]==i[0] && usersT[user]["cart"][item][1]==i[1]){
            // console.log(document.getElementById(amount_id).value);
            if (document.getElementById(amount_id).value==0){
                console.log("its zero");
                delete_item(i);
                loadCartItems("cart-section");
                break;
            }
            else{
                console.log("its "+document.getElementById(amount_id).value);
                usersT[user]["cart"][item][2]=document.getElementById(amount_id).value;
                localStorage.setItem("users",JSON.stringify(usersT));
                break;
            }
        }
    }

    function updateamount_store(i,amount_id,cart_div){
        let t = localStorage.getItem("users");
        let usersT = JSON.parse(t);
    
    
        console.log("testers fa");
        for (item in usersT[user]["cart"]){
            if (usersT[user]["cart"][item][0]==i[0] && usersT[user]["cart"][item][1]==i[1]){
                // console.log(document.getElementById(amount_id).value);
                if (document.getElementById(amount_id).value==0){
                    console.log("its zero");
                    console.log(cart_div);
                    delete_item_store(i[0],cart_div);
                    spec_cart(st,cart_div);
                    loadCartItems("cart-section");
                    break;
                }
                else{
                    console.log("its "+document.getElementById(amount_id).value);
                    usersT[user]["cart"][item][2]=document.getElementById(amount_id).value;
                    localStorage.setItem("users",JSON.stringify(usersT));
                    break;
                }
            }
        }
    
    
        
        console.log("amount updated");
        // loadcartItems("cart-section");
        loadCartItems("cart-section");
        load_instore("inStoreContent");
    
    }


    
    console.log("amount updated");
    // loadcartItems("cart-section");
    loadCartItems("cart-section");
    load_instore("inStoreContent");

}

function deleteAndSlide(object, keyToDelete) {
    if (object.hasOwnProperty(keyToDelete)) {
      delete object[keyToDelete];
      
      let previousValue = undefined;
      for (const key in object) {
        const temp = object[key];
        object[key] = previousValue;
        previousValue = temp;
      }
    }
  }

function delete_item(i){
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);

    obj = {};
    count=0;
    
    for (item in usersT[user]["cart"]){
        
        if (!(usersT[user]["cart"][item][0]==i[0] && usersT[user]["cart"][item][1]==i[1])){
            obj[count]=usersT[user]["cart"][item];
            count++;
            usersT[user]["cart"][item]=usersT[user]["cart"][item+1];
        }
    }

    usersT[user]["cart"]=obj;
    localStorage.setItem("users",JSON.stringify(usersT));
    loadCartItems("cart-section");

    console.log(usersT[user]["cart"]);
    

}

function delete_item_instore(i){
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);

    obj = {};
    count=0;
    
    for (item in usersT[user]["cart"]){
        
        if (!(usersT[user]["cart"][item][0]==i[0] && usersT[user]["cart"][item][1]==i[1])){
            obj[count]=usersT[user]["cart"][item];
            count++;
            usersT[user]["cart"][item]=usersT[user]["cart"][item+1];
        }
    }

    usersT[user]["cart"]=obj;
    localStorage.setItem("users",JSON.stringify(usersT));
    console.log(usersT[user]["cart"]);
    
    

    loadCartItems("cart-section");
    load_instore("inStoreContent");
}

function delete_item_store(i,cart_div){

    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);

    obj = {};
    count=0;
    
    for (item in usersT[user]["cart"]){
        
        if (!(usersT[user]["cart"][item][0]==i[0] && usersT[user]["cart"][item][1]==i[1])){
            obj[count]=usersT[user]["cart"][item];
            count++;
            usersT[user]["cart"][item]=usersT[user]["cart"][item+1];
        }
    }

    usersT[user]["cart"]=obj;
    localStorage.setItem("users",JSON.stringify(usersT));

    console.log(usersT[user]["cart"]);
    spec_cart(i[0],cart_div)
    spec_cart(i[1],cart_div)
}


function SortAndFilterCart() {
    const sortDropdown = document.getElementById('sortDropdown');
    const sortBy = sortDropdown.value;
    const itemsContainer = document.getElementById('cart-section');

    if (!itemsContainer) {
        console.error('The cart items container was not found.');
        return;
    }

    let items = Array.from(document.getElementsByClassName('flex-container'));

    // Sorting the items based on the selected criteria
    items.sort((a, b) => {
        let aValue, bValue;

        if (sortBy === 'name' || sortBy === 'store') {
            aValue = a.querySelector(`div p:nth-child(${sortBy === 'name' ? 1 : 2})`).innerText.split(': ')[1];
            bValue = b.querySelector(`div p:nth-child(${sortBy === 'name' ? 1 : 2})`).innerText.split(': ')[1];
            return aValue.localeCompare(bValue);
        } else if (['rating', 'rating_low_high', 'rating_high_low'].includes(sortBy)) {
            aValue = parseInt(a.querySelector('.star-rating').getAttribute('data-rating'));
            bValue = parseInt(b.querySelector('.star-rating').getAttribute('data-rating'));
            return sortBy === 'rating_high_low' ? bValue - aValue : aValue - bValue;
        } else if (['size', 'size_small_large', 'size_large_small'].includes(sortBy)) {
            console.log("Size sorting activated");
            const sizeOrder = ["XS","S", "M", "L", "XL"];
            aValue = sizeOrder.indexOf(a.querySelector('p#size').innerText.split(': ')[1]);
            bValue = sizeOrder.indexOf(b.querySelector('p#size').innerText.split(': ')[1]);
            console.log(aValue, bValue);  // debug line
            return sortBy === 'size_large_small' ? bValue - aValue : aValue - bValue;
            
        // } else if (['size', 'size_small_large', 'size_large_small'].includes(sortBy)) {
        //     const sizeOrder = ["Small", "Medium", "Large"];
        //     aValue = sizeOrder.indexOf(a.querySelector('p#size').innerText.split(': ')[1]);
        //     bValue = sizeOrder.indexOf(b.querySelector('p#size').innerText.split(': ')[1]);
        //     return sortBy === 'size_large_small' ? bValue - aValue : aValue - bValue;
        } else if (sortBy === 'price_low_high') {
            aValue = parseFloat(a.querySelector('p#Price').innerText.split(': $')[1]);
            bValue = parseFloat(b.querySelector('p#Price').innerText.split(': $')[1]);
            return aValue - bValue;
        } else if (sortBy === 'price_high_low') {
            aValue = parseFloat(a.querySelector('p#Price').innerText.split(': $')[1]);
            bValue = parseFloat(b.querySelector('p#Price').innerText.split(': $')[1]);
            return bValue - aValue;
        } else {
            // Default case, if none of the above conditions are met
            return 0;
        }
    });

    // Clearing the current items in the container
    itemsContainer.innerHTML = '';

    // Appending the sorted items back to the container
    items.forEach(item => itemsContainer.appendChild(item));

    // Now, apply the search filter
    SearchCart();
}

function clearAllDataAndRefresh() {
    // Clearing all data from localStorage
    localStorage.clear();
    
    // Refreshing the page
    window.location.reload();
  }

  function checkOut(){
    alert("Order Succesfull. Thank You!")
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);
    

    const order = document.getElementById("cart-section").innerHTML
    usersT[user]["pastOrders"].push(order)
    // usersT[user]["cart"]={}
    localStorage.setItem("users", JSON.stringify(usersT));
    document.getElementById("cart-section").innerHTML = ""
    budgetInput.addEventListener('change', function() {
        userBudget = 0;
        localStorage.setItem("userBudget", 0);
    });
}

function loadpast(){
    let t = localStorage.getItem("users");
    let usersT = JSON.parse(t);
    
    let list = usersT[user]["pastOrders"]
    let pp = 1
    for(const item in list){
        let gg = "Order "+pp
        const newDiv = document.createElement("div");
        newDiv.innerHTML = gg + list[item]
        document.getElementById("p-orders").appendChild(newDiv)
        pp++
    }
}