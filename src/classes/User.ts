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


  public sendTweet(tweet: Tweet) {
      if(this.id !== tweet.show().user.id) {
        console.log('Não é possível enviar um tweet criado por outra pessoa.');
        console.log("--------------------------------\n")
        return
      }

      if(tweet.show().type === 'reply') {
        console.log('não é possível enviar um tweet do tipo reply')
        console.log("--------------------------------\n")
        return;
      }

    console.log(`@${this._username} criou um novo tweet!`)
    console.log("--------------------------------\n")
    this._tweets.unshift(tweet)
  }

  public follow(user: User) {
    if(user.id === this.id) {
      console.log('Não é possivel seguir a si mesmo.')
      console.log("--------------------------------\n")
      return;
    }

    this._followers.push(user)
    console.log(`Agora você está seguindo @${user._username}!`)
    console.log("--------------------------------\n")
  }

  public show() {
    return {
      name: this._name,
      username: this._username,
      email: this._email,
      tweets: this._tweets.length ? this._tweets.length : [],
      follwers: this._followers.length ? this._followers.length : []
    }
  }

  public showFeed() {
    if(!this._followers.length) {
      console.log('não há nada para mostrar :(. Comece a seguir usuários!')
      return
    }

    this._followers.forEach((user) => user.showTweets())
  }

  public showTweets() {
    this._tweets.forEach((tweet) => {
      if(!tweet.show().likes.length) {
        console.log(`@${this._username}: ${tweet.show().content} \n[0 Likes]`)

        if(tweet.show().replies.length) {
          tweet.show().replies.forEach((reply, index) => console.log(`   > ${reply.show().user._username}: ${reply.show().content}`))
        }

        console.log("--------------------------------\n")
        return
      } 

      if(tweet.show().likes.length === 1) {
        console.log(`@${this._username}: ${tweet.show().content} \n[@${tweet.show().likes[0].show().user._username} like this!]`)

        if(tweet.show().replies.length) {
          tweet.show().replies.forEach((reply, index) => console.log(`   > ${reply.show().user._username}: ${reply.show().content}`))
        }

        console.log("--------------------------------\n")
      return
      }

      console.log(`@${this._username}: ${tweet.show().content} \n[@${tweet.show().likes[0].show().user._username} and other ${tweet.show().likes.length -1} user liked this!]`)

      if(tweet.show().replies.length) {
        tweet.show().replies.forEach((reply, index) => console.log(`   > ${reply.show().user._username}: ${reply.show().content}`))
      }
      console.log("--------------------------------\n")
    })
  }
}