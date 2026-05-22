import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { Link, NavLink, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex !== 'm',
          })}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          person.mother ? (
            <Link
              to={`/people/${person.mother.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </Link>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          person.father ? (
            <Link to={`/people/${person.father.slug}`}>
              {person.fatherName}
            </Link>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
