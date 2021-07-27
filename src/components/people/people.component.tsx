import React from "react";
import { useQuery } from "react-query";
import PersonViewer from "./personViewer.component";
import { Person } from "../../app.types";

const fetchPeople = async(page: string | number): Promise<any> => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

const People = (): React.ReactElement => {
  const [page, setPage] = React.useState(1);
  const [previous, setPrevious] = React.useState(false);
  const [next, setNext] = React.useState(true);

  /**
   * data - the response returned from fetchPeople
   * status - "loading" | "error" | "success"
   * 
   * fetchPeople will be called up to 3 times if it fails to fetch any data (e.g. invalid endpoint, loss of connection, etc.)
   * During this time, status will be "loading". After 3 failed attempts, it will be "error"
   */
  const { data, status } = useQuery(['people', page], (params) => fetchPeople(params.queryKey[1]));

  React.useEffect(() => {
    page > 1 ? setPrevious(true) : setPrevious(false);
    page < 6 ? setNext(true) : setNext(false);
  }, [page]);

  return (
    <div>
      <h2>People</h2>

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
          {data.results.map((person: Person) =>
            <PersonViewer key={person.name} person={person} />
          )}
        </div>
      )}
    </div>
  );
};

export default People;
