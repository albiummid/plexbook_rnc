import React from 'react';
import ErrorUI from './Error';
import {LoadingSpinner} from './Loading';

export default function Fallback({
  error,
  isLoading,
}: {
  error: any;
  isLoading: boolean;
}) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorUI error={error} />;
  return null;
}
