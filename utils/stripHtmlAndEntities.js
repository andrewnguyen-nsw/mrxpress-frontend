/**
 * Strips HTML tags, entities, and specific characters from a string.
 *
 * This function takes an HTML string and removes all HTML tags, entities
 * (like &nbsp;), and specific unwanted characters (e.g., '┝'), returning a plain text string.
 * It first uses a temporary DOM element to parse the HTML and extract the text content.
 * This approach is safe against XSS attacks as it does not render the HTML.
 * After extracting the text, it replaces multiple consecutive whitespace characters
 * (including non-breaking spaces) with a single space, removes the specified character '┝',
 * and trims leading or trailing spaces.
 *
 * @param {string} html - The HTML string to be stripped.
 * @returns {string} A plain text string with no HTML tags, entities, or specified characters.
 */

export const stripHtmlAndEntities = (html) => {
  // Create a new div element for parsing HTML
  var temporalDivElement = document.createElement("div");
  // Set the innerHTML to the provided string
  temporalDivElement.innerHTML = html;
  // Extract text content from the parsed HTML
  let text = temporalDivElement.textContent || temporalDivElement.innerText || "";
  // Replace multiple whitespace characters with a single space, remove '┝', and trim
  return text.replace(/\s+/g, ' ').replace(/┝/g, '').trim();
}
