import { User } from "./User";

export class Users {
  private _data: User[]

  constructor() {
    this._data = []
  }

  addUser(user: User) {
    if(!this._data.length) {
      this._data.push(user)
      console.log(`User @${user.username} foi adicionado ao database`)
      console.log("--------------------------------\n")
      return
    }

   const userFounded = this._data.find((u) => u.username === user.username)

   if(userFounded) {
    console.log('Não foi possível cadastrar. Este username já existe')
    console.log("--------------------------------\n")
    return
   }

   this._data.push(user)
   console.log(`User @${user.username} foi adicionado ao database`)
   console.log("--------------------------------\n")
  }
}