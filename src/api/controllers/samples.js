import request from 'request'
const w = require('winston')
const KumuluzeeDiscovery = require('@kumuluz/kumuluzee-discovery').default

const requestCatalog = async (req, res) => {
  w.log('info', 'REQUEST CATALOG ENDPOINT', {markerName: 'ENTRY'});
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
          const errMsg = 'Connection timed out'
          w.log('error', 'REQUEST CATALOG ENDPOINT', {markerName: 'EXIT', error: errMsg});
          res.status(400).json({error: errMsg})
        } else {
          const errMsg = 'Couldn\'t find catalog'
          w.log('error', 'REQUEST CATALOG ENDPOINT', {markerName: 'EXIT', error: errMsg});
          res.status(500).json({error: errMsg})
        }
      } else {
        w.log('info', 'REQUEST CATALOG ENDPOINT', {markerName: 'EXIT', catalogFoundAt: body});
        res.json(body)
      }
      res.end()
    })
    
  } catch (err) {
    w.log('error', 'REQUEST CATALOG ENDPOINT', {markerName: 'EXIT', error: 'Couldn\'t find catalog'});
    res.status(500).json({err: 'Couldn\'t find catalog'})
  }
}

const projectInfo = async (req, res) => {
  w.log('info', 'PROJECT INFO ENDPOINT', {markerName: 'ENTRY'});
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
  w.log('info', 'PROJECT INFO ENDPOINT', {markerName: 'EXIT'});
  res.end()
}

export default {
  requestCatalog,
  projectInfo
}
