import {expect, test} from 'vitest';



test('test flat method', () => {
    const array: (string[] | string)[] = ['1', ['2', '3']];

    const result = array.flat();

    expect(result).toEqual(['1', '2', '3']);

})