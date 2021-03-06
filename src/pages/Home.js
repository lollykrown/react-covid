import React, { useContext } from "react";
import styled from "styled-components";
import {
  arrow,
  top_image,
  breathing,
  confirmed,
  cough,
  deat,
  distance,
  fever,
  flag,
  handshake,
  headache,
  surface,
  travel,
  kerchief,
  koff,
  mask,
  recover,
  sore_throat,
  stay_home,
  wash,
  logo,
} from "../img/image";
import CountUp from "react-countup";
import { DataContext, DataProvider } from "../contexts/DataContext";
import { REQUEST_STATUS } from "../reducers/request";
import moment from "moment";
import { useRequestDetails } from "../hooks/useRequest";
import { Chart } from "react-google-charts";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  // const { countries } = useRequestCountries("https://coronavirus-monitor.p.rapidapi.com/coronavirus","affected.php");

  const { stats, status, error } = useContext(DataContext);

  const { countriesCases, err, statuss } = useRequestDetails(
    "https://coronavirus-monitor.p.rapidapi.com/coronavirus",
    "cases_by_country.php"
  );
  const { countries_stat: count } = countriesCases;

  let {
    active_cases,
    new_cases,
    new_deaths,
    statistic_taken_at,
    total_cases,
    total_deaths,
    total_recovered,
  } = stats;

  const success =
    status === REQUEST_STATUS.SUCCESS && statuss === REQUEST_STATUS.SUCCESS;
  const isLoading =
    status === REQUEST_STATUS.LOADING && statuss === REQUEST_STATUS.LOADING;
  const hasError =
    status === REQUEST_STATUS.ERROR && statuss === REQUEST_STATUS.ERROR;

  const st = {
    activeCases: Number(active_cases?.replace(/,/g, "")),
    newCases: Number(new_cases?.replace(/,/g, "")),
    newDeaths: Number(new_deaths?.replace(/,/g, "")),
    confirmed: Number(total_cases?.replace(/,/g, "")),
    deaths: Number(total_deaths?.replace(/,/g, "")),
    recovered: Number(total_recovered?.replace(/,/g, "")),
    updated: statistic_taken_at,
  };

  // geoChart
  let dat;
  if (success) {
    dat = count?.map((c) => {
      return [c.country_name, Number(c.cases?.replace(/,/g, ""))];
    });
    dat.unshift(["Country", "Cases"]);
    // const d = [['Country', 'Cases'], ...dat];
  }

  return (
    <HomeContainer>
      <main>
        <section id="top">
          <div className="container">
            <div className="row pb-5">
              <div className="col-md-6">
                <br />
                <br />
                <br />
                <p className="stay text-uppercase">stay home</p>
                <div className="line"></div>
                <br />
                <h1 className="text-uppercase main-text">
                  stay safe
                  <br /> from covid-19
                </h1>
                <br />
                <p>
                  Coronavirus disease (COVID-19) was discovered in 2019. It is
                  caused by the a virus named SARS-CoV2 which is a family of
                  viruses that include the common cold, and viruses such as SARS
                  and MERS. It is highly contagious and common signs of
                  infection are majorly respiratory symptoms.
                </p>
                <br />
                <br />

                <div className="d-flex ">
                  <a
                    className="btn arrow"
                    href="https://emedicine.medscape.com/article/2500114-overview"
                  >
                    Learn more{" "}
                    <img
                      className="d-none d-md-inline"
                      src={arrow}
                      width="36"
                      height="36"
                      alt="arrow-right"
                    />
                  </a>
                  <a
                    className="btn px-3 py-3  play"
                    href="https://covid19.ncdc.gov.ng/media/nitp.mp4"
                  >
                    <i className="fa fa-play-circle"></i> Play video now
                  </a>
                </div>
              </div>
              <div className="d-none d-md-block col-md-6 mt-5">
                <img
                  className="img-fluid"
                  src={top_image}
                  alt="covid-19 doctors"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="transmission">
          <div className="container">
            <div className="chart-titles text-center ">
              <div>
                <h2>How contagious is it?</h2>
                <div className="line3 "></div>
              </div>

              <p className="">
                COVID-19 is thought to spread mainly through close contact from
                person to person, including between people who are physically
                near each other (within about 6 feet). People who are infected
                but do not show symptoms can also spread the virus to others.
                Cases of reinfection with COVID-19 have been reported but are
                rare. We are still learning about how the virus spreads and the
                severity of illness it causes.
              </p>
              <br />
            </div>
            <div className="row justify-content-center">
              <div
                className="card col-sm-6 col-md-4 m-3 shadow"
                style={{ width: "14rem" }}
              >
                <img
                  src={cough}
                  className="card-img-top mt-2 rounded"
                  alt="cough"
                />
                <div className="card-body ">
                  <p className="card-title">
                    Cough/sneeze from an infected person
                  </p>
                  <h6 className="card-text d">
                    When people with COVID-19 cough, sneeze, sing, talk, or
                    breathe they produce respiratory droplets. Infections occur
                    mainly through exposure to respiratory droplets when a
                    person is in close contact with someone who has COVID-19.
                  </h6>
                </div>
              </div>

              <div
                className="card col-sm-6 col-md-4 m-3 shadow"
                style={{ width: "14rem" }}
              >
                <img
                  src={handshake}
                  className="mt-2 card-img-top rounded"
                  alt="handshake"
                />
                <div className="card-body">
                  <p className="card-title">
                    Human Contacts with infected person
                  </p>
                  <h6 className="card-text d">
                    People who are physically near (within 6 feet) a person with
                    COVID-19 or have direct contact with that person are at
                    greatest risk of infection. Droplets from infected person(s)
                    are more likely to settle on the mucous membrane of others
                    with close contact.
                  </h6>
                </div>
              </div>

              <div
                className="card col-sm-6 col-md-4 m-3 shadow"
                style={{ width: "14rem" }}
              >
                <img
                  src={surface}
                  className="mt-2 card-img-top rounded"
                  alt="surface"
                />
                <div className="card-body">
                  <p className="card-title">Contaminated Objects/Surface</p>
                  <h6 className="card-text d">
                    Respiratory droplets can also land on surfaces &amp;
                    objects. It's possible that a person could get COVID-19 by
                    touching a surface or object that has the virus on it and
                    then touching their own mouth, nose, or eyes. Spread from
                    touching surfaces is not common.
                  </h6>
                </div>
              </div>

              <div
                className="card col-sm-6 col-md-4 m-3 shadow"
                style={{ width: "14rem" }}
              >
                <img
                  src={travel}
                  className="mt-2 card-img-top rounded"
                  alt="travel"
                />
                <div className="card-body">
                  <p className="card-title">Travel to endemic region</p>
                  <h6 className="card-text d">
                    Travelling to destinations with large cases of Covid-19 also
                    poses significant risk as the chances of coming in close
                    contact with infected people increases with community
                    transmission. You may need to assess your risk when making
                    travel plans.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="symptoms">
          <div className="container">
            <div className="d-flex flex-column flex-md-row py-5 justify-content-center">
              <div className="col-md-4">
                <br /> <br /> <br />
                <h2 className="">Here are some of the symptoms of Covid-19</h2>
                <br />
                <p>
                  Coronavirus disease (COVID-19) is a new strain that was
                  discovered in 2019 and has been previously identified in
                  humans. People with COVID-19 have had a wide range of symptoms
                  reported – ranging from mild symptoms to severe illness.
                  Symptoms may appear 2-14 days after exposure to the virus.
                  Common signs of infection are majorly respiratory symptoms.
                </p>
                <br />
                <br />
                <div className="d-flex ">
                  <a
                    className="btn arrow"
                    href="https://www.webmd.com/lung/coronavirus"
                  >
                    Learn more{" "}
                    <img src={arrow} width="36" height="36" alt="arrow-right" />
                  </a>
                </div>
              </div>
              <div className="col-md-6 d-none d-md-grid symptoms-grid">
                <div className="im img1">
                  <img
                    src={sore_throat}
                    width="100%"
                    height="200"
                    className="img-fluid mx-auto"
                    alt=""
                  />
                  <h6 className="symp">sore throat</h6>
                </div>
                <div className="im img2">
                  <img
                    src={koff}
                    width="100%"
                    height="200"
                    className="img-fluid mx-auto"
                    alt="cough"
                  />
                  <h6 className="symp">cough</h6>
                </div>
                <div className="im img3">
                  <img
                    src={fever}
                    width="100%"
                    height="200"
                    className="img-fluid mx-auto"
                    alt="fever"
                  />
                  <h6 className="symp">fever</h6>
                </div>
                <div className="im img4">
                  <img
                    src={headache}
                    width="100%"
                    height="200"
                    className="img-fluid mx-auto"
                    alt=""
                  />
                  <h6 className="symp">headache</h6>
                </div>
                <div className="im img5">
                  <img
                    src={breathing}
                    width="100%"
                    height="200"
                    className="img-fluid mx-auto"
                    alt="shortness of breath"
                  />
                  <h6 className="symp">shortness of breath</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="prevention">
          <div className="container">
            <div className="chart-titles text-center ">
              <h2>How can it be prevented?</h2>
              <div className="line2"></div>
              <p className="det">
                Coronaviruses are zoonotic, meaning they are transmitted between
                animals and people. Detailed investigations found that
                SARS-COV2...
              </p>
              <br />
            </div>
            <div className="row justify-content-center">
              <div
                className="im col-md-4 mx-3 shadow-sm"
                style={{ width: "12rem" }}
              >
                <img
                  src={mask}
                  className="card-img-top mt-2 rounded-circle"
                  alt="mask"
                />
                <div className="card-body">
                  <p className="card-subtitle text-center pr">wear face mask</p>
                </div>
              </div>
              <div
                className="im col-md-4 mx-3 shadow-sm"
                style={{ width: "12rem" }}
              >
                <img
                  src={wash}
                  className="card-img-top mt-2 rounded-circle"
                  alt="wash hands"
                />
                <div className="card-body">
                  <p className="card-subtitle text-center pr">wash hands</p>
                </div>
              </div>
              <div
                className="im col-md-4 mx-3 shadow-sm"
                style={{ width: "12rem" }}
              >
                <img
                  src={kerchief}
                  className="card-img-top mt-2 rounded-circle"
                  alt="kerchief"
                />
                <div className="card-body">
                  <p className="card-subtitle text-center pr">use tissue</p>
                </div>
              </div>
              <div
                className="im col-md-4 mx-3 shadow-sm"
                style={{ width: "12rem" }}
              >
                <img
                  src={distance}
                  className="card-img-top mt-2 rounded-circle"
                  alt="distance"
                />
                <div className="card-body">
                  <p className="card-subtitle text-center pr">
                    social distance
                  </p>
                </div>
              </div>
            </div>
            <div className="row pb-5 home">
              <figure className="d-none d-md-block col-md-6 mt-5">
                <img className="img-fluid" src={stay_home} alt="stay at home" />
                <figcaption className="text-center">
                  <span className="dot"></span> I stay at home to stay safe{" "}
                  <span className="dot"></span>
                </figcaption>
              </figure>
              <div className="col-md-6 ps-5">
                <br /> <br /> <br />
                <h2>
                  Guidelines for <br />
                  Home Quarantine
                </h2>
                <br />
                <div>
                  <details>
                    <summary>Avoid large crowds</summary>
                    <p>
                      Large crowds like religious gathering e.g church, mosques
                      or other form of public gatherings increases the risk of
                      getting infected
                    </p>
                  </details>
                  <details>
                    <summary>Stay away from elderly people</summary>
                    <p>
                      These are vulnerable age groups and are more susceptible
                      to infection especially covid-19. Risk for severe illness
                      with COVID-19 increases with age, with older adults at
                      highest risk.
                    </p>
                  </details>
                  <details>
                    <summary>
                      Stay away from people with chronic conditions
                    </summary>
                    <p>
                      These group of people are more likely to come down with
                      severe illness because of their pre-existing conditions
                    </p>
                  </details>
                  <details>
                    <summary>Take everyday preventive actions</summary>
                    <p>
                      Wash your hands frequently. Avoid touching your eyes,
                      nose, and mouth with unwashed hands. Cover your cough or
                      sneeze with a tissue, then throw the tissue in the trash.
                      Stay at least 6 feet (about 2 arm lengths) from other
                      people. Clean and disinfect frequently touched objects and
                      surfaces.
                    </p>
                  </details>
                </div>
                <br />
                <a
                  className="btn arrow"
                  href="https://covid19.ncdc.gov.ng/media/files/HomeCareInterimGuide.pdf"
                >
                  Learn more{" "}
                  <img src={arrow} width="36" height="36" alt="arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="stats">
          <div className="container py-5">
            <div className="chart-titles text-center">
              <h2>
                Coronavirus disease <br /> (COVID-19) outbreak situation
              </h2>
              <div className="line2"></div>
              <p className="updated">
                Updated: {moment(st.updated).format("LL LTS ZZ", true)}
                {/* 27 december 2020, 03:06 GMT +6 */}
              </p>
              <Link className="btn arrow mb-4" to="/table">
                View Tables{" "}
                <img
                  className="d-none d-md-inline"
                  src={arrow}
                  width="36"
                  height="36"
                  alt="arrow-right"
                />
              </Link>
              <br />
            </div>
            {isLoading && (
              <div className="mt-5 d-flex flex-row justify-content-center">
                <img
                  className="App-logo"
                  src={logo}
                  alt="logo"
                  height="50"
                  widtg="50"
                />
                <h4 className="ms-2 mt-2">Loading...</h4>
              </div>
            )}
            {hasError && (
              <div className="mt-5 d-flex flex-column justify-content-center text-center">
                <p>
                  Loading error... Are you connected to the internet?
                  <br />
                  Check your internet conenction and try again.
                </p>
                <h6 className="text-danger fw-bold">
                  ERROR: {error.message || err.message}
                </h6>
              </div>
            )}

            {success && (
              <div className="figures d-md-flex flex-row justify-content-evenly">
                <div className="m-3 d-flex flex-row confirmed px-2 pt-2 pb-0 justify-content-evenly">
                  <img
                    className="img-fluid"
                    width="56"
                    height="72"
                    src={confirmed}
                    alt="confirmed"
                  />
                  <div className="mx-3">
                    <h2>
                      <CountUp
                        start={0}
                        end={st.confirmed}
                        duration={5}
                        separator=","
                        className="con-figures"
                      />
                    </h2>
                    <p>Confirmed cases</p>
                  </div>
                </div>
                <div className="m-3 d-flex flex-row deaths px-2 pt-2 justify-content-evenly">
                  <img
                    className="img-fluid "
                    width="56"
                    height="72"
                    src={deat}
                    alt="deaths"
                  />
                  <div className="mx-3">
                    <h2>
                      <CountUp
                        start={0}
                        end={st.deaths}
                        duration={5}
                        separator=","
                        className="death-figures"
                      />
                    </h2>
                    <p>Total Deaths</p>
                  </div>
                </div>
                <div className="m-3 d-flex flex-row countries px-2 pt-2 justify-content-evenly">
                  <img
                    className="img-fluid"
                    width="56"
                    height="72"
                    src={flag}
                    alt="flag"
                  />
                  <div className="mx-3">
                    <h2>
                      <CountUp
                        start={0}
                        end={count?.length || 220}
                        duration={5}
                        separator=","
                        className="countries-figures"
                      />
                    </h2>
                    <p>Affected Countries</p>
                  </div>
                </div>
                <div className="m-3 d-flex flex-row recovered px-2 pt-2 justify-content-evenly">
                  <img
                    className="img-fluid "
                    width="56"
                    height="72"
                    src={recover}
                    alt="recoverered"
                  />
                  <div className="mx-3">
                    <h2>
                      <CountUp
                        start={0}
                        end={st.recovered}
                        duration={5}
                        separator=","
                        className="recovered-figures"
                      />
                    </h2>
                    <p>Total recovered</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div
                className="mt-5 d-none d-md-flex flex-row justify-content-center"
                id="chart"
                style={{ width: "100%", height: "700px" }}
                // style={{ display: 'flex', maxWidth: '1000px' }}
              >
                <Chart
                  width={"900px"}
                  height={"620px"}
                  chartType="GeoChart"
                  data={dat}
                  options={{
                    colorAxis: { colors: ["#FED6D6", "#FF3D39", "#FF0000"] },
                    // animation: {
                    //   duration: 5000,
                    //   easing: 'out',
                    //   startup: true,
                    // }
                  }}
                  // Note: you will need to get a mapsApiKey for your project.
                  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                  mapsApiKey={process.env.REACT_APP_MAP_API_KEY}
                  rootProps={{ "data-testid": "1" }}
                />
              </div>
            )}
          </div>
        </section>
      </main>

      <footer>
        <section className="container" id="contact">
          <div className="contact text-center col-sm-8 col-md-6">
            <h2>
              Do you have any symptoms?
              <br />
              Let us know
            </h2>
            <br />
            <a
              className="btn arrow"
              href="https://covid19.ncdc.gov.ng/contact/"
            >
              Contact NCDC{" "}
              <img src={arrow} width="36" height="36" alt="arrow-right" />
            </a>
          </div>

          <div className="row footer-links">
            <div className="col-md-4 col-sm-6">
              <p>About</p>
              <ul className="links">
                <li>
                  <a href="#blog">Who we are</a>
                </li>
                <li>
                  <a href="#about">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#contact">Privacy policy </a>
                </li>
                <li>
                  <a href="#services">Sitemap</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-sm-6">
              <p>Contact</p>
              <ul className="links">
                <li>
                  11, onabola street,
                  <br />
                  Pedro, Lagos
                </li>
                <li>
                  <a href="mailto=joe_kayu@yahoo.com">joe_kayu@yahoo.com</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-sm-6">
              <h4 className="mb-4">
                Get our recent blog & <br />
                newsletter
              </h4>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control email"
                  placeholder="Enter your email"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <img
                    src={arrow}
                    className="input-img"
                    id="basic-addon2"
                    width="48"
                    height="48"
                    alt="arrow-right"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="separator"></div>

          <nav className="navbar navbar-expand-md navbar-light pb-3">
            <a className="navbar-brand" href="/">
              <img
                className="img-fluid App-logo"
                src={logo}
                alt="logo"
                width="36px"
                height="36px"
              />
              &nbsp; COVID - 19
            </a>
            <div
              className="collapse navbar-collapse justify-content-end footer-nav"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item mt-2 mx-3">
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item mt-2 mx-3">
                  <a className="nav-link" href="#transmission">
                    Privacy & Legal
                  </a>
                </li>
                <li className="nav-item mt-2 mx-3">
                  <a className="nav-link " href="#symptoms">
                    Partners
                  </a>
                </li>
                <li className="nav-item mt-2 mx-3">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </section>
      </footer>
    </HomeContainer>
  );
};

