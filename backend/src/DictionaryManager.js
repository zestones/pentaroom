const fs = require('fs')

class DictionaryManager {
  constructor() {
    this.WordsUsed = []
    this.Words = []
  }

  // Look up a word in the dictionary
  initDictionary() {
    fs.readFile('../dictionary.json', (err, data) => {
      if (err) throw err
      this.Words = JSON.parse(data)
    })
  }

  getRandomWords() {
    let i = 0
    while (i < 3) {
      const alea = Math.floor(Math.random() * this.dictionary.length)
      if (!this.WordsUsed.includes(this.dictionary[alea])) {
        this.WordsUsed.push(this.dictionary[alea])
        this.Words.push(this.dictionary[alea])
        i += 1
      }
    }
  }
}
