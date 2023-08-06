const { query } = require("express");
const Product = require("../model/product");


const getAllProducts = async (req,res) => {

    const {company, name, feature, sort , select} = req.query;
    const queryObject = {};

    if (company){
    queryObject.company = company;
}

if (feature){
    queryObject.feature = feature;
}

if (name){
    queryObject.name = { $regex: name, $options: "i" };
}

let apiData = Product.find(queryObject);

if (sort){
    let sortfix = sort.split(",").join(" ");
    apiData = apiData.sort(sortfix);
}

if (select){
    let selectfix = select.split(",").join(" ");
    apiData = apiData.select(selectfix);
}


let page = Number(req.query.page) || 1;
let limit = Number(req.query.limit) || 3;

let skip = (page - 1) * limit;
apiData = apiData.skip(skip).limit(limit);

console.log(queryObject);

    const myData = await apiData;
    res.status(200).json({myData, nbHits: myData.length });
};

const getAllProductsTesting = async (req,res) => {
    console.log(req.query);
    const myData = await Product.find(req.query).skip(2);
    
    res.status(200).json({myData});
};

module.exports = {getAllProducts, getAllProductsTesting};