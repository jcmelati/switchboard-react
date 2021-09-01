import React from 'react';
import PropTypes from 'prop-types';

import { ProvideIam } from './hooks/iam.context';

const Providers = (props: { children: JSX.Element; }): JSX.Element => {
  const { children } = props;

  return (
    <ProvideIam>
      {children}
    </ProvideIam>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
