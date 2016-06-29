import { sharedTokenizer } from '../morphological-analysis';


function _isHiragana(text) {
  return text.match(/^[\u3040-\u309F]+$/);
}

function _isKatakana(text) {
  return text.match(/^[\u30A0-\u30FF]+$/);
}

function _compareTokenizedWord(source, target) {
  if (source.reading && target.reading) {
    if (source.reading !== target.reading) {
      return false;
    } else {
      if (_isHiragana(target.surface_form)) {
        if (_isHiragana(source.surface_form) || _isKatakana(target.surface_form)) {
          return true;
        } else {
          return false;
        }
      } else if (_isKatakana(target.surface_form)) {
        if (_isHiragana(source.surface_form) || _isKatakana(target.surface_form)) {
          return true;
        } else {
          return false;
        }
      } else {
        return source.surface_form === target.surface_form;
      }
    }
  } else {
    return source.surface_form === target.surface_form;
  }
}


export default class Retriver {

  constructor(criteria = []) {
    this.criteria = criteria;

    this.isReady = false;
    this.tokenizer = undefined;

    this.tokenizedCriteria = [];
  }

  prepare() {
    return Promise.resolve()
    .then(() => sharedTokenizer())
    .then((tokenizer) => {
      this.tokenizer = tokenizer;

      this.tokenizedCriteria = this.criteria
      .map((criterion) => tokenizer.tokenize(criterion));

      this.isReady = true;

      return this;
    });
  }

  retrive(target = '') {
    let matchedCriterionIndexes = new Set();

    const tokenizedTarget = this.tokenizer.tokenize(target);

    this.tokenizedCriteria.forEach((criterion, criterionIndex) => {
      let targetIndex = 0;
      while (targetIndex < tokenizedTarget.length) {
        const isMatch = criterion.every((word, index) => {
          if (targetIndex + index >= tokenizedTarget.length) {
            return false;
          }

          return _compareTokenizedWord(
            word,
            tokenizedTarget[targetIndex + index]
          );
        });

        if (isMatch) {
          matchedCriterionIndexes.add(criterionIndex);
        }

        targetIndex += 1;
      }
    });

    return Array.from(matchedCriterionIndexes);
  }

}
