// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

user = 0

//id:{user_name,email,password,cart{id,item_name,price,item_amount,in_store}}
//for cart [store_id,item_id,amount in cart,in_store]
let users = {
    0:{user_name:"mike",email:"mike@you.com",password:"mike123",cart:{0:[0,1,2,false],1:[2,3,4,true]}},
    1:{user_name:"ella",email:"ella@you.com",password:"ella123",cart:{0:[1,1,2,false],1:[2,0,4,true],2:[2,1,4,false]}},
    2:{user_name:"jack",email:"jack@you.com",password:"jack123",cart:{}}}

//id:{store_name,address,catalog:{id,item_name,price,item_amount,in_store,store_id,rating (out of 5)}}
shops = {0:{name:"Zara",address:"123 zara ave",catalog:{
    0:{item_name:"black shirt",price:400,amount:5,in_store:false,store_id:0,rateing:3},
    1:{item_name:"black jeans",price:700,amount:2,in_store:false,store_id:0,rating:5},
    2:{item_name:"blue jeans",price:500,amount:10,in_store:false,store_id:0,rating:3}}},
1:{name:"NorthFace",address:"123 northface ave",catalog:{
    0:{item_name:"black shirt",price:40,amount:4,in_store:false,store_id:1,rating:4},
    1:{item_name:"black jeans",price:75,amount:3,in_store:false,store_id:1,rating:5},
    2:{item_name:"blue jeans",price:501,amount:9,in_store:false,store_id:1,rating:2},
    3:{item_name:"boxer",price:2,amount:45,in_store:false,store_id:1,rating:2}}},
2:{name:"H&M",address:"123 H&M ave",catalog:{
    0:{item_name:"black shirt",price:10,amount:5,in_store:false,store_id:2,rating:5},
    1:{item_name:"black jeans",price:10,amount:2,in_store:false,store_id:2,rating:4},
    2:{item_name:"blue jeans",price:50,amount:10,in_store:false,store_id:2,rating:4},
    3:{item_name:"boots",price:80,amount:6,in_store:false,store_id:2,rating:1}}}}

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

// function loadproducts(store,product_div){
//     let cat = store.catalog;
//     let result = ""
    

//     // for each product
//     Object.keys(cat).forEach(id =>{
//         item = cat[id]
//         console.log(item)

//         //adds in the indevidual clothing items
//         result += `<img src="path/to/image" alt="Black Shirt" width="50"></img> <div> <p>${item.item_name}</p> <p>Store: ${store.name}; M</p> <p>Size: Large</p> <p>Price: $${item.amount}</p> </div>`
        
//         // var x = document.getElementById("+");

//     });
//     // `<img src="path/to/image" alt="Black Shirt" width="50"></img>' '<div> <p>Black Shirt</p> <p>Store: H &amp; M</p> <p>Size: Large</p> <p>Price: $20</p> </div>`

//     document.getElementById(product_div).innerHTML = result;


// }

// loadproducts(shops[0],"zara_products")
// loadproducts(shops[1],"northface_products")
// loadproducts(shops[2],"h&m_products")

function loadproducts(store,product_div){
    console.log(store);
    let st = shops[store]
    let cat = st.catalog;
    
    let result = ""
    

    // for each product
    Object.keys(cat).forEach(id =>{
        item = cat[id];
        // console.log(item);

        //adds in the indevidual clothing items
        result += `<img src="path/to/image" alt="Black Shirt" width="50"></img> <div> <p>${item.item_name}</p> <p>Store: ${store.name}; M</p> <p>Size: Large</p> <p>Price: $${item.amount}</p> </div>`;
        console.log("j1");
        result += `<div><button type="button" id="myBtn" onclick="${addtocart(store,id)}">+</button></div>`;
        console.log("j2");

    });
    // `<img src="path/to/image" alt="Black Shirt" width="50"></img>' '<div> <p>Black Shirt</p> <p>Store: H &amp; M</p> <p>Size: Large</p> <p>Price: $20</p> </div>`

    document.getElementById(product_div).innerHTML = result;


};

loadproducts(0,"zara_products");
loadproducts(1,"northface_products");
loadproducts(2,"h&m_products");

function addtocart(store_id,item_id){

    let incart = false;
    console.log("j3");

   for (const key in users[user]["cart"]){
        console.log("j4");
        if (users[user]["cart"][key][1]==item_id){
            console.log("j5");
            incart=true;

            users[user]["cart"][key][2]=users[user]["cart"][key][2]+1;
            //updatestorecart()

        };
    };

    if (incart==false){
        // addtostorecart();
        let keys = Object.keys(users[user]["cart"]);
        let newkey = keys;
        console.log("before add");
        console.log(users[user]["cart"]);
        users[user]["cart"][keys.length]=[store_id,item_id,1,false]
        console.log("after add");
        console.log(users[user]["cart"]);
    }  

};


// function toggleActive(buttonId) {
//     const buttons = document.querySelectorAll('.toggle-buttons button');
//     buttons.forEach(button => {
//         if (button.id === buttonId) {
//             button.classList.add('active');
//         } else {
//             button.classList.remove('active');
//         }
//     });

//     // Toggle content visibility based on the button pressed
//     const deliveryContent = document.getElementById('main-content');
//     const inStoreContent = document.getElementById('inStoreContent');
//     if (buttonId === 'deliveryButton') {
//         deliveryContent.style.display = 'flex';
//         inStoreContent.style.display = 'none';
//     } else if (buttonId === 'shoppingListButton') {
//         deliveryContent.style.display = 'none';
//         inStoreContent.style.display = 'block';
//     }
// }

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

// function filterStores() {
//     // Get the input value and convert to lowercase for case-insensitive search
//     const query = document.getElementById('storeSearchInput').value.toLowerCase();

//     // Loop through each store in the shops data and filter based on the search query
//     for (const shopId in shops) {
//         const storeName = shops[shopId].name.toLowerCase();
//         const storeElement = document.getElementById(`store-${shopId}`); 

//         if (storeName.includes(query)) {
//             storeElement.style.display = 'block'; // Show the store if it matches the query
//         } else {
//             storeElement.style.display = 'none'; // Hide the store if it doesn't match the query
//         }
//     }
// }

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

// Add event listener to the "Search" button
// document.getElementById('searchButton').addEventListener('click', filterStores);

// document.addEventListener("DOMContentLoaded", function() {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartSection = document.getElementById('cart-section');

//     // Clear cart section first
//     while (cartSection.firstChild) {
//         cartSection.removeChild(cartSection.firstChild);
//     }

//     // Populate the cart section with items from localStorage
//     cart.forEach(productId => {
//         // Here, you would fetch product details by productId (e.g., from an API or a data array)
//         // and then create and append product elements to cartSection
//         // For this example, let's just append a simple text node for each product

//         const productElement = document.createElement('div');
//         productElement.className = 'product';
//         productElement.textContent = "Product ID: " + productId;
//         cartSection.appendChild(productElement);
//     });

//     // Append the checkout section
//     const checkoutDiv = document.createElement('div');
//     checkoutDiv.className = 'checkout';
//     checkoutDiv.innerHTML = '<button>Checkout</button><p>Total: $' + (cart.length * 20) + '</p>'; // Assuming each product costs $20 for simplicity
//     cartSection.appendChild(checkoutDiv);
// });


