import React from 'react';
import tw from '../../libs/tailwind';
import TText from './TText';
import TView from './TView';

export default function ErrorUI({error}: {error: any}) {
  return (
    <TView style={tw`bg-black flex-1 justify-center items-center`}>
      <TText style={tw`text-lg text-white`}>Something went wrong</TText>
      <TText style={tw`text-xs`}>{String(error)}</TText>
    </TView>
  );
}
