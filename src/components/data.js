import {Info} from '../data/db.json'

class Data {
  constructor(info) {
    this.info = info
  }
}

const data = new Data(Info)

export{ data }