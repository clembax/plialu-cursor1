import React from 'react';
import Success from '../../Success';
import type { PageKey } from '../seo/seoConfig';

export function MerciPage(props: {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageKey>>;
}) {
  const { setCurrentPage } = props;
  return (
        <Success onBackHome={() => setCurrentPage('home')} />
  );
}
