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

  sendTweet(tweet: Tweet) {
    this._tweets.unshift(tweet)
  }

  follow(user: User) {
    // verificar se o usuário não é ele mesmo
    if(user.id === this.id) {
      console.log('Não é possivel seguir a si mesmo')
      return;
    }

    this._following.push(user)
  }

  // mostrar os tweets dos followings deste usuário
  showFeed() {
    this._following.forEach((user) => console.log(`${user.showTweets()}`))
  }

  // tweets deste usuario
  showTweets() {

    //utilizar o map
    this._tweets.forEach((tweet) => {
      if(!tweet.show().likes.length) {
        console.log(`@${this._username}: ${tweet.show().content}`)
      } 

      if(tweet.show().likes.length === 1) {
        console.log(`@${this._username}: ${tweet.show().content} \n[@${tweet.show().likes[0].user._username} like this!]`)
      }

      console.log(`@${this._username}: ${tweet.show().content} \n[@${tweet.show().likes[0].user._username} and others ${tweet.show().likes.length -1} like this!]`)
      
    })
  }
}