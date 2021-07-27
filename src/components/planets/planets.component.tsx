import React from "react";
import { useQuery } from "react-query";
import PlanetViewer from "./planetViewer.component";
import { Planet } from "../../app.types";

const fetchPlanets = async (page: string | number): Promise<any> => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = (): React.ReactElement => {
  const [page, setPage] = React.useState(1);
  const [previous, setPrevious] = React.useState(false);
  const [next, setNext] = React.useState(true);

  /**
  * data - the response returned from fetchPlanets
  * status - "loading" | "error" | "success"
  * 
  * The first argument to useQuery is the queryKey. This is typically a string denoting the name of the query as shown in devtools
  * We can make this first argument an array, if we want to pass arguments to the query function
  * The array's first argument is the query name, then the following arguments are arguments to the query function
  * We can then pass these like useQuery(['name', variable], () => function(variable));
  * Alternatively, without any arguments, we can simply do useQuery('name', function);
  * 
  * fetchPlanets will be called up to 3 times if it fails to fetch any data (e.g. invalid endpoint, loss of connection, etc.)
  * During this time, status will be "loading". After 3 failed attempts, it will be "error"
  */
  const { data, status } = useQuery(['planets', page], (params) => fetchPlanets(params.queryKey[1]));
  
  React.useEffect(() => {
    page > 1 ? setPrevious(true) : setPrevious(false);
    page < 6 ? setNext(true) : setNext(false);
  }, [page]);

  return (
    <div>
      <h2>Planets</h2>

      <button disabled={!previous} onClick={() => setPage(page-1)}>Previous</button>
      <button disabled={!next} onClick={() => setPage(page+1)}>Next</button>

      {status === 'loading' && (
        <p>Loading data...</p>
      )}
      {status === 'error' && (
        <p>Error fetching data</p>
      )}
      {status === 'success' && (
        <div>
          {data.results.map((planet: Planet) =>
            <PlanetViewer key={planet.name} planet={planet} />
          )}
        </div>
      )}
    </div>
  );
};

export default Planets;
