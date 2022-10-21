export function rate<T>(fn: () => T, perMillisecond: number): any {
    return fn;
}