import Ember from 'ember';

const {
  Helper: { helper },
  String: { htmlSafe }
} = Ember;

export function nl2br([text]) {
  var breakTag = '<br />';
  return new htmlSafe((text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2'));
}

export default helper(nl2br);
