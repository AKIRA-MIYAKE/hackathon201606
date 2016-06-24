import xml2js from 'xml2js';


function fairXMLObject(input) {
  if (typeof input === 'undefined') {
    return input;
  }

  const unboxed = input.valueOf();

  let output = undefined;

  switch (typeof unboxed) {
  case 'object':
    if (Array.isArray(unboxed)) {
      output = unboxed.map((child) => {
        return fairXMLObject(child);
      });
    } else {
      output = {};
      Object.keys(unboxed).forEach((key) => {
        switch (key) {
        case 'housouKinshiYougoList':
          output = Object.assign(output, fairXMLObject(unboxed[key]));
          break;
        case 'dirtyWord':
          output[key] = unboxed[key].map((child) => {
            let temp = {};
            Object.keys(child).forEach((key) => {
              switch (key) {
              case 'word':
                temp = Object.assign(temp, fairXMLObject(child[key][0]));
                break;
              case 'replaceWordList':
                temp[key] = fairXMLObject(child[key][0].word)
                break;
              case 'notes':
                temp[key] = fairXMLObject(child[key][0]);
                break;
              default:
                temp[key] = fairXMLObject(child[key]);
                break;
              }
            });

            return temp;
          });
          break;
        case 'word':
          output = Object.assign(output, fairXMLObject(unboxed[key]));
          break;
        case '_':
          output.value = fairXMLObject(unboxed[key]);
          break;
        case '$':
          output.attributes = fairXMLObject(unboxed[key]);
          break;
        default:
          output[key] = fairXMLObject(unboxed[key]);
          break;
        }
      });
    }
    break;
  default:
    output = unboxed;
    break;
  }

  return output;
}


export default class XMLParser {

  constructor(xml) {
    this.xml = xml;
  }

  parse() {
    return new Promise((resolve, reject) => {
      xml2js.parseString(
        this.xml,
        { trim: true },
        (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(fairXMLObject(result));
        }
      );
    });
  }

}
