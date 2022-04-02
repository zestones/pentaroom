const fs = require('fs')
const path = require('path')

class DictionaryManager {
  constructor() {
    this.dictionary = []
  }

  /**
   * Load the dictionnary
   */
  initDictionary() {
    this.dictionary = JSON.parse(fs.readFileSync(path.join(__dirname, '../dictionary.json'), 'utf-8'))
  }

  /**
   * Return n random words from the dictionnary
   * @param {int} n nb of random words
   * @returns an array of random words
   */
  getRandomWords(n = 3) {
    // shuffle the dictionnary
    const shuffled = this.dictionary.sort(() => 0.5 - Math.random())

    // get random words
    const randomWords = shuffled.slice(0, n)

    // return random words
    return randomWords
  }
}

module.exports = DictionaryManager
