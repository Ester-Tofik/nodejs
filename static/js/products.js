
var C = [0,0,0];
function getProduct() {
    fetch('../api/Product/')
        .then(response => {
            if (response.ok && response.status == 200)
                console.log("???????", response)
                return response.json();
        })
        .then(data => {
            if (data) {
                data.forEach(p => {
                    drowProduct(p);
                    C[p.category] = C[p.category]+1;
                });
               getcategory();
            }
            else {
                alert("we dont have a products");
            }
        })
    let list = JSON.parse(localStorage.getItem('cart'));
    if (list) {
        let count = 0;
        for (let i = 0; list[i][0] != null; i++) {
            count += list[i][1];
            console.log();
        }
        document.getElementById("ItemsCountText").innerHTML = count.toString();
    }    
    cleanAll();
}

function drowProduct(product) {
    var elmnt = document.getElementById("temp-card");
    var cln = elmnt.content.cloneNode(true);
    cln.querySelector("h1").innerText = product.name;
    cln.querySelector(".price").innerText = product.price+ ' שח';
    cln.querySelector(".description").innerText = product.descr;
    cln.querySelector("img").src = "../Images/" + product.image.toString() + ".jpg";
    cln.querySelector("button").addEventListener("click", p => {
        addToCart(product);
    })
    document.getElementById("PoductList").appendChild(cln);
}

function getcategory() {
    fetch('../api/category/')
        .then(response => {
            if (response.ok)
                return response.json();
        })
        .then(data => {
            if (data) {
                data.forEach(c => drowcategory(c));
            }
            else {
                alert("we dont have a categories")
            }
        })
}

function drowcategory(category) {
    var elmnt = document.getElementById("temp-category");
    var clone = elmnt.content.cloneNode(true);
    clone.querySelector(".OptionName").innerText = category.categoryName;
    clone.querySelector('.opt').id = category._id;
    clone.querySelector('.opt').addEventListener("change", () => {
        if (document.getElementById(category._id).checked)
            GetProductByCategory(category._id);
        else {
            window.location.href = "";
            getProduct();
        }
    })
    document.getElementById('filters').appendChild(clone);
}

function GetProductByCategory(cat) {
    fetch('../api/Product/' + cat)
        .then(Response => {
            if (Response.ok)
                return Response.json();
            else
                console.log("faild GetProductByCategory");
        })
        .then(data => {
            document.body.removeChild(document.getElementById("PoductList"));
            var div = document.createElement('div');
            div.setAttribute("id", "PoductList")
            document.body.appendChild(div);
            data.forEach(e => drowProduct(e));
        });
}

function addToCart(product) {
    let flag = false;
    var ss = localStorage.getItem('cart');
    if (ss) {
        let i;
        var list = JSON.parse(ss);
        for (i = 0; i < list.length; i++) {
            if (list[i][0] != null) {
                if (list[i][0]._id == product._id) {
                    list[i][1] = list[i][1] + 1;
                    flag = true;
                    break;
                }
            }
            else {
                break;
            }
               
        }
        if (!flag) {
                list[i][0] = product;
                list[i][1] = 1;
        }
        localStorage.setItem('cart', JSON.stringify(list));
        let count = 0;
        for (let i = 0; list[i][0] != null; i++) {
            count +=  list[i][1];
            console.log();
        }
        document.getElementById("ItemsCountText").innerHTML = count.toString();
    }
    else {
        let cart = [];
        for (let i = 0; i < 10 ; i++) {
            cart[i] = [];
        }
        cart[0][0] = product;
        cart[0][1] = 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById("ItemsCountText").innerHTML = 1;
    }
}

function cleanAll() {
    document.getElementById("Clear").addEventListener("click", () => {
        localStorage.clear();
        console.log(localStorage.getItem('cart'));
    });
}



