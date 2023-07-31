import { Base } from "./Base";
import { Tweet } from "./Tweet";

export class User extends Base {
  private _followers: User[]
  private _tweets: Tweet[]

  constructor(private _name: string, private _username: string, private _email: string, private _password: string) {
    super()
    this._followers = []
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

      if(tweet.type === 'reply') {
        console.log('não é possível enviar um tweet do tipo reply')
        return;
      }

    console.log('tweet enviado com sucesso!')
    this._tweets.unshift(tweet)
  }

  follow(user: User) {
    if(user.id === this.id) {
      console.log('Não é possivel seguir a si mesmo.')
      console.log("--------------------------------\n")
      return;
    }

    this._followers.push(user)
    console.log(`Agora você está seguindo @${user._username}!`)
    console.log("--------------------------------\n")
  }

  showFeed() {
    if(!this._followers.length) {
      console.log('não há nada para mostrar :(. Comece a seguir usuários!')
      return
    }

    this._followers.forEach((user) => user.showTweets())
  }

  showTweets() {
    this._tweets.forEach((tweet) => {
      if(!tweet.show().likes.length) {
        console.log(`@${this._username}: ${tweet.show().content} \n[0 Likes]`)

        if(tweet.show().replies.length) {
          tweet.show().replies.forEach((reply, index) => console.log(`   > ${reply.user._username}: ${reply.show().content}`))
        }

        console.log("--------------------------------\n")
        return
      } 

      if(tweet.show().likes.length === 1) {
        console.log(`@${this._username}: ${tweet.show().content} \n[@${tweet.show().likes[0].user._username} like this!]`)

        if(tweet.show().replies.length) {
          tweet.show().replies.forEach((reply, index) => console.log(`   > ${reply.user._username}: ${reply.show().content}`))
        }

        console.log("--------------------------------\n")
      return
      }

      console.log(`@${this._username}: ${tweet.show().content} \n[@${tweet.show().likes[0].user._username} and other ${tweet.show().likes.length -1} user liked this!]`)

      if(tweet.show().replies.length) {
        tweet.show().replies.forEach((reply, index) => console.log(`   > ${reply.user._username}: ${reply.show().content}`))
      }
      console.log("--------------------------------\n")
    })
  }
}