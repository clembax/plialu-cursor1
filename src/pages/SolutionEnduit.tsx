import React from 'react';
import EnduitMinceIsolant from '../components/solutions/EnduitMinceIsolant';
import type { PageKey } from '../seo/seoConfig';

export function SolutionEnduitPage(props: {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageKey>>;
}) {
  const { setCurrentPage } = props;
  return (
        <EnduitMinceIsolant setCurrentPage={setCurrentPage} />
  );
}
