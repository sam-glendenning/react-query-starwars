import React from 'react';
import NavBar from './components/navBar/navBar.component';
import Planets from './components/planets/planets.component';
import People from './components/people/people.component';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

function App() {
  const [page, setPage] = React.useState('planets');

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <h1>Star Wars Info</h1>
        <NavBar setPage={setPage} />
        <div className="content">
          { page === 'planets' ? <Planets /> : <People /> }
        </div>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
