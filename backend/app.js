const express = require('express')
const app = express()
const port = 3000

var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

var docClient = new AWS.DynamoDB.DocumentClient();

app.get('/getAllOrders', (req, res) => {

    var table = "sanate_ordenes";

    var params = {
        TableName: table,
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            res.send("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

app.get('/getAllProducts', (req, res) => {

    var table = "sanate_productos";

    var params = {
        TableName: table,
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            res.send("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

app.get('/getProductsOfOrder', (req, res) => {
    var params = {
        TableName: "sanate_products_per_order",
        Key:{
            "id": req.query.id,
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            res.send("Unable to read item. Error JSON:", JSON.stringify(err));
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

app.get('/getProductInfo', (req, res) => {
   var params = {
        TableName: "sanate_productos",
        Key:{
            "id": req.query.id,
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            res.send("Unable to read item. Error JSON:", JSON.stringify(err));
        } else {
            res.send(JSON.stringify(data));
        }
    });
});

app.post('/putProduct', (req, res) => {
   var params = {
        TableName: "sanate_productos",
        Item: {
            "id": req.query.id,
            "price": req.query.price,
            "pname":  req.query.pname,
            "description":  req.query.description,
            "inventory":  JSON.parse(req.query.inventory),
            "image": req.query.image,
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add product", ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           res.send("Put Product succeeded");
       }
    });
});

app.post('/updateProduct', (req, res) => {
    console.log(req.query);
    var params = {
        TableName: "sanate_productos",
         Key:{
            "id": req.query.id,
        },
        UpdateExpression: "set pname = :n, price = :p, description = :s, inventory = :i, image = :m",
        ExpressionAttributeValues: {
            ":n": req.query.pname,
            ":p": req.query.price,
            ":s": req.query.description,
            ":i": JSON.parse(req.query.inventory),
            ":m": req.query.image,
        },
        ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params, function(err, data) {
       if (err) {
           console.error("Unable to update product", ". Error JSON:", JSON.stringify(err));
       } else {
           console.log("Update succeeded");
           res.send("Update product succeeded");
       }
    });
});

app.post('/deleteProduct', (req, res) => {
   var params = {
        TableName: "sanate_productos",
       Key:{
            "id": req.query.id,
        },
    };
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send("DeleteItem succeeded");
        }
    });
});

app.post('/putOrder', (req, res) => {
   console.log(req.query);
   var params_for_order_creation = {
        TableName: "sanate_ordenes",
        Item: {
            "sanate_ordenes": req.query.id,
            "customer":  req.query.customer,
            "address":  req.query.address,
            "total":  req.query.total,
            "date":  req.query.date,
            "orderState":  req.query.orderState,
        }
    };

    var params_for_products_per_order = {
        TableName: "sanate_products_per_order",
        Item: {
            "id": req.query.id,
            "products":  JSON.parse(req.query.products),
        }
    };

    docClient.put(params_for_order_creation, function(err, data) {
       if (err) {
           console.error("Unable to add order",  "Error JSON:", JSON.stringify(err));
       } else {
           console.log("Put order succeeded");
       }
    });

    docClient.put(params_for_products_per_order, function(err, data){
       if (err) {
           console.error("Unable to add products per order",  "Error JSON:", JSON.stringify(err));
       } else {
           console.log("Put products per order succeeded");
       }
    });
});


app.post('/changeOrderStatus', (req, res) => {
    var params = {
        TableName: "sanate_ordenes",
         Key:{
            "sanate_ordenes": req.query.id,
        },
        UpdateExpression: "set orderState = :s",
        ExpressionAttributeValues: {
            ":s": req.query.status,
        },
        ReturnValues:"UPDATED_NEW"
    };
    docClient.update(params, function(err, data) {
       if (err) {
           console.error("Unable to cancel order", ". Error JSON:", JSON.stringify(err));
       } else {
           console.log("Order cancelled");
           res.send("Order cancelled");
       }
    });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});
