import React from 'react';
import Etancheite from '../../components/Etancheite';
import type { PageKey } from '../seo/seoConfig';

export function EtancheitePage(props: {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageKey>>;
}) {
  const { setCurrentPage } = props;
  return (
      <Etancheite setCurrentPage={setCurrentPage} />
  );
}
