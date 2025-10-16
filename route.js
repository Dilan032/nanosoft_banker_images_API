const express = require('express');
const router = express.Router();

// Import the controllers
const get_customer_name_controller = require('./controllers/get_customer_info_controller');
const update_customer_info_controller = require('./controllers/update_customer_info_controller');
const loginController = require('./controllers/auth/loginController');

//web api working fine
router.get('/', (req, res) =>{
    res.send('api working fine');
})

// login
router.post('/login', loginController.login);

// show Customer ID and get Customer Name
router.get('/Customer-info' ,get_customer_name_controller.get_customer_info);

// update Customer info
router.put('/Customer-info-update' ,update_customer_info_controller.update_customer_info);



// Export the router
module.exports = router;