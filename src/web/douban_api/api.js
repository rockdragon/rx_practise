import fs from 'fs'
const configCfg = './config.cfg'

export default function getConfig(){
  let config = {}

  if(fs.exists(configCfg))
    config = require(configCfg)

  return config
}
