import { QueryClient, QueryClientProvider } from "react-query";

import './App.css'
import StockDataWrapper from './components/StockDataWrapper'

const queryClient = new QueryClient({});

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <StockDataWrapper />
      </QueryClientProvider>
  )
}

export default App
