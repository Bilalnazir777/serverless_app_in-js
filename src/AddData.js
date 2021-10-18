const { v4 } = require('uuid')
const AWS = require('aws-sdk')
//const middy = require('@middy/core')
//const httpjsonbodyparser = require('@middy/http-json-body-parser')

const AddData = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient()

  const { ToDo } = JSON.parse(event.body)
  const CreatedAt = new Date().toISOString()
  const id = v4()


  const NewToDo = {
    id,
    ToDo,
    CreatedAt,
  }

  await dynamodb.put({
    TableName: "CrudTable",
    Item: NewToDo
  }).promise()
  return {
    body: JSON.stringify(NewToDo)
  }

}
module.exports = {
  handler: AddData
}
