const db = require('./db');

exports.resolvers={
    Query: {
        jobs: () => db.jobs.list(),
        job: (root, {id}, ctx) => db.jobs.get(id),
        companies: () => db.companies.list(),
        company: (root, {id}) => db.companies.get(id)
    },
    Mutation: {
        createJob: (root, {input}, {user}) => {
            if(!user){
                throw new Error("Unauthorized")
            }
            console.log("context", user)
            const id = db.jobs.create({...input, companyId: user.companyId})
            return db.jobs.get(id)
        }
    },
    Job: {
        company: ({companyId}) => db.companies.get(companyId)
    },
    Company: {
        jobs: (company) => db.jobs.list().filter(job => job.companyId === company.id)
    }
}