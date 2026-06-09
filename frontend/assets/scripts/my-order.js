
document.addEventListener("DOMContentLoaded", () => {


    const orders_container = document.querySelector(".orders-container");

    // console.log(orders_container);

    let order_item_detail;


    const getOrders = async () => {
        try {
            const response = await fetch('https://foodiecom.vercel.app/api/order/my-orders', {
                credentials: "include"
            }).then(async res => {
                let data = await res.json()
                // console.log(data);

                if (data.success && data.data && data.data?.length > 0) {
                    order_item_detail = data.data;
                    showOrders()
                } else {
                    let div = document.createElement('div');
                    div.classList.add("text-center");
                    div.innerHTML = `
                         <h3>No orders found.</h3>
                        <p>Go ahead and order some delicious food!</p>
                        <br>
                        <a href="index.html" class="btn">View Menu</a>`
                    orders_container.appendChild(div);
                }
            })
        } catch (error) {
            console.log(error);
        }

    }

    const showOrders = () => {
        order_item_detail.map((order, idx) => {
            // console.log(order, idx);
            let div = document.createElement('div')
            div.classList.add('order-card')
            // console.log(idx,order_item_detail);
            div.innerHTML = `
            <div class="order-header">
                    <div>
                        <strong>Order #${order._id}
                        </strong><br>
                        <small style="color: gray;">
                            ${order.createdAt.split("T")[0]} 
                        </small>
                    </div>
                    <div>
                        <span class="order-status">Received</span>
                    </div>
            </div>`;
            orders_container.appendChild(div);

            let order_item = document.createElement('div');
            order_item.classList.add('order-items');
            order_item.innerHTML = `<ul class = 'order-detail'></ul>`;
            `${order.Orders.map((i, idx) => {
                // console.log(i, idx);
                let li = document.createElement('li');
                li.innerHTML = `
                                ${i.quantity}x
                                ${i.productDetails.name}
                                <span class='order-item-middle'>₹
                                ${i.price.$numberDecimal}
                                </span>`

                order_item.appendChild(li)
            }
            )};`

            div.appendChild(order_item);

            let hr = document.createElement("hr")
            hr.className = 'hr-line';
            div.appendChild(hr)
            let totalPrice = document.createElement('div');
            totalPrice.classList.add("total-price");
            totalPrice.innerText = `Total: ₹ ${order.total_price.$numberDecimal}`
            div.appendChild(totalPrice);

            // `
            //     <div class="total-price">
            //             
            //             <?php echo number_format($order['total_amount'], 2); ?>
            //     </div>`;

        })
    };

    getOrders()

})
