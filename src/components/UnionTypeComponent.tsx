import React from 'react';

interface TADMIN {
  role: 'admin';
  userName: string;
}

interface TUSER {
  role: 'user';
  userName: string;
}

interface TPERSON {
  person: TADMIN | TUSER;
}

const UnionTypeComponent: React.FC<TPERSON> = ({ person }) => {
  if (person?.role === 'admin') {
    return (
      <div>
        <h2>Admin name is: {person?.userName}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>User name is: {person?.userName}</h2>
      </div>
    );
  }
};

export default UnionTypeComponent;
