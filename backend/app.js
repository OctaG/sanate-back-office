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

app.post('/uploadProduct', (req, res) => {
   var params = {
        TableName: "sanate_productos",
        Item: {
            "id": req.query.id,
            "name":  req.query.name,
            "section":  req.query.section,
            "price":  req.query.price,
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add product", ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded");
       }
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
