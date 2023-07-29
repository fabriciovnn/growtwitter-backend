import { Base } from "./Base";
import { Like } from "./Like";

type TypeTweet = 'normal' | 'reply'

export class Tweet extends Base {
  private _replies: Tweet[]
  private _likes: Like[]

  constructor(private _content: string, private _type: TypeTweet) {
    super();
    this._replies = []
    this._likes = []
  }
  
  public reply(tweet: Tweet) {}

  public like(like: Like) {}

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