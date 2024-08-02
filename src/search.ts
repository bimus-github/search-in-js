/** Search functions
 *
 * equal - returns true if the value is equal to the query value (e.g. 1 == 1) (default)
 *
 * fuzzy - returns true if the value fuzzy matches the query value (e.g. 1 == 1 or 1 == 11 or "111" == "11 1")
 *
 * contains - returns true if the value contains the query value (e.g. 1 contains 1 or 1 contains 11)
 *
 * starts-with - returns true if the value starts with the query value (e.g. 1 == 1 or 1234 === 12)
 *
 * ends-with - returns true if the value ends with the query value (e.g. 1 == 1 or 1234 == 34)
 *
 * starts-with-no-space - returns true if the value starts with the query value (e.g. 1 == 1 or "abd" == "ab" or "ab d" === "a bd")
 *
 * greater - returns true if the value is greater than the query value (e.g. 1 > 0 or a > b)
 *
 * less - returns true if the value is less than the query value (e.g. 1 < 2 or a < b)
 *
 * greater-equal - returns true if the value is greater than or equal to the query value (e.g. 1 >= 1 or a >= a)
 *
 * less-equal - returns true if the value is less than or equal to the query value (e.g. 1 <= 1 or a <= a)
 *
 */
export type SEARCH_FUNCTION =
  | "fuzzy"
  | "equal"
  | "contains"
  | "starts-with"
  | "ends-with"
  | "starts-with-no-space"
  | "greater"
  | "less"
  | "greater-equal"
  | "less-equal";

interface Props {
  value: string | number;
  query: string | number;
  searchFunction: SEARCH_FUNCTION;
}

/**
 * Search function
 * @param {string | number} value - The value to search
 * @param {string | number} query - The query to search for in the value
 * 
 * @returns {boolean} Returns true if the value matches the query
 * 
 * @example
 * const data: {id: number, name: string}[] = [
 *  {id: 1, name: "test1"},
 *  {id: 12, name: "test2"},
 *  {id: 123, name: "test3"}
 ]
 * const filterdedData = data.filter((data) => search({value: data.id, query: 1, searchFunction: "equal"}));
 * console.log(filterdedData); // [{id: 1, name: "test1"}]
 * 
 * const filterdedData = data.filter((data) => search({value: data.id, query: 1, searchFunction: "fuzzy"}));
 * console.log(filterdedData); // [{id: 1, name: "test1"}, {id: 12, name: "test2"}, {id: 123, name: "test3"}]
 */

export function search(props: Props): boolean {
  const { value, query, searchFunction } = props;

  switch (searchFunction) {
    case "fuzzy": {
      return fuzzySearch(value.toString(), query.toString());
    }
    case "equal":
      return value.toString().toLowerCase() === query.toString().toLowerCase();
    case "contains":
      return containsPattern(value.toString(), query.toString());
    case "ends-with":
      return endsWithPattern(value.toString(), query.toString());
    case "starts-with":
      return startsWithPattern(value.toString(), query.toString());
    case "greater":
      return value > query;
    case "less":
      return value < query;
    case "greater-equal":
      return value >= query;
    case "less-equal":
      return value <= query;
    default:
      return value === query;
  }
}

export function fuzzySearch(search: string, text: string) {
  // Escape special characters in the search term
  const escapedSearch = search.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  // Create a fuzzy regex pattern
  const fuzzyPattern = escapedSearch.split("").join(".*?");

  // Create a regex object with the fuzzy pattern
  const regex = new RegExp(fuzzyPattern, "i");

  // Test the regex against the text
  return regex.test(text);
}

export function containsPattern(search: string, text: string) {
  // Remove all spaces from the search term and the text
  const searchNoSpaces = search.replace(/\s+/g, "");
  const textNoSpaces = text.replace(/\s+/g, "");

  // Escape special characters in the search term
  const escapedSearch = searchNoSpaces.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  // Create a regex object with the escaped search term
  const regex = new RegExp(escapedSearch, "i");

  // Test the regex against the text
  return regex.test(textNoSpaces);
}

export function endsWithPattern(search: string, text: string) {
  // Remove all spaces from the search term and the text
  const searchNoSpaces = search.replace(/\s+/g, "");
  const textNoSpaces = text.replace(/\s+/g, "");

  // Escape special characters in the search term
  const escapedSearch = searchNoSpaces.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  // Create a regex object with the escaped search term anchored to the end
  const regex = new RegExp(escapedSearch + "$", "i");

  // Test the regex against the text
  return regex.test(textNoSpaces);
}

export function startsWithPattern(search: string, text: string) {
  // Remove all spaces from the search term and the text
  const searchNoSpaces = search.replace(/\s+/g, "");
  const textNoSpaces = text.replace(/\s+/g, "");

  // Escape special characters in the search term
  const escapedSearch = searchNoSpaces.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

  // Create a regex object with the escaped search term anchored to the start
  const regex = new RegExp("^" + escapedSearch, "i");

  // Test the regex against the text
  return regex.test(textNoSpaces);
}
