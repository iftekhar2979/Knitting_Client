import React from 'react';

const TableHeading = ({headings ,className}) => {
  return (
    <>
      <th scope='col' className={`  border ${className}`}>
        {headings}
      </th>
    </>
  );
};

export default TableHeading;
