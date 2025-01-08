const { db1, db2 } = require('../database');

exports.get_customer_info = (req, res) => {

    const info = req.body; // get data from client

    // Check if client data is provided
    if (!info.CustomerID) {
        return res.status(400).json({ message: 'Provide the customer ID' });
    }

    // Check if CustomerID avalabal in the database
    db1.query('SELECT CustomerID, Picture, Signature FROM customer_images WHERE CustomerID = ?', [info.CustomerID], (error, resultDB1) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).send('Error on server');
        } else {
            if (resultDB1.length === 0) return res.status(404).json({ message: `Customer ID not found (in DB ${process.env.DATABASE_1})`, validCustomer : false });
        }



        const Picture = resultDB1[0].Picture;
        const Signature = resultDB1[0].Signature;

        // get customer name from database 2 (using CustomerID)
        db2.query('SELECT CustomerID, CustomerName, NIC FROM customerinformation WHERE CustomerID = ?', [info.CustomerID], (error, resultDB2) => {
            if (error) {
                console.error('Error executing query', err.stack);
                res.status(500).send('Error on server');
            } else {
                if (resultDB2.length === 0) return res.status(404).json({ message: `Customer ID not found (in DB ${process.env.DATABASE_2})`, validCustomer : false });
            }

            // fetch the customer name and id
            const customerName = resultDB2[0].CustomerName;
            const customerID = resultDB2[0].CustomerID;
            const NIC = resultDB2[0].NIC;

            res.status(200).json({ CustomerID: customerID, CustomerName: customerName, NIC: NIC, validCustomer : true, Picture: Picture, Signature: Signature });
        }); 
 
    });
};