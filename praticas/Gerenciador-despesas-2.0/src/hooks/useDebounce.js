import { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // Liga um cronômetro: só atualiza depois que você para de digitar
    const timer = setTimeout(() => setDebounced(value), delay);

    // Limpeza: se você digitar de novo, cancela o cronômetro anterior
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}