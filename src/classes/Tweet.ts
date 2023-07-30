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
  
  public reply(tweet: Tweet) {}

  public like(like: Like) {
    if(!this._likes.length) {
      this._likes.push(like)
      return
    }

    const userFounded = this._likes.find((l) => l.user.id === like.user.id)

    if(userFounded) {
      console.log('Este usuário já curtiu esse tweet')
      return
    }

    this._likes.push(like)

  }

  //mostrar detalhe
  public show() {

    return {
      content: this._content,
      likes: this._likes
    }
  }

  //mostrar detalhe das respostas
  public showReplies() {}
}