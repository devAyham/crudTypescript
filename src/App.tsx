import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

import "./App.scss";
import AppRouter from "./router/AppRouter";

function App() {
  let queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AppRouter />
      </div>
      <ReactQueryDevtools initialIsOpen={true} position={'bottom-right'}/>
    </QueryClientProvider>
  );
}

export default App;
