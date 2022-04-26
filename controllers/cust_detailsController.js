
const Customer = require('../models/customer')
const CustomerPoints = require('../models/customer_points')
const divisor = require('../models/divisor')

const qr = require("qrcode");

const cust_addPoints = (req,res) =>{
    const points = new CustomerPoints(req.body);
    const divisorSaved = new divisor(req.body);
    var locationTxt = divisorSaved.Location;
    var divisorTxt = divisorSaved.Divisor;
    
    
    var refID=points.refID;
    var Points=points.Points;

    var isPoints = parseFloat(Points);
    var isCurPoints ;

    Customer.findById(refID).then((result) =>{
        isCurPoints = isPoints + parseFloat(result.LatestPoints)

        Customer.findByIdAndUpdate(refID, { LatestPoints: isCurPoints.toFixed(2) },function (err, docs) {
            if (err){console.log(err)
            }else{
                points.save().then((result) =>            
                        divisor.findOne({Location:locationTxt}).then((res) => {
                            if(res != null){
                              divisor.findOneAndUpdate({Location:locationTxt},{Divisor :divisorTxt})
                                .then((res) =>{console.log('Divisor was successfully updated')})
                                .catch((err) =>{console.log('Error in updating Divisor')})
                            }else{
                                divisorSaved.save()
                                    .then((res) => { console.log('Divisor was successfully inserted.')})
                                    .catch((err) => {console.log('Error in inserting divisor.')})
                            }
                            console.log('Points was successfully inserted.')   
                        }).catch((err) =>{console.log(err)}), 
                    res.redirect(req.get('referer')))
                .catch((err) => console.log(err))
            }
        })
    }).catch((err) =>{console.log("Error in locating ID")})
}

const cust_genqr = (req,res) =>{
    let id = req.params.id;

    // If the input is null return "Empty Data" error
    if (id.length === 0) res.send("Empty Data!");
    
    var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        size: 300,
        color: {
            dark: '#FF5733',  // Blue dots
            light: '#0000' // Transparent background
        }
      }
       
    id = req.get('host')+"/cust_list/"+id
    qr.toDataURL(id,opts, (err, src) => {
    if (err) res.send("Error occured");
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        //console.log("Searching for "+src);
    res.json({src});
    });
}

module.exports = {cust_addPoints,cust_genqr}