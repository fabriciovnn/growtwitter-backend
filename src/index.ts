import { User } from "./classes/User"
import { Tweet } from "./classes/Tweet";
import { Like } from "./classes/Like";
import { DataBase } from "./database/DataBase";

//criação de usuários
const user1 = new User('daphne da silva', 'daphne' ,'daphne@teste.com', 'daphne123')
const user2 = new User('bruna maria', 'bruna', 'bruna@teste.com', 'bruna123')
const user3 = new User('fabricio vianna', 'fabr1ci0', 'fabricio@teste.com', 'fabricio123')

//cadastrar usuario ao banco de dados
DataBase.addUser(user1)
DataBase.addUser(user2)
DataBase.addUser(user3)

// criação de tweets normal
const tweet1 = new Tweet('Olá mundo! Este é o primeiro tweet!', 'normal', user1)
const tweet2 = new Tweet('Adoro a growdev :)', 'normal', user1)
const tweet3 = new Tweet('tweet mais recente!', 'normal', user1)

// criação de tweets reply
const reply1 = new Tweet('hehehe xD', 'reply', user2)
const reply2 = new Tweet('Legal!', 'reply', user2)
const reply3 = new Tweet('Que massa!', 'reply', user3)

user1.sendTweet(tweet1)
user1.sendTweet(tweet2)
user1.sendTweet(tweet3)

//likes em tweets
const like1 = new Like(user1)
const like2 = new Like(user2)
const like3 = new Like(user3)

tweet1.like(like2)
tweet1.like(like3)
tweet3.like(like1)
 
//Seguir outros usuarios
user2.follow(user1)
user2.follow(user3)
user3.follow(user1)

//dar reply em um tweet
tweet1.reply(reply1)
tweet2.reply(reply2)
tweet1.reply(reply3)

//mostrar replies de um tweet
tweet1.showReplies()

//mostrar feed de um user
user2.showFeed()
