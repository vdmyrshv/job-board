import { isLoggedIn, getAccessToken } from './auth'

const endpointURL = "http://localhost:9000/graphql";

const graphqlRequest = async (query, variables={}) => {
    const req = {
        method: 'POST',
        headers: {
            'content-type':'application/json',
        },
        body:JSON.stringify({query ,variables})
    }

    if(isLoggedIn()){
        req.headers['authorization']= `Bearer ${getAccessToken()}`;
    }
    const res = await fetch(endpointURL, req)
    const resBody = await res.json();
    console.log(resBody);
    if(resBody.errors){
        const err = resBody.errors.map(error => error.message).join('\n')
        throw new Error(err);
    }
    return resBody.data;
}

export const getJobs = async () => {

    const query = `query{
        jobs{
            id
            title
            company{
                id
                name
                }
            }
        }`;
    
    const {jobs} = await graphqlRequest(query)
    return jobs;
}

export const getJob = async (id) => {
    const query= `query JobQuery($id: ID!){
        job(id:$id){
            id
            title
            company{
                id
                name
                }
            description
            }
        }`;

    const variables = {id}

    const {job} = await graphqlRequest(query, variables)
    return job;
}

export const getCompany = async (id) => {
    const query= `query CompanyQuery($id: ID!){
                        company(id:$id){
                            id
                            description
                            jobs{
                                id
                                title
                            }
                            }
                        }`;
    
    const variables = {id};
    const {company} = await graphqlRequest(query, variables)
    return company;
}

export const createJob = async (input) => {
    const mutation= `mutation CreateJob($input: CreateJobInput){
                    job: createJob(input: $input){
                            id
                        title
                        company{
                            id
                            name
                        }
                    }
                }
            `;
    
    const variables = {input};
    const {job} = await graphqlRequest(mutation, variables)
    return job;
}

// export const getJobs =gql`
// query{
//     jobs{
//         id
//         title
//         description
//         company{
//         id
//         name
//     }
//   }
// }
// `;