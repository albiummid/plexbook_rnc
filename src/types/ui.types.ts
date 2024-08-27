import {PropsWithChildren} from 'react';
import {ColorValue, TextProps, ViewProps} from 'react-native';

export type twNumberValue =
  | '00'
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '14'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '36'
  | '40'
  | '44'
  | '48'
  | '52'
  | '56'
  | '60'
  | '64'
  | '72'
  | '80'
  | '96';

export type TComponentProps<T> = PropsWithChildren<T> & {
  stack?: 'vStack' | 'hStack';
  gap?: number;
  gapX?: number;
  gapY?: number;
  justifyContent?: 'center' | 'between' | 'around' | 'start' | 'evenly';
  alignItems?: 'center' | 'start' | 'end' | 'baseline';
  mT?: number;
  mt?: twNumberValue;
  mB?: number;
  mL?: number;
  mR?: number;
  mX?: number;
  mY?: number;
  m?: number;
};

export type TTextProps = TComponentProps<TextProps> & {
  color?: ColorValue;
};

export type TViewProps<T = unknown> = PropsWithChildren<T & ViewProps>;
