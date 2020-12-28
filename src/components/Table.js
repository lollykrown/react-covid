import React, { useState } from "react";
import { useRequestDetails } from "../hooks/useRequest";
import styled from "styled-components";
import { logo } from "../img/image";
import { REQUEST_STATUS } from "../reducers/request";
import moment from 'moment'

const Table = () => {
  const [search, setSearch] = useState('')

  const { countriesCases, statuss, err } = useRequestDetails("https://coronavirus-monitor.p.rapidapi.com/coronavirus","cases_by_country.php");
  const {countries_stat:stats, statistic_taken_at:updated} = countriesCases;

  const success = statuss === REQUEST_STATUS.SUCCESS;
  const isLoading = statuss === REQUEST_STATUS.LOADING;
  const hasError = statuss === REQUEST_STATUS.ERROR;

  const setVal = (e) => {
    e.preventDefault()
    const value = e.target.value;
    setSearch(value)
  }

  return (
    <TableContainer className="container">
      <h5 className="my-3 ms-2">COVID-19 stats by Country</h5>
      <h6 className="float-end me-3">Updated: {moment(updated).format('LL LTS ZZ',true)} </h6>
      <form className="form-inline my-lg-0">
            <input
              onChange={e=> setVal(e)}
              className="form-control py-2"
              type="search"
              value={search}
              placeholder="&#128269; Search Countries"
              aria-label="Search"
            />
          </form>
      <table className="overflow-scroll table table-striped">
        <thead>
          <tr>
            <th scope="col" className="bord">S/N</th>
            <th scope="col">Country</th>
            <th scope="col">Total Cases</th>
            <th scope="col">Active Cases</th>
            <th scope="col">New Cases</th>
            <th scope="col">Total deaths</th>
            <th scope="col">New Deaths</th>
            <th scope="col">Total recovered</th>
            <th scope="col">Serious Critical</th>
            <th scope="col">Total Tests</th>
          </tr>
        </thead>
        <tbody>
        {isLoading && <div className="mt-5 d-flex flex-row justify-content-center"><img className="App-logo" src={logo} alt="logo" height="50" widtg="50" /><h4 className="ms-2 mt-2">Loading...</h4></div>}
        {hasError && (
           <div className="mt-5 d-flex flex-column justify-content-center text-center">
             <p>Loading error... Are you connected to the internet?<br/>
              Check your internet conenction and try again.</p>
              <h6 className="text-danger fw-bold">ERROR: {err.message}</h6>
           </div>
        )}
        {success && stats.filter(c => {
          return c.country_name.toLowerCase().includes(search.toLowerCase())
          }).map((co, index) => (
              <tr key={index}>
              <th className="bord" scope="row">{index+1}</th>
              <td className="fw-bold bord">{co.country_name}</td>
              <td className="bord">{co.cases}</td>
              <td className="bord">{co.active_cases}</td>
              <td className="bord">{co.new_cases}</td>
              <td className={ `bord ${Number(co.deaths?.replace(/,/g, "")) > 0 ? "pink": ""}`}>{co.deaths}</td>
              <td className={ `bord ${+co.new_deaths > 0 ? "red": ""}`}>{co.new_deaths}</td>
              <td className="green bord">{co.total_recovered}</td>
              <td className="bord">{co.serious_critical}</td>
              <td className="bord">{co.total_tests}</td>
          </tr>
        ))}   

        </tbody>
      </table>
    </TableContainer>
  );
};

const TableContainer = styled.header`
.loading{
  overflow: hidden !important;
}
.red{
  background-color: var(--primary) !important;
  color: var(--white);
}
.pink{
  background-color: var(--pink) !important;
  color: var(--white);
}
.green{
  background-color: #00BA00 !important;
  color: var(--white);
}
.bord{
  border: 1px solid #bdbdbd !important;
}
h6 {
  color: #a1a1a1;
  font-size:14px;
  font-weight:300;
}
`;
export default Table;
