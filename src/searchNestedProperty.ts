import { SEARCH_FUNCTION, search } from "./search";

/**
 * Searches for a nested property within an object.
 *
 * @param {T} obj - the object to search within
 * @param {string[]} keys - the keys representing the path to the nested property
 * @param {string} value - the value to search for within the nested property
 * @param {SEARCH_FUNCTION} functionType - the type of search function to use
 * @return {boolean} indicates whether the nested property was found
 */
export function searchNestedProperty<T>(
  obj: T,
  keys: string[],
  value: string,
  functionType: SEARCH_FUNCTION
): boolean {
  const [currentKey, ...remainingKeys] = keys;

  if ((obj as { [key: string]: any })[currentKey] === undefined) return false;

  if (remainingKeys.length === 0) {
    return search({
      value: (obj as { [key: string]: any })[currentKey],
      query: value,
      searchFunction: functionType,
    });
  }

  if (
    typeof (obj as { [key: string]: any })[currentKey] === "object" &&
    (obj as { [key: string]: any })[currentKey] !== null
  ) {
    return searchNestedProperty(
      (obj as { [key: string]: any })[currentKey],
      remainingKeys,
      value,
      functionType
    );
  }

  return false;
}
