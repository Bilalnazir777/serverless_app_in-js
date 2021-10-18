const AWS = require('aws-sdk')

//const middy = require('@middy/core')
//const httpjsonbodyparser = require('@middy/http-json-body-parser')

const FetchOne = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const { id } = event.pathParameters;
    console.log({ id })
    let itemfound;
    try {
        const result = await dynamodb.get({
            TableName: "CrudTable",
            Key: { id }
        }).promise();
        itemfound = result.Item
    }

    catch (err) {
        console.log(err)
    }
    return {

        body: JSON.stringify(itemfound)
    }

}
module.exports = {
    handler: FetchOne
}
