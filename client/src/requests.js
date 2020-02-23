const endpointURL = "http://localhost:9000/graphql";

const graphqlRequest = async (query, variables={}) => {
    const res = await fetch(endpointURL, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body:JSON.stringify({query ,variables})
    })
    const resBody = await res.json();
    console.log(resBody);
    return resBody.data;
}

export const getJobs = async () => {
    const res = await fetch(endpointURL, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body:JSON.stringify({
             query: `query{
                        jobs{
                            id
                            title
                            company{
                                id
                                name
                                }
                            }
                        }`
        })
    })
    const resBody = await res.json();
    return resBody.data.jobs;
}

export const getJob = async (id) => {
    const res = await fetch(endpointURL, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body:JSON.stringify({
             query: `query JobQuery($id: ID!){
                        job(id:$id){
                            id
                            title
                            company{
                                id
                                name
                                }
                            description
                            }
                        }`,
                variables: {id}
        })
    })
    const resBody = await res.json();
    console.log(resBody);
    return resBody.data.job;
}

export const getCompany = async (id) => {
    const res = await fetch(endpointURL, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body:JSON.stringify({
             query: `query companyQuery($id: ID!){
                        company(id:$id){
                            id
                            description
                            }
                        }`,
                variables: {id}
        })
    })
    const resBody = await res.json();
    console.log(resBody);
    return resBody.data.company;
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