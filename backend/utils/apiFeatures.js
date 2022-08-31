class APIFeatures{

    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
    }

    search(){

        const keyword=this.queryStr.keyword ? {
            name:{
              $regex: this.queryStr.keyword,
              $options:'i'      

            }

        } : {}
      
        this.query=this.query.find({...keyword})
        return this;

    }
    filter(){

        const queryCopy={...this.queryStr}

      

        //reomving fields from the query
        const removeKey=["keyword","limit","page"]

        removeKey.forEach(el=>delete queryCopy[el])

        //advanced filtering

        let queryStr=JSON.stringify(queryCopy)
        queryStr=queryStr.replace(/\b(gt|gte|lte|lt)\b/g,match=>`$${match}`)
   
        console.log(queryStr)
        this.query=this.query.find(JSON.parse(queryStr))

        console.log(queryCopy)
        return this;
    }
    pagination(resultPage){

        const currentPage=Number(this.queryStr.page) || 1

        const Skip=resultPage * (currentPage-1)
        //skip=2*(3-1)=4

        this.query=this.query.limit(resultPage).skip(Skip)

        return this;

    }

}
module.exports=APIFeatures
