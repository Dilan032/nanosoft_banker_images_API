const db1 = require('../database');
const db2 = require('../database');

exports.get_customer_info = (req, res) => {

    const info = req.body; // get data from client

    // Check if client data is provided
    if (!info.CustomerID) {
        return res.status(400).json({ message: 'Provide the customer ID' });
    }

    // Check if CustomerID avalabal in the database
    db1.query('SELECT CustomerID FROM customer_images', (error, result) => {
        if (error) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error on server');
        } else {
            if (result.length === 0) return res.status(404).json({ message: 'Customer ID not found' });
        }

        // get customer name from database 2 (using CustomerID)
        db2.query('SELECT CustomerName FROM customerinformation WHERE CustomerID = ?', [info.CustomerID], (error, result) => {
            if (error) {
                console.error('Error executing query', err.stack);
                res.status(500).send('Error on server');
            } else {
                if (result.length === 0) return res.status(404).json({ message: 'Customer Name not found' });
            }
        }); 
 
        res.status(200).json({ result });

    });
};