const db2 = require('../database');

exports.update_customer_info = (req, res) => {

    const info = req.body; // get data from client
    const cusID = info.CustomerID;

    // Check if client data is provided
    if (!Data || Object.keys(info).length === 0) {
        return res.status(400).json({ message: 'No data provided' });
    }

    // Check if CustomerID avalabal in the database
    db2.query('UPDATE customer_images SET Picture = ?, Signature = ? WHERE CustomerID = ?', [pictureValue, signatureValue, cusID], 
    (error, result) => {
        if (error) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error on server');
        } else {
            if (result.length === 0) return res.status(404).json({ message: 'Customer ID not found' });
        }

        res.status(200).json({ message: 'Customer info updated' });

    });
};