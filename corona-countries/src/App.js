import './App.css';
import React, { useReducer } from 'react'
import Chart from './components/Chart';
import ChartSelector from './components/ChartSelector';
import deepCopy from './helpers/deepCopy';

function App() {

  const initialState = {
    areRequestsSent: false,
    cases: {
      countries: {
        germany: {
          2020: {},
          2021: {},
          2022: {},
        },
        sweden: {
          2020: {},
          2021: {},
          2022: {},
        }
      }
    },
    deaths: {
      countries: {
        germany: {
          2020: {},
          2021: {},
          2022: {},
        },
        sweden: {
          2020: {},
          2021: {},
          2022: {},
        }
      }
    }
  }

  const monthShortNames = [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez"
  ]

  const apiReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_COUNTRY_CASES': {
        const { country, year, month } = action

        const newState = deepCopy(state)
        newState.cases.countries[country][year][monthShortNames[Number(month) - 1]] = action.cases

        return newState
      }

      case 'FETCH_COUNTRY_DEATHS': {
        const { country, year, month } = action

        const newState = deepCopy(state)
        newState.deaths.countries[country][year][monthShortNames[Number(month) - 1]] = action.cases

        return newState
      }

      case 'SET_REQUESTS_SENT_FLAG_TRUE': {
        const newState = deepCopy(state)
        newState.areRequestsSent = true
        return newState
      }

      default:
        return state
    }
  }

  /*
  The API returns one object for each day within the data boundaries!
  Only store the cases of the 15th day of the month in state!
  */
  const fetchCountryCases = async (country, from, to) => {
    // https://api.covid19api.com/total/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
    const url = `https://api.covid19api.com/total/country/${country}/status/confirmed?from=${from}&to=${to}`

    fetch(url)
      .then(res => res.json())
      .then(countryCaseData => {
        console.log(countryCaseData);

        // First filter out all dates that are not the 15th
        countryCaseData = countryCaseData.filter(dayData => {
          const startDateParts = dayData.Date.split('-')
          const day = startDateParts[2].substring(0, 2)

          return day === "15"
        })

        // Then store all month cases in state
        countryCaseData.forEach(dayData => {
          const dateParts = dayData.Date.split('-')
          const year = dateParts[0]
          const month = dateParts[1]

          const cases = dayData.Cases

          dispatch({
            type: 'FETCH_COUNTRY_CASES',
            country,
            year,
            month,
            cases
          })
        })
      }).catch(console.error)
  }

  const fetchCountryDeaths = (country, from, to) => {
    // https://api.covid19api.com/total/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
    const url = `https://api.covid19api.com/total/country/${country}/status/deaths?from=${from}&to=${to}`

    fetch(url)
      .then(res => res.json())
      .then(countryCaseData => {
        console.log(countryCaseData);

        // First filter out all dates that are not the 15th
        countryCaseData = countryCaseData.filter(dayData => {
          const startDateParts = dayData.Date.split('-')
          const day = startDateParts[2].substring(0, 2)

          return day === "15"
        })

        // Then store all month cases in state
        countryCaseData.forEach(dayData => {
          const dateParts = dayData.Date.split('-')
          const year = dateParts[0]
          const month = dateParts[1]

          const cases = dayData.Cases

          dispatch({
            type: 'FETCH_COUNTRY_DEATHS',
            country,
            year,
            month,
            cases
          })
        })
      }).catch(console.error)
  }

  const [state, dispatch] = useReducer(apiReducer, initialState)

  const loadData = () => {
    const startDate = `$2020-01-01T00:00:00Z`
    const endDate = `$2022-31-01T00:00:00Z`

    Object.keys(state.cases.countries).forEach(country => {
      fetchCountryCases(country, startDate, endDate)
    })

    Object.keys(state.deaths.countries).forEach(country => {
      fetchCountryDeaths(country, startDate, endDate)
    })
  }

  const isEssentiallyLoaded = () => {
    console.log("state during 'isLoaded' check");
    console.log(state);

    return ['cases', 'deaths'].every(dataType => {
      return Object.keys(state[dataType].countries).every(country => {
        const years = Object.keys(state[dataType].countries[country])
        return years.every(year => {
          const months = Object.keys(state[dataType].countries[country][year])
          // One month should suffice, the other ones, if they exist, should follow soon
          return months.some(month => state[dataType].countries[country][year][month] !== undefined)
        })
      })
    })
  }

  // INIT
  const init = () => {
    if (!state.areRequestsSent) {

      dispatch({
        type: 'SET_REQUESTS_SENT_FLAG_TRUE'
      })

      loadData()
    }
  }

  init()

  return (
    <div className="App">
      <h1>Corona Data</h1>
      {isEssentiallyLoaded() && (
        <div>
          <p>Population Germany 2022: 83 129 000</p>
          <p>Population Sweden 2022: 10 416 000</p>
          <p>Inhabitants per km² Germany 2022: 232.5</p>
          <p>Inhabitants per km² Sweden 2022: 23.3</p>
          <p>(<a href="https://www.worlddata.info/country-comparison.php?country1=DEU&country2=SWE">Source</a>)</p>
          <ChartSelector
            data={state.cases.countries['germany']}
            title="Cumulative Covid-19 Cases Germany"
            unit="Confirmed Cases at 15th day of month"
          />
          <ChartSelector
            data={state.cases.countries['sweden']}
            title="Cumulative Covid-19 Cases Sweden"
            unit="Confirmed Cases at 15th day of month"
          />
          <ChartSelector
            data={state.deaths.countries['germany']}
            title="Cumulative Covid-19 Deaths Germany"
            unit="Covid-19 deaths at 15th day of month"
          />
          <ChartSelector
            data={state.deaths.countries['sweden']}
            title="Cumulative Covid-19 Deaths Sweden"
            unit="Covid-19 deaths at 15th day of month"
          />
        </div>

      )}
    </div>
  );
}

export default App;
