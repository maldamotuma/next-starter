type Shuffle<T> = T[];

export const shuffle = <T,>(inp: T[]): Shuffle<T> => {
    return inp.sort(() => Math.random() - 0.5);
}