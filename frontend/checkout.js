
document.addEventListener("DOMContentLoaded", () => {

    const OrderTotalprice = document.querySelector('#order-total-price');
    const orderItemsList = document.querySelector('#order-items-list');
    const form = document.querySelector('#checkout-form');

    const cart = JSON.parse(localStorage.getItem("foodieCart")) || [];
    console.log("cart", cart)

    const displayOrderSummary = () => {
        orderItemsList.innerHTML = '';
        let totalAmount = 0;

        if (cart.length === 0) {
            orderItemsList.innerHTML = '<p>Your cart is empty.</p>'
            OrderTotalprice.textContent = "₹0.00";
            return
        }

        cart.forEach((item) => {
            const itemPrice = parseFloat(item.price) * item.quantity;
            totalAmount += itemPrice

            const itemElement = document.createElement('div')
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                                    <span>${item.name} (x${item.quantity})</span>   
                                     <strong>₹${itemPrice.toFixed(2)}</strong>
                                `;
            orderItemsList.appendChild(itemElement)
        });
        OrderTotalprice.textContent = `₹${totalAmount.toFixed(2)}`

    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = document.querySelector('#name').value;
        const address = document.querySelector('#address').value;
        const phone = document.querySelector('#phone').value


        const data = {
            name,
            address,
            phone: parseInt(phone)
        }

        fetch("http://localhost:3000/api/order/place-order",{
            method:"POST",
            headers :{"Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify(data)
        }).then((res)=> res.json()).then((data)=>console.log(data))
    })

    displayOrderSummary()
})



