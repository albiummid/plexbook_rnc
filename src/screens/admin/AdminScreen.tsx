import React, {useState} from 'react';
import Header from '../../components/layout/Header';
import TabGroupButtons, {TTabItem} from '../../components/ui/TabGroupButtons';
import TView from '../../components/ui/TView';
import tw from '../../libs/tailwind';
import Users from './Users';
import Versions from './Versions';

export default function AdminScreen() {
  const [activeTab, setActiveTab] = useState('versions');
  const tabs: TTabItem[] = [
    {
      label: 'Versions',
      value: 'versions',
      component: Versions,
    },
    {
      label: 'Users',
      value: 'users',
      component: Users,
    },
  ];
  return (
    <TView style={tw`bg-black flex-1`}>
      <Header title="Admin panel" textStyle={tw`text-white`} />
      <TabGroupButtons
        textStyle={tw`text-white`}
        containerStyle={tw`mx-auto`}
        tabItems={tabs}
        activeItem={activeTab}
        onChange={v => {
          setActiveTab(v);
        }}
      />
    </TView>
  );
}
