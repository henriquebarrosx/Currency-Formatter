import { renderHook } from '@testing-library/react';
import { useCurrencyFormatterViewModel } from '.';
 
describe('Currency Formatter View Model', () => {
  it('deve formatar texto vazio para moeda (BRL) equivalente a R$ 0,00', () => {
    const { result } = renderHook(() => useCurrencyFormatterViewModel());
    expect(result.current.formatToCurrency('')).toEqual('R$ 0,00');
  });
 
  it('deve formatar texto que não seja apenas números para moeda (BRL) equivalente a R$ 0,00', () => {
    const { result } = renderHook(() => useCurrencyFormatterViewModel());
    expect(result.current.formatToCurrency('Lorem Ipsum')).toEqual('R$ 0,00');
    expect(result.current.formatToCurrency('0.a')).toEqual('R$ 0,00');
    expect(result.current.formatToCurrency('a.0')).toEqual('R$ 0,00');
    expect(result.current.formatToCurrency('0.-')).toEqual('R$ 0,00');
    expect(result.current.formatToCurrency('-.0')).toEqual('R$ 0,00');
  });
 
  it('deve formatar texto contendo apenas números em moeda (BRL)', () => {
    const { result } = renderHook(() => useCurrencyFormatterViewModel());
 
    expect(result.current.formatToCurrency('1')).toBe('R$ 0,01');
    expect(result.current.formatToCurrency('10')).toBe('R$ 0,10');
    expect(result.current.formatToCurrency('100')).toBe('R$ 1,00');
    expect(result.current.formatToCurrency('1000')).toBe('R$ 10,00');
    expect(result.current.formatToCurrency('10000')).toBe('R$ 100,00');
    expect(result.current.formatToCurrency('100000')).toBe('R$ 1.000,00');
    expect(result.current.formatToCurrency('1000000')).toBe('R$ 10.000,00');
    expect(result.current.formatToCurrency('10000000')).toBe('R$ 100.000,00');
    expect(result.current.formatToCurrency('100000000')).toBe('R$ 1.000.000,00');
  });
 
  it('deve formatar moeda (BRL) para números decimais ', () => {
    const { result } = renderHook(() => useCurrencyFormatterViewModel());
 
    expect(result.current.formatFromCurrencyToFloat('R$ 0,01')).toBe(0.01);
    expect(result.current.formatFromCurrencyToFloat('R$ 0,10')).toBe(0.10);
    expect(result.current.formatFromCurrencyToFloat('R$ 1,00')).toBe(1.0);
    expect(result.current.formatFromCurrencyToFloat('R$ 10,00')).toBe(10.0);
    expect(result.current.formatFromCurrencyToFloat('R$ 100,00')).toBe(100.0);
    expect(result.current.formatFromCurrencyToFloat('R$ 1.000,00')).toBe(1000.0);
    expect(result.current.formatFromCurrencyToFloat('R$ 10.000,00')).toBe(10000.0);
    expect(result.current.formatFromCurrencyToFloat('R$ 100.000,00')).toBe(100000.0);
    expect(result.current.formatFromCurrencyToFloat('R$ 1.000.000,00')).toBe(1000000.0);
  });
});
