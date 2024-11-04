import {TouchableOpacity} from 'react-native';
import tw from '../../libs/tailwind';

export const ActionButton = ({
  isLoading,
  onPress,
  Icon,
  iconName,
  isEnabled,
}: {
  isLoading: boolean;
  onPress: () => void;
  Icon: any;
  iconName: string;
  isEnabled: boolean;
}) => {
  return (
    <TouchableOpacity disabled={isLoading} onPress={onPress}>
      <Icon
        name={iconName}
        size={20}
        style={tw.style(
          ` mr-auto p-2 rounded-full`,
          isEnabled ? 'bg-primary text-white' : 'text-primary bg-white',
          isLoading && ' opacity-80',
        )}
      />
    </TouchableOpacity>
  );
};