const HomeContainer = styled.header`
  #top {
    border-bottom-right-radius: 140px;
    // margin-top: 100px;
  }
  #top a:hover {
    color: var(--text);
    transition: all 0.6s ease-in;
  }
  .stay,
  .play {
    color: var(--primary);
  }
  .stay {
    margin-bottom: 4px;
  }
  .line {
    border-top: 4px solid var(--primary);
    width: 30px;
    border-radius: 3px;
  }
  .arrow {
    background-color: rgba(255, 94, 57, 0.2);
    padding-top: 10px;
    color: var(--primary);
  }

  /* transmission */
  .card:hover,
  .im:hover {
    transform: scale(1.1);
    transition: transform 1s ease-in-out;
  }
  .d {
    font-size: 12px;
  }
  .det {
    margin: 30px auto;
  }
  /* .card{
    width: 14rem;
} */
  @media only screen and (min-width: 768px) {
    .det {
      max-width: 50%;
    }
    /* .card{
        width: 14rem;
    } */
  }
  .line3 {
    border-top: 4px solid var(--primary);
    width: 120px;
    margin: 20px auto;
    border-radius: 3px;
  }

  /* symptoms */
  #symptoms {
    border-bottom-left-radius: 140px;
  }

  h6,
  details > summary,
  details > p {
    font-size: 14px;
  }
  .card-title {
    font-weight: 600;
  }

  .symptoms-grid {
    display: grid;
    grid-gap: 20px;
    margin-left: 50px;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      ". second ."
      ". second fourth"
      ". second fourth"
      ". third fourth"
      "first third fifth"
      "first third fifth"
      "first . fifth";
  }
  .img1 {
    grid-area: first;
  }
  .img2 {
    grid-area: second;
  }
  .img3 {
    grid-area: third;
  }
  .img4 {
    grid-area: fourth;
  }
  .img5 {
    grid-area: fifth;
  }
  .symptoms-grid > div {
    min-width: 180px;
    min-height: 200px;
    background-color: var(--white);
    border-radius: 8px;
  }
  .symp {
    text-align: center;
    padding: 5px 0;
    color: var(--text);
  }

  /* prevention */
  .dot {
    height: 8px;
    width: 8px;
    background-color: var(--primary);
    border-radius: 50%;
    margin-bottom: 2px;
    display: inline-block;
  }
  .home {
    margin-top: 100px;
  }
  details > summary::-webkit-details-marker {
    list-style-type: circle;
  }
  details > summary {
    padding: 15px 10px;
    max-width: max-content;
    margin: 5px 0;
    border: 1px solid rgb(255, 170, 57, 0.4);
    box-shadow: 1px 1px 2px #bbbbbb;
    cursor: pointer;
    border-radius: 4px;
  }
  .pr {
    font-weight: 400;
  }
  details > p {
    color: var(--white);
    background-color: var(--yellow);
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 1px 1px 2px #bbbbbb;
  }

  /* charts */
  .line2 {
    border-top: 4px solid var(--primary);
    width: 120px;
    margin: 20px auto;
    border-radius: 3px;
  }
  .updated,
  .det,
  h6 {
    color: #a1a1a1;
  }
  .confirmed {
    background-color: rgba(255, 170, 57, 0.2);
    border-bottom: 4px solid rgb(255, 170, 57);
  }
  .con-figures {
    color: rgb(255, 170, 57);
  }
  .deaths {
    background-color: rgba(255, 61, 57, 0.2);
    border-bottom: 4px solid rgb(255, 61, 57);
  }
  .death-figures {
    color: rgb(255, 61, 57);
  }
  .countries {
    background-color: rgba(79, 192, 255, 0.2);
    border-bottom: 4px solid rgb(79, 192, 255);
  }
  .countries-figures {
    color: rgb(79, 192, 255);
  }
  .recovered {
    background-color: rgba(0, 186, 0, 0.2);
    border-bottom: 4px solid rgb(0, 186, 0);
  }
  .recovered-figures {
    color: rgb(0, 186, 0);
  }

  /* footer */
  footer {
    background-color: #003e5d;
    border-top-right-radius: 140px;
    margin-top: 150px;
  }
  .contact {
    background-color: var(--white);
    border-bottom-right-radius: 120px;
    padding: 70px;
    margin: 0;
    position: relative;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .footer-links {
    color: var(--white);
  }
  .footer-links p {
    font-weight: 400;
  }
  .email {
    border: none;
    border-radius: 4px;
    padding: 10px 0 10px 15px;
  }
  .links {
    list-style: none;
    margin-block-start: 0;
    padding-left: 0;
    font-size: 14px;
  }
  .links > li {
    font-weight: 300;
    margin-bottom: 10px;
  }
  .links a {
    text-decoration: none;
    color: var(--white);
  }
  .separator {
    width: 100%;
    /* height:4px; */
    border: 0.2px solid rgb(255, 255, 255, 0.1);
  }
  .footer-nav .nav-link {
    color: var(--white) !important;
    font-weight: 300;
    font-size: 14px;
  }
  .links a:hover,
  .footer-nav a:hover {
    font-weight: 500;
    color: var(--primary);
  }
  input {
    max-width: 220px;
    /* background-image: url(img/arrow.svg);
    background-repeat: no-repeat; */
  }
  input:focus {
    min-width: 320px !important;
    transition: all 1.5s ease;
  }
  .input-img {
    padding: 0;
    margin: 0;
  }
`;

const Home = (props) => {
  return (
    <DataProvider
      baseUrl="https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php"
      routeName="worldstat.php"
    >
      <HomeComponent {...props}></HomeComponent>
    </DataProvider>
  );
};

export default Home;
