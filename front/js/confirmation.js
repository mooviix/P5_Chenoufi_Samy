let url = new URL (document.location);
let id = url.searchParams.get("orderId");
let order = document.querySelector("#orderId");

order.textContent = id;