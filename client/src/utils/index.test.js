import {spliceAndInsert} from './';

it('insert to array', () => {
    const ret = spliceAndInsert([2,3,4,5,1],4,2);
    expect(ret[0]).toBe(2);
    expect(ret[1]).toBe(3);
    expect(ret[2]).toBe(5);
    expect(ret[3]).toBe(1);
    expect(ret[4]).toBe(4);
});

it('insert to array2', () => {
    const ret = spliceAndInsert([2,3,4,5,1],0,3);
    expect(ret[0]).toBe(5);
    expect(ret[1]).toBe(2);
    expect(ret[2]).toBe(3);
    expect(ret[3]).toBe(4);
    expect(ret[4]).toBe(1);
});

it('insert to array3', () => {
    const ret = spliceAndInsert([2,3,4,5,1],2,3);
    expect(ret[0]).toBe(2);
    expect(ret[1]).toBe(3);
    expect(ret[2]).toBe(5);
    expect(ret[3]).toBe(4);
    expect(ret[4]).toBe(1);
});
