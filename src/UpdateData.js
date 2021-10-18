
const AWS = require('aws-sdk')
const middy = require('@middy/core')
const httpjsonbodyparser = require('@middy/http-json-body-parser')

const UpdateData = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient()
    const { newone } = event.body
    const { id } = event.pathParameters;


    await dynamodb.update({
        TableName: "CrudTable",
        Key: { id },
        UpdateExpression: 'set ToDo = :anything',
        ExpressionAttributeValues: {
            ':anything': newone
        },
        ReturnValues: "ALL_NEW"
    }).promise()
    return {
        body: JSON.stringify({
            message: "updated succesfully"
        })
    }

}
module.exports = {
    handler: middy(UpdateData).use(httpjsonbodyparser())
}
