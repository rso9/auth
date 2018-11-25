const KumuluzeeDiscovery = require('@kumuluz/kumuluzee-discovery').default

const health = (req, res) => {
  res.json({status: 'UP'})
  res.end()
}

const lookup = async (req, res) => {
  try {
    const response = await KumuluzeeDiscovery.discoverService({
      value: "auth",
      version: "1.0.0",
      environment: "dev",
      accessType: "DIRECT"
    })
    res.json({service: response})
  } catch (err) {
    res.status(500).send(err)
  }
}

export default {
  health,
  lookup
}
