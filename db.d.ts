declare class DB<I extends Object>{
  constructor()
  load():void
  save():void
  add(db:String, data:I):void
  remove(db:String, id:Number):void
  edit(db:String, id:Number, data:I):void
  get(db:String):I[]
  getItem(db:String, id:Number):I
}
export = DB