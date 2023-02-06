const { createCustomError } = require('../errors/custom-error')
const Products = require('../model/product-model')


// const getAllProductsStatic = async (req,res)=>{
//     const products = await Products.find({featured:true})
//     res.status(200).json({nbHits:products.length,products})
// }
const getAllProducts = async (req,res,next)=>{
    const {featured,name,company,sort,fields,numericFilters} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true'? true:false;
    }
    if(name){
        queryObject.name = {$regex: name, $options:'i'}
    }
    if(company){
        queryObject.company = company
    }
    if(numericFilters){
        const operatorsMap={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match)=>`-${operatorsMap[match]}-`)
        const options = ['price','rating']
        filters = filters.split(',').forEach(item => {
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = { [operator] : Number(value) }
            }
        });
        // console.log(queryObject)
    }
    let result = Products.find(queryObject) 
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = 5
    const skip = (page-1)*limit
    result = result.skip(skip).limit(limit)
    const products = await result
    if(products.length==0){
        return next(createCustomError(404,"Nothing Matched"))
    }
    res.status(200).json({nbHits:products.length,products})
}


module.exports = {
    getAllProducts,
    getAllProductsStatic,
}
