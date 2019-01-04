import diskspace from 'diskspace'
import db from '../db'
import User from '../models/User'
const KumuluzeeDiscovery = require('@kumuluz/kumuluzee-discovery').default

const checkDBHealth = () => {
  return new Promise((resolve, reject) => {
    let retval = {
      "name": "DataSourceHealthCheck",
      "state": "UP"
    }
    // User.findAll().then((users) => {
    //   if (users) {
    //     retval.state = 'UP'
        resolve(retval)
    //   }
    // }).catch((err) => {
    //   reject(retval)
    // })
  })
}

const checkDiskspaceHealth = () => {
  return new Promise((resolve, reject) => {
    diskspace.check('/', (err, result) => {
      console.log("total:", result.total)
      console.log("free", result.free)

      if (err) reject({
        name: "DiskSpaceHealthCheck",
        state: "DOWN"
      })
      
      resolve({
        name: "DiskSpaceHealthCheck",
        state: (result.free > 0.000001 * result.total) ? "UP" : "DOWN"
      })
    })
  })
}

const health = async (req, res) => {
  w.log('info', 'ENTRY HEALTH ENDPOINT');
  let health = {
    state: 'DOWN',
    checks: []
  }

  try {
    const dbHealth = await checkDBHealth()
    health.checks.push(dbHealth)
  } catch (err) {
    console.log(err)
    health.checks.push(err)
  }

  try {
    const diskpaceHealth = await checkDiskspaceHealth()
    health.checks.push(diskpaceHealth)
  } catch (err) {
    health.checks.push(err)
  }

  let allGood = health.checks.every((e) => e.state === 'UP')
  
  if (allGood) health.state = 'UP'

  w.log('info', 'EXIT HEALTH ENDPOINT');
  res.status(allGood ? 200 : 500).json(health)
}

const lookup = async (req, res) => {
  w.log('info', 'ENTRY LOOKUP ENDPOINT');
  try {
    const response = await KumuluzeeDiscovery.discoverService({
      value: "auth",
      version: "1.0.0",
      environment: "dev",
      accessType: "DIRECT"
    })
    console.log("found self at: " + response)
    w.log('info', 'EXIT LOOKUP ENDPOINT');
    res.json({service: response})
  } catch (err) {
    w.log('error', 'EXIT LOOKUP ENDPOINT');
    res.status(500).send(err)
  }
}

export default {
  health,
  lookup
}
