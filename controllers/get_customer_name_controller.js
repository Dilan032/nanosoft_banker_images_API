const { db1, db2 } = require('../database');

exports.get_customer_info = (req, res) => {

    const info = req.body; // get data from client

    // Check if client data is provided
    if (!info.CustomerID) {
        return res.status(400).json({ message: 'Provide the customer ID' });
    }

    // Check if CustomerID avalabal in the database
    db1.query('SELECT CustomerID FROM customer_images WHERE CustomerID = ?', [info.CustomerID], (error, result) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).send('Error on server');
        } else {
            if (result.length === 0) return res.status(404).json({ message: `Customer ID not found (in DB ${process.env.DATABASE_1})` });
        }

        // get customer name from database 2 (using CustomerID)
        db2.query('SELECT CustomerID, CustomerName FROM customerinformation WHERE CustomerID = ?', [info.CustomerID], (error, result) => {
            if (error) {
                console.error('Error executing query', err.stack);
                res.status(500).send('Error on server');
            } else {
                if (result.length === 0) return res.status(404).json({ message: `Customer ID not found (in DB ${process.env.DATABASE_2})` });
            }

            // fetch the customer name and id
            const customerName = result[0].CustomerName;
            const customerID = result[0].CustomerID;

            res.status(200).json({ CustomerID: customerID, CustomerName: customerName,});
        }); 
 
    });
};