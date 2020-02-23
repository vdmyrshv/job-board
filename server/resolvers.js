const db = require('./db');

exports.resolvers={
    Query: {
        jobs: () => db.jobs.list(),
        job: (root, {id}, ctx) => db.jobs.get(id),
        companies: () => db.companies.list(),
        company: (root, {id}) => db.companies.get(id)
    },
    Job: {
        company: ({companyId}) => db.companies.get(companyId)
    }
}