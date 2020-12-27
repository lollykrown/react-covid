import React from "react";
import { useRequestDetails } from "../hooks/useRequest";

const Table = () => {
    const { countriesCases } = useRequestDetails("https://coronavirus-monitor.p.rapidapi.com/coronavirus","cases_by_country.php");

  return (
    <div className="overflow-scroll">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className="bord">#</th>
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
            {countriesCases.map((co, index) => (
                <tr key={index}>
                <th className="bord" scope="row">{index+1}</th>
                <td className="fw-bold bord">{co.country_name}</td>
                <td className="bord">{co.cases}</td>
                <td className="bord">{co.active_cases}</td>
                <td className="bord">{co.new_cases}</td>
                <td className="pink bord">{co.deaths}</td>
                <td className="red bord">{co.new_deaths}</td>
                <td className="green bord">{co.total_recovered}</td>
                <td className="bord">{co.serious_critical}</td>
                <td className="bord">{co.total_tests}</td>
            </tr>
            ))}
     

        </tbody>
      </table>
    </div>
  );
};

export default Table;
