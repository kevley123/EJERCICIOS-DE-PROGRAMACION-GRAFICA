import React, { useState, useEffect } from 'react';
import './calculadora.css';

export default function Calculator() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetInput, setShouldResetInput] = useState(false);


  const appendNumber = (num: string) => {
    if (shouldResetInput) {
      setCurrentValue(num === '.' ? '0.' : num);
      setShouldResetInput(false);
    } else if (currentValue === '0' && num !== '.') {
      setCurrentValue(num);
    } else if (num === '.' && currentValue.includes('.')) {
      return; // no permite múltiples puntos
    } else {
      setCurrentValue(currentValue + num);
    }
  };

//seleccion de operadion
  const chooseOperation = (op: string) => {
    if (currentValue === '') return;
    
    if (previousValue !== null && !shouldResetInput) {
      calculate();
    }
    
    setPreviousValue(currentValue);
    setOperation(op);
    setShouldResetInput(true);
  };

  // calcular resultado
  const calculate = () => {
    if (!previousValue || !operation) return;

    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        result = curr !== 0 ? prev / curr : NaN;
        break;
      default:
        return;
    }

            // manejo de resultados no validos
    if (isNaN(result) || !isFinite(result)) {
      setCurrentValue('Error');
      setPreviousValue(null);
      setOperation(null);
      return;
    }

    setCurrentValue(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setShouldResetInput(true);
  };

  // limpiar todo
  const clear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetInput(false);
  };

  // borrar ultimo digito
  const deleteLast = () => {
    if (currentValue === 'Error') {
      clear();
      return;
    }
    
    if (currentValue.length === 1 || (currentValue.length === 2 && currentValue.startsWith('-'))) {
      setCurrentValue('0');
    } else {
      setCurrentValue(currentValue.slice(0, -1));
    }
  };

  // manejo de entrada desde teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9]/.test(e.key)) {
        appendNumber(e.key);
      } else if (e.key === '.') {
        appendNumber('.');
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        chooseOperation(e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
      } else if (e.key === 'Escape') {
        clear();
      } else if (e.key === 'Backspace') {
        deleteLast();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentValue, previousValue, operation, shouldResetInput]);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <div className="previous-operation">
            {previousValue} {operation}
          </div>
          <div className="current-value">{currentValue}</div>
        </div>
        <div className="buttons">
          <button className="function" onClick={clear}>C</button>
          <button className="function" onClick={deleteLast}>⌫</button>
          <button className="function" onClick={() => {
            setCurrentValue(prev => {
              if (prev === 'Error') return '-0';
              if (prev.startsWith('-')) return prev.substring(1);
              return '-' + prev;
            });
          }}>±</button>
          <button className="operator" onClick={() => chooseOperation('/')}>÷</button>

          <button onClick={() => appendNumber('7')}>7</button>
          <button onClick={() => appendNumber('8')}>8</button>
          <button onClick={() => appendNumber('9')}>9</button>
          <button className="operator" onClick={() => chooseOperation('*')}>×</button>

          <button onClick={() => appendNumber('4')}>4</button>
          <button onClick={() => appendNumber('5')}>5</button>
          <button onClick={() => appendNumber('6')}>6</button>
          <button className="operator" onClick={() => chooseOperation('-')}>−</button>

          <button onClick={() => appendNumber('1')}>1</button>
          <button onClick={() => appendNumber('2')}>2</button>
          <button onClick={() => appendNumber('3')}>3</button>
          <button className="operator" onClick={() => chooseOperation('+')}>+</button>

          <button className="zero" onClick={() => appendNumber('0')}>0</button>
          <button onClick={() => appendNumber('.')}>.</button>
          <button className="equals" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}