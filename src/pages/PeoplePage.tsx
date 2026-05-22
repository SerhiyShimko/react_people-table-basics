import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';

export const PeoplePage = () => {
  const [allPeople, setAllPeople] = useState<Person[] | null>(null);
  const [shoowError, setShoowError] = useState(false);
  const [shoowLoading, setShoowLoading] = useState(false);

  useEffect(() => {
    setShoowLoading(true);
    getPeople()
      .then(people => {
        setAllPeople(people);
      })
      .catch(() => {
        setShoowError(true);
        setTimeout(() => {
          setShoowError(false);
        }, 5000);
      })
      .finally(() => {
        setShoowLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {shoowLoading && <Loader />}

          {shoowError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {allPeople && allPeople.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {allPeople && allPeople.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>Born</th>
                  <th>Died</th>
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {allPeople.map(personOld => {
                  const mother = allPeople.find(
                    onePerson => onePerson.name === personOld.motherName,
                  );
                  const father = allPeople.find(
                    onePerson => onePerson.name === personOld.fatherName,
                  );

                  const person = {
                    ...personOld,
                    mother: mother,
                    father: father,
                  };

                  return <PersonLink person={person} key={person.slug} />;
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
