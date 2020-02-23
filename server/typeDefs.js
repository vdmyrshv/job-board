const { gql } = require('apollo-server-express')

exports.typeDefs =gql`

type Job{
    id: ID!
    title: String
    company: Company
    description: String
}

type Company{
    id: ID! 
    name: String!
    description: String!
}
    
type Query{
    jobs: [Job]
    job(id: ID!): Job
    companies: [Company]
    company(id: ID!): Company
}


`;
