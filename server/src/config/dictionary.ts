import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TranslateEntry } from '../types/entries/translate-entry';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function initializeDictionary() {
    const raw = fs.readFileSync(path.join(__dirname, "./data-file/eng-vietnamese.txt"), "utf-8");
    if (!raw) {
        return;
    }

    const meningWords = raw.split('@');

    const dictionary = [];
    let currentWord = null;
    let currentType = null;
    let currentPhonetic = null;
    let currentMeaning = null;

    for (let words of meningWords) {
        const line = words.trim().split('\n');
        if (line.length > 0 && line) {
            const englishWord = line[0];
            const type = line[1] || '';
            const meaning = line.slice(2).join('\n').trim();

            if (englishWord) {
                const wordPath = englishWord.split(' ');
                if (wordPath.length > 1) {
                    currentWord = wordPath[0].trim();
                    currentPhonetic = wordPath[1].trim();
                    currentType = type.replace('*', '').trim();
                    currentMeaning = meaning.split('-').map(m => {
                        const meaningPath = m.replace('\n', '').trim().split('=');
                        if (meaningPath.length > 1) {
                            return meaningPath[0].trim()
                        } else {
                            return m.trim();
                        }
                    }).filter(m => m)

                    dictionary.push({
                        word: currentWord,
                        type: currentType == 'danh từ' || currentType.includes('danh từ') ? 'noun' :
                            currentType == 'động từ' || currentType.includes('động từ') ? 'verb' :
                                currentType == 'tính từ' || currentType.includes('tính từ') ? 'adjective' :
                                    currentType == 'trạng từ' || currentType.includes('trạng từ') ? 'adverb' : 
                                        currentType == 'đại từ' || currentType.includes('đại từ') ? 'pronoun' :
                                            currentType == 'giới từ' || currentType.includes('giới từ') ? 'preposition' :
                                                currentType == 'liên từ' || currentType.includes('liên từ') ? 'conjunction' :
                                                    currentType == 'thán từ' || currentType.includes('thán từ') ? 'interjection' : 'unknown',
                        phonetic: currentPhonetic,
                        meaning: currentMeaning
                    } as TranslateEntry);

                }

            }
        }
    }

    fs.writeFileSync(path.join(__dirname, "./data-file/eng-vietnamese.json"), JSON.stringify(dictionary, null, 2), "utf-8");
    console.log(`Dictionary initialized successfully! Saved ${dictionary.length} entries.`);

    return dictionary;
}

const dictionary = initializeDictionary();

export default dictionary;