const express=require("express")
const Insta=require('instamojo-nodejs')
const bodyparser=require('body-parser')


const API_KEY="test_39acd259f732db67466129238c8"
const AUTH_KEY="test_b17190f2173479ee8c02a873f37"

Insta.setKeys(API_KEY,AUTH_KEY)
Insta.isSandboxMode(true);

const app=express()

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// ---------------------------------------payment creation----------------------------------------------

app.get('/',(req,res)=>{
  res.sendFile(__dirname +"/index.html")
})


  var resp ;
  //var id ;
app.post('/pay',(req,res)=>{

    var name=req.body.name
    var email=req.body.email
    var amount=req.body.amount
    var purpose = req.body.purpose
  
    console.log(name)
    console.log(email)
    console.log(amount)
    console.log(purpose)

    var data=new Insta.PaymentData();
    data.send_email='True';
    data.purpose = purpose;
    data.amount=amount;
    data.name=name;
    data.email=email ;
    

    Insta.createPayment(data,function(error,response){
        if(error){

        }else{
            resp = response;
            resp = JSON.parse(resp)
            //id = resp.payment_request.id;
            console.log(response)
            res.send(resp)
           // res.send("PLease check your mail for Payment")
        }
    });
});


// -------------------------------sucess payment--------------------------------------------  



app.post('/sucess',(req,res)=>{
    var paymentID = req.body.payid;
    var id = req.body.id;
    console.log(id)
    console.log(paymentID)
    Insta.getPaymentDetails( id,paymentID,function(error,response){
       if(error){
            
       }
       else if(response)
       {
        // var payres = JSON.stringify(response);
        //   payres = JSON.parse(payres)
         // var paystatus = payres.payment_request.status;
          console.log(response)
          res.send(response)

                // if(paystatus == "Completed")
                //   {
                //        console.log("payment is done by scooby")
                //          res.send("payment is done by scooby")
                //    }
                //  else 
                //  {
                //        console.log("still payment is not done")
                //          res.send("still payment is not done,  please check your mail for Transaction details in pdf")
                //       }
          }
    })
})
app.listen(4000,()=> {
    console.log("App is listening on 4000")
})