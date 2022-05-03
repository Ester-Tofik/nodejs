
function getProductsFromSS() {
    let cart = localStorage.getItem('cart');
    if (cart) {
        var list = JSON.parse(cart);
        for (let i = 0; i < list.length; i++) {
            if (list[i][1] > 0)
                drawProduct(list[i][0], list[i][1]);
        }
    }
}

function drawProduct(product, ammuont) {
    var elmnt = document.getElementById("temp-row");
    var cln = elmnt.content.cloneNode(true);
    var url = "../Images/" + product.image.toString() + ".JPG";
    cln.querySelector(".image").style.backgroundImage = "url(" + url + ")";
    cln.querySelector(".itemName").innerHTML = product.name;
    cln.querySelector(".descriptionColumn").innerHTML = product.name + ": " + product.descr;
    cln.querySelector(".price").innerHTML = (product.price * ammuont) + ' ₪';
    cln.querySelector(".ammountItem").innerHTML = ammuont;
    //cln.querySelector(".itemNumber").innerHTML = product.id.toString();
    cln.querySelector(".aaaa").addEventListener("click", () => {
        DeleteItem(product);
    });
    document.getElementById("itemCount").innerHTML = parseInt(document.getElementById("itemCount").innerText) + ammuont;
    document.getElementById("totalAmount").innerHTML = parseInt(document.getElementById("totalAmount").innerText) + product.price * ammuont;
    localStorage.setItem('totalAmount', document.getElementById("totalAmount").innerHTML);
    document.getElementById("items").appendChild(cln);
}

function DeleteItem(p) {
    let list = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < list.length; i++) {
        if (list[i][0]._id == p._id) {
            if (list[i][1] > 1) {
                list[i][1]--;
                var ammount = list[i][0].price;
                break;
            }
            else {
                let tmpCart1 = list.slice(0, i);
                let tmpCart2 = list.slice(i + 1, list.length);
                list = tmpCart1.concat(tmpCart2);
                break;
            }
        }
    }
    localStorage.setItem('totalAmount', localStorage.getItem('totalAmount') - ammount);
    localStorage.setItem('cart', JSON.stringify(list));
    window.location.href = "";
    getProductsFromSS();

}

function placeOrder() {
    let items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        for (let i = 0; cart[i][0] != null; i++) {
            let item = {
                productId: (cart[i][0])._id,
                quantity: cart[i][1]
            }
            items.push(item);
        }
        let user = JSON.parse(sessionStorage.getItem('currentUser'));
        let order = {
            orderDate: new Date(),
            orderSum: localStorage.getItem('totalAmount'),
            userId: user._id,
            orderItems: items
        }
        fetch("../api/Order/", {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify(order)
        })
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    console.log('post');
            })
            .then(data => {
                if (data) {
                    console.log(data)
                    alert('ההזמנה מספר' + ' ' + data._id.toString() + ' ' + 'בוצעה בהצלחה' + '👏👏👏');
                    localStorage.clear();
                    window.location.href = "../html/Products.html";
                }
                else
                    alert("command unsucssesfuly🤢");
            }).catch(() => {

            }
            )


    }
    else {
        alert("Sorry😒, you can't place the order without products ");
    }

}