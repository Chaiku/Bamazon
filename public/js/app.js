$(function () {

    let cartArray = [];

    const render = function(products) {
        for (i = 0; i < products.length; i++) {
            $('tbody').append(`
                <tr>
                    <th scope="row" class="productID">${products[i].id}</th>
                    <td class="product_name">${products[i].product_name}</td>
                    <td class="department_name">${products[i].department_name}</td>
                    <td class="price">${products[i].price}</td>
                    <td class="stock_quantity">${products[i].stock_quantity}</td>
                    <td class="purchase_quantity"><input id="qtyId${products[i].id}" data-prodID="${products[i].id}" type="number" name="quantity" min="0" max="${products[i].stock_quantity}"></input></td>
                    <td class="addCart"><button class="btn-success addToCart" id="addId${products[i].id}" data-prodID="${products[i].id}">Add to Cart</button></td>
                </tr>
            `);
            document.getElementById(`addId${products[i].id}`).addEventListener("click", addToCart);
        }
    }

    $.ajax({
        method: 'GET',
        url: '/api/products',
    }).then(function (data) {
        console.log(data);
        render(data);
    });


    const addToCart = function(e) {
        e.preventDefault();
        console.log("This is working");
        let updateID = $(this).attr('data-prodID');
        console.log(updateID);
        let updateQty = ($(`#qtyId${updateID}`).val());
        console.log(updateQty);

        

        $.ajax({
            method: 'PUT',
            url: `/api/products/:${updateID}`,
            data: {
                "stock_quantity": this.stock_quantity - updateQty
            }
        }).then(function(data) {
            console.log(data);
    
        })
    
    };




    // const viewCart = function() {

    // }

   






    // $('#viewCartBtn').on("click", viewCart)


});