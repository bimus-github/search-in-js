import { SEARCH_FUNCTION } from "./search";
/**
 * Searches for a nested property within an object.
 *
 * @param {T} obj - the object to search within
 * @param {string[]} keys - the keys representing the path to the nested property
 * @param {string} value - the value to search for within the nested property
 * @param {SEARCH_FUNCTION} functionType - the type of search function to use
 * @return {boolean} indicates whether the nested property was found
 */
export declare function searchNestedProperty<T>(obj: T, keys: string[], value: string, functionType: SEARCH_FUNCTION): boolean;
