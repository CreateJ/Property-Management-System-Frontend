const getEasyData = (req, res) => {
  res.json([
    {
      name: 'jamie',
      id: 0,
    },

  ])
}

export default {
  '/api2/easyDemoData': getEasyData,
}
