import React, { Component } from 'react';
import { getCompany } from './requests'
import { Link } from 'react-router-dom'
import {JobList} from './JobList'


export class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {company: null};
  }

  async componentDidMount() {
    const {companyId} = this.props.match.params;
    const company = await getCompany(companyId);
    this.setState({company})
  }
  

  render() {
    const {company} = this.state;
    if (!company) return null;
    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <div className="box">
          <h2 className="title">Jobs Available:</h2>
          <JobList jobs={company.jobs} />
        </div>
      </div>
    );
  }
}
