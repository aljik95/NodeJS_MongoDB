
const Customer = require('../models/customer')

//Save Customer
const cust_register_index  = (req,res) =>{
    const cust = new Customer(req.body);
    cust.save().then((result) => res.redirect('/cust_list')).catch((err) => console.log(err));
}

module.exports = {cust_register_index}