document.getElementById("fetchDataButton").addEventListener("click", async() => {
    // whenever i click on the fetch button then it make the button invisible and started showing the tables
    document.getElementById("fetchDataButton").style.display = "none";
    document.getElementById("table-container").style.display = "block";

    // for fetching data it takes some time bcoz we use setTime out function and also for fetching data it takes sme time untill the dta data fetching we show a loading... text to the user
    document.getElementById("post-body").innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";
    document.getElementById("product-body").innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";
    document.getElementById("todo-body").innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";


    // we call first promise which is fetch the dummy post data and if the post data fetch then it call the displayPostData, if the post data fetched successfully then it fetch product data and call the displayPrductData function then it fetch todos data if it successfully fetched then it call displayTodoData function.At the end it handles the error 
    PromiseAPI1()
    .then((post) => {
        if(post){
            displayPostData(post.posts, "post-body");
            return PromiseAPI2();
        }
       
    })
    .then((product) => {
        if(product){
            displayProductData(product.products, "product-body");
            return PromiseAPI3();
        }
        
    })
    .then((todo) => {
        if(todo){
            displayTodoData(todo.todos, "todo-body");
        }

    })
    .catch((error) => {
        console.error("Error fetching data:" , error);
    })
})

// this function fetch the dummy post data
function PromiseAPI1(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const post = fetchDummyData("https://dummyjson.com/posts");
            resolve(post);
        }, 1000);
    });
}

// this function fetch the dummy product data
function PromiseAPI2(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = fetchDummyData("https://dummyjson.com/products");
            resolve(product);
        }, 2000)
    })
}

// this function fetch the dummy todos
function PromiseAPI3(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const todo = fetchDummyData("https://dummyjson.com/todos");
            resolve(todo);
        }, 3000)
    })
}

// this function takes a url and fetch the dummy data which is used in the promises
async function fetchDummyData(url) {
    try {
        const response = await fetch(url)

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// for different types of data i make 3 different function to display the

// this function receive the data which i want to display and also rcv a containerId i which i want to display my data
function displayPostData(data, containerId){
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    data.forEach((item) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.id}</td>
            <td class="student-name">${item.title}</td>
            <td>${item.views}</td>
            <td>${item.reactions.likes}</td>
            <td>${item.reactions.dislikes}</td>
        `;

        container.appendChild(row);

    })
}

// this function receive the data which i want to display and also rcv a containerId i which i want to display my data
function displayProductData(data, containerId){
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    data.forEach((item) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.id}</td>
            <td class="student-name">
                <img src=${item.images} alt="" class="student-image">
                <span>${item.title}</span>
            </td>
            <td>${item.category}</td>
            <td>${item.rating.toFixed(1)} / 5</td>
            <td>$${item.price}</td>
        `;

        container.appendChild(row);

    })
}

// this function receive the data which i want to display and also rcv a containerId i which i want to display my data
function displayTodoData(data, containerId){
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    data.forEach((item) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.id}</td>
            <td class="student-name">${item.todo}</td>
            <td>${item.completed}</td>
            
        `;

        container.appendChild(row);

    })
}

