const { db1, db2 } = require('../database');

exports.update_customer_info = (req, res) => {

    const info = req.body; // get data from client

    const cusID = info.CustomerID;
    const pictureValue = info.Picture || null;
    const signatureValue = info.Signature || null;

    // Check if client data is provided
    if (!info || Object.keys(info).length === 0) {
        return res.status(400).json({ message: 'No data provided' });
    }

    if (!cusID) {
        return res.status(400).json({ message: 'Provide the customer ID' });
    }

    // Check if CustomerID avalabal in the database
    db2.query('SELECT CustomerID FROM customerinformation WHERE CustomerID = ?', [cusID], (error, result) => {
        if (error) {
            console.error('Error executing query', error);
            res.status(500).send('Error on server');
        }

        if (result.length === 0) return res.status(404).json({ message: `Customer ID not found (in DB ${process.env.DATABASE_2})` });

        // update customer info
        db1.query('UPDATE customer_images SET Picture = ?, Signature = ? WHERE CustomerID = ?', [pictureValue, signatureValue, cusID], 
        (error, result) => {
            if (error) {
                console.error('Error executing query', error);
                res.status(500).send('Error on server');
            } 
                
            if (result.affectedRows === 0) return res.status(404).json({ message: `Customer ID not found (in DB ${process.env.DATABASE_1})` });

            console.log('CustomerID : ', cusID);   
            console.log('picture : ', pictureValue, signatureValue);   
            console.log('signature : ', signatureValue);  
             
            res.status(200).json({ message: 'Customer infomation updated' });

        });
    });
};