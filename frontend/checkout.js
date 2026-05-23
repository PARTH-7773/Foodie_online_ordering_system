
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
            phone,
            cart
        }



        const payBtn = document.querySelector(".btn");
        payBtn.innerText = "Verifying Card Details...";
        payBtn.style.background = "#ccc";
        payBtn.disabled = true;

        setTimeout(() => {
            payBtn.innerText = "Processing Payment...";
            setTimeout(() => {
                // 3. Create a Fake Transaction ID
                const fakePaymentId =
                    "pay_" + Math.random().toString(36).substr(2, 9);
            }, 1500);
        }, 1500);

        fetch("http://localhost:7773/api/order/place-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data)
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    Swal.fire({
                        title: "Order Place",
                        text: 'Your food is on the way',
                        icon: "success",
                        confirmButtonColor: "#ff9800"
                    }).then(() => {
                        localStorage.removeItem("foodieCart");
                        window.location.href = "my-orders.html"
                    })
                } else {
                    // Backend error 
                    Swal.fire({
                        title: "Order feiled",
                        text: data.message[0]?.msg || data.message || "We couldn't procsess order right now.",
                        icon: "error",
                        confirmButtonColor: "#d33"
                    });
                    payBtn.innerText = 'Pay & Place Order';
                    payBtn.disabled = false;
                    payBtn.style.background = 'var(--gold-finger)'
                }
            }).catch(err => {
                // Network error:the server is down on the internet disconnected.
                console.error("Network Error", err);
                Swal.fire({
                    title: "Connection Error",
                    text: "Could not connect to the server",
                    icon: "error",
                    confirmButtonColor: "#d33"
                })
                payBtn.innerText = 'Pay & Place Order';
                payBtn.disabled = false;
                payBtn.style.background = 'var(--gold-finger)'
            })
    });

    displayOrderSummary()
})



