import { Base } from "./Base";
import { Tweet } from "./Tweet";

export class User extends Base {
  private _following: User[]
  private _tweets: Tweet[]

  constructor(private _name: string, private _username: string, private _email: string, private _password: string) {
    super()
    this._following = []
    this._tweets = []
  }

  public get username() : string {
    return this._username
  }
  

  sendTweet(tweet: Tweet) {
      if(this.id !== tweet.user.id) {
        console.log('Não é possível enviar um tweet criado por outra pessoa.');
        return
      }
    console.log('tweet enviado com sucesso!')
    this._tweets.unshift(tweet)
  }

  follow(user: User) {
    // verificar se o usuário não é ele mesmo
    if(user.id === this.id) {
      console.log('Não é possivel seguir a si mesmo.')
      console.log("--------------------------------\n")
      return;
    }

    this._following.push(user)
    console.log(`Agora você está seguindo @${user._username}!`)
    console.log("--------------------------------\n")
  }

  // mostrar os tweets dos followings deste usuário
  showFeed() {
    this._following.forEach((user) => user.showTweets())
  }

  // tweets deste usuario
  showTweets() {
    this._tweets.forEach((tweet) => {
      if(!tweet.show().likes.length) {
        console.log(`@${this._username}: ${tweet.show().content} \n[0 Likes]`)
        console.log("--------------------------------\n")
        return
      } 

      if(tweet.show().likes.length === 1) {
        console.log(`@${this._username}: ${tweet.show().content} \n[@${tweet.show().likes[0].user._username} like this!]`)
        console.log("--------------------------------\n")
      return
      }

      console.log(`@${this._username}: ${tweet.show().content} \n[@${tweet.show().likes[0].user._username} and other ${tweet.show().likes.length -1} user liked this!]`)
      console.log("--------------------------------\n")
    })
  }
}