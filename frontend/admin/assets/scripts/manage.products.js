const dataTable = document.querySelector(".data-table");
// console.log(dataTable);

function getProducts() {
    fetch("http://localhost:7773/api/product/get-all-products")
        .then(async res => await res.json())
        .then(data => {
            // console.log(data);
            showProducts(data.data)
        }).catch(err => {
            console.log(err);
        })
}

getProducts()


const showProducts = (products) => {
    // console.log(products);
    products.forEach((product,idx) => {
        // console.log(product,idx);
        let tBody = document.createElement("tbody");
        tBody.innerHTML = `<tr>
        <td><img src="../${product.image}" class="product-img"></td>
        <td>${++idx}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>₹${product.price}</td>
        <td class="table-actions">
        <a href="edit_product.html?id=${product._id}" style="color: var(--gold-finger); margin-right: 15px; font-size: 1rem;" title="Edit">edit
        <i class="fas fa-edit"></i>
        </a>
        
        <a href="manage_products.html?delete=${product._id}" onclick="return confirm('Are you sure?')" style="color: #ef4444; font-size: 1rem;" title="Delete">Delete
        <i class="fas fa-trash"></i>
        </a>
        </td>
        </tr>`;
        dataTable.appendChild(tBody)
    });
}
