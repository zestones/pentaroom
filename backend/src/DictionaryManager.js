const fs = require('fs')

class DictionaryManager {
  constructor() {
    this.WordsUsed = []
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
