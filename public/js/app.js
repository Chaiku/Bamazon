$(function () {

    let cartArray = [];

    const render = function(products) {
        $('#prodTable').empty();
        for (i = 0; i < products.length; i++) {
            $('#prodTable').append(`
                <tr>
                    <th scope="row" class="productID">${products[i].id}</th>
                    <td class="product_name">${products[i].product_name}</td>
                    <td class="department_name">${products[i].department_name}</td>
                    <td class="price">${products[i].price}</td>
                    <td class="stock_quantity">${products[i].stock_quantity}</td>
                    <td class="purchase_quantity"><input id="qtyId${products[i].id}" data-prodID="${products[i].id}" type="number" name="quantity" min="0" max="${products[i].stock_quantity}"></input></td>
                    <td class="addCart"><button class="btn-success addToCart" id="addId${products[i].id}" data-prodID="${products[i].id}" data-stockQty="${products[i].stock_quantity}" data-prodName="${products[i].product_name}" data-price="${products[i].price}">Add to Cart</button></td>
                </tr>
            `);
            document.getElementById(`addId${products[i].id}`).addEventListener("click", addToCart);
        }
    }

    const renderProducts = function () {
        console.log("i'm working")
         $.ajax({
            method: 'GET',
            url: '/api/products',
        }).then(function (data) {
            console.log(data);
            render(data);
        });
        console.log("I worked");
    }

    renderProducts();


    const addToCart = function(e) {
        e.preventDefault();

        console.log("This is working");
        let updateID = $(this).attr('data-prodID');
        let purchaseName = $(this).attr('data-prodName');
        let totalQty = $(this).attr(`data-stockQty`);
        let purcPrice = $(this).attr(`data-price`);
        let subtractQty = ($(`#qtyId${updateID}`).val());
        

    if (totalQty >= subtractQty && totalQty !== 0) {
        let updatedQty = totalQty - subtractQty;
        console.log(updatedQty);
        const newPurchase = {
            purchaseName: purchaseName,
            purchaseQty: subtractQty,
            purchasePrice: purcPrice * subtractQty
        }
        cartArray.push(newPurchase);
        $.ajax({
            method: 'PUT',
            url: `/api/products/${updateID}`,
            data: {
                "stock_quantity": updatedQty
            }
        }).then(function(data) {
            console.log(data);
            $(`#qtyId${updateID}`).val("");
            renderProducts();
           
        });
        } else {
            alert("We do not have any more in stock.");
        }
    
    };




    const viewCart = function(event) {
        event.preventDefault();
        $('#cart').empty();
        for (i = 0; i < cartArray.length; i++) {
            $('#cart').append(`
                <tr>
                    <th scope="row" class="cartProd">${cartArray[i].purchaseName}</th>
                    <td class="cartQty">${cartArray[i].purchaseQty}</td>
                    <td class="cartPrice">${cartArray[i].purchasePrice}</td>
                <tr>
            `)
        }

    }

   






    $('#checkout').on("click", viewCart)


});