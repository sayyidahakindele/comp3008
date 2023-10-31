// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let user = 0

//id:{user_name,email,password,cart{id,item_name,price,item_amount,in_store}}
//for cart [store_id,item_id,amount in cart,in_store]
let users = {
    0:{user_name:"mike",email:"mike@you.com",password:"mike123",cart:{0:[0,1,2,false],1:[2,3,4,true]}},
    1:{user_name:"ella",email:"ella@you.com",password:"ella123",cart:{0:[1,1,2,false],1:[2,0,4,true],2:[2,1,4,false]}},
    2:{user_name:"jack",email:"jack@you.com",password:"jack123",cart:{}}}

//id:{store_name,address,catalog:{id,item_name,price,item_amount,in_store,store_id,rating (out of 5)}}
shops = {0:{name:"Zara",address:"123 zara ave",catalog:{
    0:{item_name:"Black shirt",price:400,amount:5,in_store:false,store_id:0,rating:3, image: "Zara blackshirt.jpg"},
    1:{item_name:"Black jeans",price:700,amount:2,in_store:false,store_id:0,rating:5, image: "Zara blackjeans.jpg"},
    2:{item_name:"Blue jeans",price:500,amount:10,in_store:false,store_id:0,rating:3, mage: "Zara blackshirt.jpg"}}},
1:{name:"NorthFace",address:"123 northface ave",catalog:{
    0:{item_name:"Black shirt",price:40,amount:4,in_store:false,store_id:1,rating:4},
    1:{item_name:"Black jeans",price:75,amount:3,in_store:false,store_id:1,rating:5},
    2:{item_name:"Blue jeans",price:501,amount:9,in_store:false,store_id:1,rating:2},
    3:{item_name:"Boxer",price:2,amount:45,in_store:false,store_id:1,rating:2}}},
2:{name:"H&M",address:"123 H&M ave",catalog:{
    0:{item_name:"Black shirt",price:10,amount:5,in_store:false,store_id:2,rating:5},
    1:{item_name:"Black jeans",price:10,amount:2,in_store:false,store_id:2,rating:4},
    2:{item_name:"Blue jeans",price:50,amount:10,in_store:false,store_id:2,rating:4},
    3:{item_name:"Boots",price:80,amount:6,in_store:false,store_id:2,rating:1}}}}

