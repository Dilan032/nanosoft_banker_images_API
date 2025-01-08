const { db1, db2 } = require('../database');
const { getDateAndTime } = require('../function/getDateAndTime'); // Import the function

exports.update_customer_info = (req, res) => {
    const info = req.body; // Get data from client

    const cusID = info.CustomerID;
    const pictureValue = info.Picture || null;
    const signatureValue = info.Signature || null;
    const UserID = info.UserID; // Get the Logging User ID
    const currentDateAndTime = getDateAndTime(); // Get the current date and time

    // Check if client data is provided
    if (!info || Object.keys(info).length === 0) {
        return res.status(400).json({ message: 'No data provided' });
    }

    if (!cusID) {
        return res.status(400).json({ message: 'Provide the customer ID' });
    }

    if (!UserID) {
        return res.status(400).json({ message: 'Provide the Logging User ID' });
    }

    // Check if CustomerID exists in the database
    db2.query('SELECT CustomerID FROM customerinformation WHERE CustomerID = ?', [cusID], (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).send('Error on server');
        }

        if (result.length === 0) {
            return res.status(404).json({ message: `Customer ID not found (in DB ${process.env.DATABASE_2})` });
        }

        // Update customer info
        db1.query(
            'UPDATE customer_images SET Picture = ?, Signature = ? WHERE CustomerID = ?',
            [pictureValue, signatureValue, cusID],
            (error, result) => {
                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).send('Error on server');
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: `Customer ID not found (in DB ${process.env.DATABASE_1})` });
                }
                     

                // Insert log for updated customer images
                db1.query(
                    'INSERT INTO old_images (CustomerID, OldImage, UpdatedIn, ChangedUserID) VALUES (?, ?, ?, ?)',
                    [cusID, pictureValue, currentDateAndTime, UserID],
                    (error, result) => {
                        if (error) {
                            console.error('Error executing query:', error);
                            return res.status(500).send('Error on server');
                        }

                        console.log('CustomerID:', cusID);
                        console.log('Picture:', pictureValue);
                        console.log('Signature:', signatureValue);
                        console.log('UserID:', UserID);
                        console.log('UpdatedIn:', currentDateAndTime);

                        res.status(200).json({ message: 'Customer information updated' });
                    }
                );
            }
        );
    });
};
