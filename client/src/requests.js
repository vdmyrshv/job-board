import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, gql } from 'apollo-boost'
import { isLoggedIn, getAccessToken } from './auth'

const endpointURL = "http://localhost:9000/graphql";

const authLink = new ApolloLink((operation, forward)=>{
    if(isLoggedIn()){
        //req.headers['authorization']= `Bearer ${getAccessToken()}`;
        operation.setContext({
            headers: {
                authorization: `Bearer ${getAccessToken()}`
            }
        })
    }
    return forward(operation)
})

const client = new ApolloClient({
    link: ApolloLink.from([authLink, new HttpLink({uri: endpointURL})]),
    cache: new InMemoryCache()
});

const jobDetailFragment = gql`
    fragment JobDetail on Job {
        id
        title
        company{
            id
            name
        }
        description
    }
`;


const jobsQuery = gql`query JobsQuery{
    jobs{
        id
        title
        company{
            id
            name
            }
        }
    }
`;

const jobQuery= gql`query JobQuery($id: ID!){
    job(id:$id){
        ...JobDetail
        }
    }
    ${jobDetailFragment}
`;

const createJobMutation= gql`mutation CreateJob($input: CreateJobInput){
    job: createJob(input: $input){
        ...JobDetail
        }
    }
    ${jobDetailFragment}
`;

const getCompanyQuery= gql`query CompanyQuery($id: ID!){
    company(id:$id){
        id
        description
        jobs{
            id
            title
            }
        }
    }
`;


export const getJobs = async () => {

    
    const {data:{jobs}} = await client.query({query: jobsQuery})
    return jobs;
}

export const getJob = async (id) => {

    const variables = {id}
    const {data:{job}} = await client.query({query: jobQuery, variables})
    return job;
}

export const getCompany = async (id) => {
    
    const variables = {id};
    const {data:{company}} = await client.query({query: getCompanyQuery, variables})
    return company;
}

export const createJob = async (input) => {
    
    const variables = {input};
    const {data:{job}} = await client.mutate({
        mutation: createJobMutation, 
        variables,
        update: (cache,{data})=>{
            console.log("cache", cache, "data", data)
            cache.writeQuery({
                query: jobQuery, 
                variables: {id: data.job.id},
                data
            })
        }   
    })
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