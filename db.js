const fs = require('fs')
module['exports'] = class DB{
  constructor(){
    this.load();
  }
  load(){
    try {
      this.data = fs.readFileSync(__dirname+'/../../../DB.json', 'utf-8')
    } catch (e) {
      this.data = {}
    }
    this.save()
  }
  save(){
    fs.writeFileSync(__dirname+'/../../../DB.json', this.data)
  }

  add(db, data){
    data.id=(this.data[db][this.data[db].length-1]||{id:0}).id+1
    this.data[db].push(data)
    this.save()
  }
  remove(db, id){
    this.data[db] = this.data[db].filter(data => data.id !== id)
    this.save()
  }
  edit(db, id, newData){
    this.data[db] = this.data[db].map(data=>{
      if(data.id === id) return {...data, ...newData}
      return data
    })
    this.save()
  }
  get(db){
    return this.data[db]
  }
  getItem(db, id){
    return this.data[db].find(data => data.id === id)
  }
}