import request from 'request'
const KumuluzeeDiscovery = require('@kumuluz/kumuluzee-discovery').default

const requestCatalog = async (req, res) => {
  try {
    const internalURL = await KumuluzeeDiscovery.discoverService({
      value: "catalog",
      version: "1.0.0",
      environment: "dev",
      accessType: "DIRECT"
    })
    console.log(`found catalog at ${internalURL}`)
    console.log('----')
    request(`${internalURL}v1/artist`, {timeout: 10000}, (err, response, body) => {
      
      if (err) {
        if (err.code === 'ETIMEDOUT') {
          res.status(400).send('Connection timed out')
        } else {
          res.send(err)
        }
      } else {
        res.json(body)
      }
      res.end()
    })
    
  } catch (err) {
    res.status(500).send({err, msg: 'Couldn\'t find catalog'})
  }
}

const projectInfo = async (req, res) => {
  w.log('info', 'ENTER PROJECT INFO ENDPOINT');
  const thisurl = "http://35.204.191.75/users"
  const catalogurl = "http://35.204.242.217/v1/artist"
  res.json({
    "clani": ["mk3141", "js8927"],
    "opis_projekta": "Projekt implementira portal za pretocno deljenje glasbe.",
    "mikrostoritve": [thisurl, catalogurl],
    "github": ["https://github.com/rso9/auth", "https://github.com/rso9/catalog-management"],
    "travis": ["https://travis-ci.org/rso9/auth", "https://travis-ci.org/rso9/catalog-management"],
    "dockerhub": ["https://hub.docker.com/r/rso9/auth/", "https://hub.docker.com/r/rso9/catalog-management/"]
  })
  w.log('info', 'EXIT LOOKUP ENDPOINT');
  res.end()
}

export default {
  requestCatalog,
  projectInfo
}
