import { Base } from "./Base";
import { Like } from "./Like";
import { User } from "./User";

type TypeTweet = 'normal' | 'reply'

export class Tweet extends Base {
  private _replies: Tweet[]
  private _likes: Like[]

  constructor(private _content: string, private _type: TypeTweet, private _user: User ) {
    super()
    this._replies = []
    this._likes = []
  }
  
  public get user() : User {
    return this._user
  }

  public get type() : string {
    return this._type
  }
  
  public reply(tweet: Tweet) {
    if(this._user.id === tweet._user.id) {
      console.log('não é possível dar reply em um tweet criado por si mesmo')
      console.log("--------------------------------\n")
      return;
    }

    if(tweet.type === 'normal') {
      console.log("Não foi possível responder. Tweet precisa ser do tipo 'reply'")
      console.log("--------------------------------\n")
      return
    }

    this._replies.push(tweet)
    console.log('tweet reply enviado com sucesso!')
    console.log("--------------------------------\n")
  }

  public like(like: Like) {
    if(!this._likes.length) {
      this._likes.unshift(like)
      return
    }

    const userFounded = this._likes.find((l) => l.user.id === like.user.id)

    if(userFounded) {
      console.log('Este usuário já curtiu esse tweet')
      return
    }

    this._likes.push(like)

  }

  public show() {

    return {
      content: this._content,
      likes: this._likes,
      replies: this._replies
    }
  }

  public showReplies() {
    if(!this._likes.length) {
      console.log(`@${this.user.username}: ${this._content} \n[0 Likes]`)

      if(this._replies.length) {
        this._replies.forEach(reply => console.log(`   > ${reply._user.username}: ${reply._content}`))
      }

      console.log("--------------------------------\n")
      return
    }

    if(this._likes.length === 1) {
      console.log(`@${this._user.username}: ${this._content} \n[@${this._likes[0].user.username} like this!]`)

      if(this._replies.length) {
        this._replies.forEach(reply => console.log(`   > ${reply._user.username}: ${reply._content}`))
      }

      return
    }

    console.log(`@${this._user.username}: ${this._content} \n[@${this._likes[0].user.username} and other ${this._likes.length -1} user liked this!]`)

    if(this._replies.length) {
      this._replies.forEach(reply => console.log(`   > ${reply._user.username}: ${reply._content}`))
    }
    console.log("--------------------------------\n")
  }
}