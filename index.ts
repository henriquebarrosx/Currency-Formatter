export function useCurrencyFormatterViewModel(): CurrencyFormatterViewModel {
  function formatToCurrency(value: string): string {
    const valueAsNumber = value.replace(/[^\d]/g, '');
    const valueAsBigDecimal = parseInt(valueAsNumber, 10) / 100;
    if (isNaN(valueAsBigDecimal)) return 'R$ 0,00';
 
    const currencyBRL = valueAsBigDecimal.toLocaleString(
      'pt-BR',
      { style: 'currency', currency: 'BRL' }
    );
 
    /*
      NOTA:
 
      Por algum motivo, o espaço entre cifrão (R$) e o valor em reais (ex.: 0,00)
      não é o mesmo que uma string com espaço (' '), impactando negativamente
      nas asserções dos testes automatizados!
    */
    const withoutIrregularSpace = currencyBRL.replace(/\s/g, ' ');
    return withoutIrregularSpace;
  }
 
  function formatFromCurrencyToFloat(value: string): number {
    const withoutSignal = value.replace('R$', '');
    const withoutBigDecimals = withoutSignal.replace(/\./g, '');
    const withoutComma = withoutBigDecimals.replace(',', '.');
    return parseFloat(withoutComma);
  }
 
  function _onKeyUp(event: Event, callback: (value: string) => void): void {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement) return;
 
    inputElement.value = formatToCurrency(inputElement.value);
    callback(formatToCurrency(inputElement.value));
  }
 
  function bindToField(name: string, callback: (value: string) => void = () => { }): void {
    const inputElement = document.querySelector(`input[name=${name}]`);
    if (!inputElement) return;
 
    inputElement.addEventListener('keyup', (event) => _onKeyUp(event, callback));
  }
 
  function unbindField(name: string): void {
    const inputElement = document.querySelector(`input[name=${name}]`);
    if (!inputElement) return;
 
    inputElement.removeEventListener('keyup', (event) => _onKeyUp(event, () => { }));
  }
 
  return {
    bindToField,
    unbindField,
    formatToCurrency,
    formatFromCurrencyToFloat,
  }
}
 
export type CurrencyFormatterViewModel = {
  bindToField(name: string, callback?: (value: string) => void): void;
  unbindField(name: string): void;
  formatToCurrency(value: string): string;
  formatFromCurrencyToFloat(value: string): number;
}
 
