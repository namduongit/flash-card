import dictionary from '../config/dictionary';
import { TranslateEntry } from '../types/entries/translate-entry';

export class TranslationService {

  async translate(english: string): Promise<TranslateEntry | null> {
    if (!dictionary || dictionary.length === 0) {
      return null;
    }

    const result = dictionary.find(
      (entry: TranslateEntry) => entry.word.toLowerCase() === english.toLowerCase()
    );

    return result || null;
  }

  async searchWords(query: string): Promise<TranslateEntry[]> {
    if (!dictionary || dictionary.length === 0) {
      return [];
    }

    const results = dictionary
      .filter((entry: TranslateEntry) => 
        entry.word.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 5);

    return results;
  }
}
