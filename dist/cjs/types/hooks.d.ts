export declare function useState(initialValue: any): any[];
type EffectCallback = () => void;
export declare function useEffect(effect: EffectCallback, deps?: any[]): void;
export declare function useMemo<T>(fn: () => T, deps: any[]): T;
export {};