document.addEventListener("DOMContentLoaded", function () {
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
    let st = shops[store];
    let cat = st.catalog;
    let result = "";

    // for each product
    Object.keys(cat).forEach(id => {
        let item = cat[id];
        //adds in the individual clothing items
        result += `<img src="path/to/image" alt="Black Shirt" width="50"></img> 
                   <div> <p>${item.item_name}</p> <p>Store: ${st.name}; </p> 
                   <p>Size: Large</p> 
                   <p>Price: $${item.amount}</p> 
                   </div>`;
        result += `<div><button type="button" id="myBtn" onclick="addtocart(${store},${id})">+</button></div>`;
    });

    // Set the innerHTML of the target div
    targetDiv.innerHTML = result;

    // Your logging statements
    console.log(shops);
    console.log("Loading products for:", product_div);
}

document.addEventListener("DOMContentLoaded", function() {
    loadproducts(0,"zara_products");
    loadproducts(1,"northface_products");
    loadproducts(2,"hm_products");
});


function toggleActive(buttonId) {
    const inStoreContent = document.getElementById('inStoreContent');
    const cartSection = document.getElementById('cart-section');

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

    console.log("see me");
    let incart = false;

   for (const key in users[user]["cart"]){
        if (users[user]["cart"][key][1]==item_id){
            incart=true;

            // console.log("before add");
            // console.log(users[user]["cart"]);
            users[user]["cart"][key][2]=users[user]["cart"][key][2]+1;
            console.log("after add");
            console.log(users[user]["cart"]);
            //updatestorecart()

        };
    };

    if (incart==false){
        // addtostorecart();
        let keys = Object.keys(users[user]["cart"]);
        let newkey = keys;
        // console.log("before add");
        // console.log(users[user]["cart"]);
        users[user]["cart"][keys.length]=[store_id,item_id,1,false]
        console.log("after add");
        console.log(users[user]["cart"]);
        // console.log(keys.length);
    }  

    cartTotal();

};

function cartTotal(){//sums up the price of cloths stored in the cart
    console.log("runs");
    let ct = users[user]["cart"];//local cart variable
    let total = 0;//the total 
    // console.log(ct);

    // console.log(ct);

    for (key in ct){//loops over the cart
        // console.log(shops[ct[key][0]]["catalog"]);
        total+=shops[ct[key][0]]["catalog"][ct[key][1]]["price"]*ct[key][2];
        // console.log("total: "+total);
    } 
    // console.log(total);
    return total;
};


console.log("before cart total");
let to = cartTotal();
console.log(to);
// cartTotal()

function displayTotal(total_div){
    console.log("testing");
    let t = cartTotal();
    let result ="";
    result += `<p>Total: ${t}</p>`;
    document.getElementById(total_div).innerHTML = result;
}

displayTotal("zara_total");


function loadCartItems(cart_div) {
    document.getElementById(cart_div).innerHTML = "";
    let result = "";
    const ratings = [];  // To store ratings and corresponding element IDs

    for (const product in users[user]["cart"]) {
        if (!users[user]["cart"][product][3]) {
            const st = users[user]["cart"][product][0];
            const i = users[user]["cart"][product][1];
            const item = shops[st]["catalog"][i];
            const ratingId = `rating-${st}-${i}`;  // Unique ID for the rating span
            ratings.push({id: ratingId, rating: item.rating});  // Store rating info

            result += `<div class="flex-container">
                        <img src="${item.image}" alt="${item.item_name}" style="margin-top: -20px; width: 159px; height: 190px;">
                        <div id="itembox">
                            <div id="${st},${i},del"> 
                                <p>Name: ${item.item_name}</p> 
                                <p>Store: ${shops[st]["name"]} </p>
                                <span class="star-rating" id="${ratingId}">Rating: ${item.rating}</span> 
                                <p id="size">Size: Large</p> 
                                <p id="Price">Price: $${item.price}</p>
                                <p>Amount: ${users[user]["cart"][product][2]}</p>
                            </div>
                            <button id="${st},${i},button"  onclick="put_instore([${st},${i},${users[user]["cart"][product][2]}],'${st},${i},del')">To Instore</button><br></br>
                        </div>
                        </div>`;
        }
    }

    document.getElementById(cart_div).innerHTML = result;
   
    // Replace placeholders with star elements
    for (const {id, rating} of ratings) {
        showRating(rating, id);
    }
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

loadCartItems("zara_cart");

function loadzara(){
    displayTotal("zara_total");
    loadproducts(0,"zara_products");
    loadCartItems("zara_cart");


}

function spec_cart(s,cart_div){
    ocument.getElementById(cart_div).innerHTML = "";
    let result = ""
    result += "<h2>cart</h2>";
    console.log(users[user]["cart"]);

    for (product in users[user]["cart"]){
        console.log("fire");
        let st = users[user]["cart"][product][0];
        if (st==s){
            let i = users[user]["cart"][product][1];
            let item = shops[st]["catalog"][i];
            result += ` <div> <p>"name: "${item.item_name}</p> <p>Store: ${shops[st]["name"]}; M</p> <p>Size: Large</p> <p>Price: $${item.price}</p> </div>`;
        }
    };

    document.getElementById(cart_div).innerHTML = result;
}

displayTotal("cart_total");

document.addEventListener("DOMContentLoaded", function() {
    loadCartItems("cart_div");

});

//input is a list [store_id,item_id],amount
function instoreCheck(li,check_id) {
    
    for (item in users[user]["cart"]){
        if (users[user]["cart"][item][1]==li[1]&&users[user]["cart"][item][0]==li[0]){//checks the store id and item id of the item in order to make sure its the right item
            if (document.getElementById(check_id).checked){
                users[user]["cart"][item][3]=true;
            }
            else {
                users[user]["cart"][item][3]=false;
            }
            
            load_instore("inStoreContent");
            
            // else if (users[user]["cart"][item][3]==true ){
            //     users[user]["cart"][item][3]=false;
            // }
            // else{
            //     users[user]["cart"][item][3]=true;
            // }
        }
    }
    // console.log(users[user]["cart"]);
    // console.log(users[user]["cart"][item]);
    
}

function put_instore(li,item_div_id){
    console.log("in cart rann");
    for (item in users[user]["cart"]){
        if (users[user]["cart"][item][1]==li[1]&&users[user]["cart"][item][0]==li[0]){//checks the store id and item id of the item in order to make sure its the right item
            
            users[user]["cart"][item][3]=true;
            let temp = document.getElementById(item_div_id);
            // temp.remove;

            load_instore("inStoreContent");
            loadCartItems("document.getElementById(cart_div).innerHTML = result;");
        }
    }
}

function put_indelivery(li,item_div_id){
    for (item in users[user]["cart"]){
        if (users[user]["cart"][item][1]==li[1]&&users[user]["cart"][item][0]==li[0]){//checks the store id and item id of the item in order to make sure its the right item
            
            users[user]["cart"][item][3]=false;
            let temp = document.getElementById(item_div_id);
            // temp.remove;
            load_instore("inStoreContent");
            loadCartItems("cart-section");
                
        }
    }
}

function load_instore(in_div){
    console.log("instore started loading");
    document.getElementById(in_div).innerHTML = "";
    let result = "";

    for (product in users[user]["cart"]){
        if (users[user]["cart"][product][3]==true){
            let st = users[user]["cart"][product][0];
            let i = users[user]["cart"][product][1];
            let item = shops[st]["catalog"][i];
            result += ` <div id="${st+","+i},st">  <p>"name: "${item.item_name}</p> <p>Store: ${shops[st]["name"]}; M</p> <p>Size: Large</p> <p>Price: $${item.price}</p><p>Amount: ${users[user]["cart"][product][2]}</p>`;
            // result += `<input id="${st},${i},check"  type="checkbox" onchange=instoreCheck([${st},${i},${users[user]["cart"][product][2]}],${"\""+st+","+i+",check\""})><label>in store</label><br></br>`;
            result += `<button id = "${st},${i},button"  onclick=put_indelivery([${st},${i},${users[user]["cart"][product][2]}],"${st+","+i},st")>To Instore</button><br></br></div>`;
        }
    }

    console.log("instore loaded");
    
    document.getElementById(in_div).innerHTML = result;

    // for (product in users[user]["cart"]){
    //     if (users[user]["cart"][product][3]==true){
    //         let st = users[user]["cart"][product][0];
    //         let i = users[user]["cart"][product][1];
    //         let item = shops[st]["catalog"][i];

    //         console.log("\""+st+","+i+",check\"");
    //         document.getElementById(`${"\""+st+","+i+",check\""}`).checked = true;
    //     }
    // }
}


document.addEventListener("click", function () {
    loadCartItems("cart-section");
    load_instore("inStoreContent");
      
});



  