import React from 'react';
import tw from '../libs/tailwind';
import Section from './Section';
import TText from './ui/TText';

export default function StoryLine(props: {story: string}) {
  if (!props.story) return null;
  return (
    <Section labelColor={'white'} label="Story line">
      <TText color={'white'} style={tw` text-gray-200 mx-2  `}>
        {props.story}
      </TText>
    </Section>
  );
}
