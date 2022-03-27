const fs = require('fs')
const path = require('path')

class DictionaryManager {
  constructor() {
    this.WordsUsed = []
  }

  // Look up a word in the dictionary
  initDictionary() {
    // get the dictionary with absolute path
    this.dictionary = JSON.parse(fs.readFileSync(path.join(__dirname, '../dictionary.json'), 'utf-8'))
  }

  getRandomWords() {
    let i = 0
    const Words = []
    while (i < 3) {
      const alea = Math.floor(Math.random() * this.dictionary.length)
      if (!this.WordsUsed.includes(this.dictionary[alea])) {
        this.WordsUsed.push(this.dictionary[alea])
        Words.push(this.dictionary[alea])
        i += 1
      }
    }
    return Words
  }
}

module.exports = DictionaryManager
