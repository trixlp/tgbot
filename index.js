const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = "6907736010:AAEKp2Tpu9R0f1QHbc8RjFOtoEvHdtTIE3c"

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`)
        const randomNumber = Math.floor(Math.random() * 10)
        chats[chatId] = randomNumber
        await bot.sendMessage(chatId, 'Отгадывай!', gameOptions)
}

const start = () => {
    bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Получить информацию о пользователе' },
    { command: '/game', description: 'Игра в угадай цифру' }
])
}

bot.on('message',  async msg => {
    const text = msg.text
    const chatId = msg.chat.id
    if (text === '/start') {
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/320/625/3206250e-cee1-4819-9061-668f394a9df6/1.webp')
        return bot.sendMessage(chatId, `Добро пожаловать на бесполезный бот который ничего не делает как и автор этого бота`)
    }
    if (text === '/info') {
        return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.first_name}`)
    }

    if (text === '/game') {
        return startGame(chatId)
    }

        return bot.sendMessage(chatId, 'Я тебя не понимаю, поробуй еще раз!')
    
    })
    bot.on('callback_query', msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === '/again') {
            return startGame(chatId)
        }
        if(data === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions)
        }
        else {
            return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загад число: ${chats[chatId]}`, againOptions)
        }
})

