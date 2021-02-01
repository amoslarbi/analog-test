const Production = {
    Constants: {
      "OBALLOT_URL": "https://analog.oballot.com",
      "API_BASE_URL": "https://analogapi.oballot.com",
    }
  }
  
  const Development = {
    Constants: {
      "ANALOG_URL": "http://localhost:7070",
      "API_BASE_URL": "http://localhost:5050",
    }
  }
  
  // export default process.env.NODE_ENV === 'production' ? Production.Constants : Development.Constants;
  export default process.env.NODE_ENV === 'production' ? Production.Constants : Development.Constants;