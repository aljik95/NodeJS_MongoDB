
const Customer = require('../models/customer')
const CustomerPoints = require('../models/customer_points')
const divisor = require('../models/divisor')

const cust_list_index = (req,res) =>{
    Customer.find().sort({updatedAt: -1})
        .then((result) => {res.render('cust_list',{title :  'Customer',cust : result})})
        .catch((err) => console.log(err));
}

const cust_list_new = (req,res) =>{
    res.render('cust_register',{title : 'New Customer',cust : null});
}

const cust_list_id = (req,res) =>{
    const id = req.params.id;
    CustomerPoints.find({ refID: id }).sort({createdAt: -1})
    .then((resx) => 
        {Customer.findById(id)
            .then((result) => {
                divisor.find().then((divResult) =>{
                    res.render('cust_details',{title : 'Customer Details',custpnt : resx,cust : result,divResult})})
                })
                .catch((err) =>{console.log('Error in binding Location with divisor')})
            .catch((err) => console.log(err));})
    .catch((err) => console.log(err))
}

module.exports = {cust_list_index,cust_list_new,cust_list_id}