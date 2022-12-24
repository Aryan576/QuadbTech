const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const router = express.Router();

const path = require("path");
const pg = require("./DB");
const axios = require("axios");
const { error } = require("console");
const BASE_URL = `https://api.wazirx.com/api/v2/tickers`;

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});
axios.get("https://api.wazirx.com/api/v2/tickers").then(function (response) {
   const result = {
    btcinr: {
      base_unit: "btc",
      quote_unit: "inr",
      low: "1415000.0",
      high: "1445030.0",
      last: "1435000.0",
      type: "SPOT",
      open: "1438000",
      volume: "5.25923",
      sell: "1440000.0",
      buy: "1435000.0",
      at: 1671875521,
      name: "BTC/INR",
    },
    xrpinr: {
      base_unit: "xrp",
      quote_unit: "inr",
      low: "29.5001",
      high: "30.25",
      last: "29.7001",
      type: "SPOT",
      open: "29.6012",
      volume: "131636.3",
      sell: "30.1",
      buy: "29.7041",
      at: 1671875521,
      name: "XRP/INR",
    },
    ethinr: {
      base_unit: "eth",
      quote_unit: "inr",
      low: "102900.0",
      high: "104990.0",
      last: "104391.5",
      type: "SPOT",
      open: "104010",
      volume: "33.5307",
      sell: "104300.0",
      buy: "103800.1",
      at: 1671875521,
      name: "ETH/INR",
    },
    trxinr: {
      base_unit: "trx",
      quote_unit: "inr",
      low: "4.6",
      high: "4.7117",
      last: "4.6567",
      type: "SPOT",
      open: "4.71",
      volume: "1075149.0",
      sell: "4.6567",
      buy: "4.6515",
      at: 1671875521,
      name: "TRX/INR",
    },
    eosinr: {
      base_unit: "eos",
      quote_unit: "inr",
      low: "76.0",
      high: "78.0",
      last: "76.0",
      type: "SPOT",
      open: "76",
      volume: "44.13",
      sell: "78.0",
      buy: "76.0",
      at: 1671875521,
      name: "EOS/INR",
    },
    zilinr: {
      base_unit: "zil",
      quote_unit: "inr",
      low: "1.52",
      high: "1.57",
      last: "1.56",
      type: "SPOT",
      open: "1.55",
      volume: "148834.0",
      sell: "1.56",
      buy: "1.52",
      at: 1671875521,
      name: "ZIL/INR",
    },
    batinr: {
      base_unit: "bat",
      quote_unit: "inr",
      low: "16.001",
      high: "17.0",
      last: "16.003",
      type: "SPOT",
      open: "16.9",
      volume: "4746.99",
      sell: "16.875",
      buy: "16.1",
      at: 1671875521,
      name: "BAT/INR",
    },
    zrxinr: {
      base_unit: "zrx",
      quote_unit: "inr",
      low: "14.15",
      high: "15.0",
      last: "14.15",
      type: "SPOT",
      open: "14.25",
      volume: "650.2",
      sell: "15.0",
      buy: "14.15",
      at: 1671875521,
      name: "ZRX/INR",
    },
    reqinr: {
      base_unit: "req",
      quote_unit: "inr",
      low: "7.3225",
      high: "7.728",
      last: "7.67",
      type: "SPOT",
      open: "7.33",
      volume: "1143.0",
      sell: "7.6999",
      buy: "7.3501",
      at: 1671875521,
      name: "REQ/INR",
    },
    nulsinr: {
      base_unit: "nuls",
      quote_unit: "inr",
      low: "108.0",
      high: "108.0",
      last: "108.0",
      type: "SPOT",
      open: 108.0,
      volume: "0.0",
      sell: "0.0",
      buy: "0.0",
      at: 1671875521,
      name: "NULS/INR",
    },
  };



  Object.keys(result).forEach((key) => {
     
     
      try {
        const {name,last,buy,sell, volume, base_unit} = result[key];
        pg.query('insert into data(name,last,buy,sell, volume, baseunit) values($1,$2,$3,$4,$5,$6)',[name,last,buy,sell, volume, base_unit],(error,result) => {
                if(error){
                  throw error;
                }else{
                 
                  console.log("Inserte");
                }
        });
      } catch (error) {
        return error;
      }
    
      
      
  });

});

app.get('/getData',function(req,res){
  try {
      pg.query("SELECT * FROM data",(error,result)=>{
          if(error){
            throw error;
          }else{
            res.status(200).json(result.rows);
          }
      });
  } catch (error) {
    
  }
});
app.listen(port, () => {
  console.log("App running on port 3000");
});
