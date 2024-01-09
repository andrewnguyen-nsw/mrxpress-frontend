/**
 * Decodes HTML entities in a string.
 *
 * This function is designed to decode HTML entities in a given string. It is particularly
 * useful for converting entities like '&nbsp;', '&amp;', '&lt;', etc., to their corresponding
 * characters (' ', '&', '<', etc.). The function works by creating a temporary `textarea`
 * DOM element, setting its `innerHTML` to the string with HTML entities, and then retrieving
 * the `value` of the textarea. This approach effectively decodes the entities. The use of a
 * `textarea` element is beneficial because it correctly handles almost all HTML entities and
 * is a lightweight solution compared to other DOM elements.
 *
 * @param {string} str - The string containing HTML entities to be decoded.
 * @returns {string} The decoded string with HTML entities converted to their respective characters.
 */

export const decodeHtmlEntity = (str) => {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
};
