// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.



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

function loadproducts(store){
    let cat = store.catalog;
    let result = ""
    

    // for each product
    Object.keys(cat).forEach(id =>{
        item = cat[id]
        console.log(item)

        //adds in the indevidual clothing items
        result += `<img src="path/to/image" alt="Black Shirt" width="50"></img> <div> <p>${item.item_name}</p> <p>Store: ${store.name}; M</p> <p>Size: Large</p> <p>Price: $${item.amount}</p> </div>`
        
        // var x = document.getElementById("+");

    });
    // `<img src="path/to/image" alt="Black Shirt" width="50"></img>' '<div> <p>Black Shirt</p> <p>Store: H &amp; M</p> <p>Size: Large</p> <p>Price: $20</p> </div>`

    document.getElementById("zara_products").innerHTML = result;


}

loadproducts(shops[0])

