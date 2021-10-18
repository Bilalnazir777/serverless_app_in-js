
const AWS = require('aws-sdk')
//const middy = require('@middy/core')
//const httpjsonbodyparser = require('@middy/http-json-body-parser')

const FetchAll = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient()
    let allitems;
    try {
        const result = await dynamodb.scan({ TableName: 'CrudTable' }).promise();
        allitems = result.Items
    }

    catch (err) {
        console.log(err)
    }


    return {
        body: JSON.stringify(allitems)
    }

}
module.exports = {
    handler: FetchAll
}
