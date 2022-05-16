import reducer, { setValue, clear } from 'redux/gameReducer';

describe('Game reducer', () => {
  it("Should don't set any value with empty object", () => {
    expect(reducer(undefined, setValue({}))).toEqual({
      who: '',
      when: '',
      what: '',
      where: '',
    });
  });
  it('Should hydrate objects', () => {
    expect(reducer(undefined, setValue({ who: '123', what: '444' }))).toEqual({
      who: '123',
      when: '',
      what: '444',
      where: '',
    });
  });
  it('Should trim', () => {
    expect(
      reducer(
        undefined,
        setValue({ who: '    123', what: '     44 4            ' })
      )
    ).toEqual({
      who: '123',
      when: '',
      what: '44 4 ',
      where: '',
    });
  });
  it('Should clear all values', () => {
    expect(
      reducer(
        {
          who: '123',
          when: '',
          what: '444 ',
          where: '',
        },
        clear()
      )
    ).toEqual({
      who: '',
      when: '',
      what: '',
      where: '',
    });
  });
});
