const Production = {
    Constants: {
        "ANALOG_URL": "",
        "API_BASE_URL": "",
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