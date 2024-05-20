import { useLocation } from 'react-router-dom';

export function useSearchParams() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}
