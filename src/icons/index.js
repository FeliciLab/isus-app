import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ArrowLeftIcon = props => (
  <MaterialCommunityIcons name="arrow-left" {...props} />
);

export const MagnifyIcon = props => (
  <MaterialCommunityIcons name="magnify" {...props} />
);

export const CheckCircleoIcon = props => (
  <AntDesign name="checkcircleo" {...props} />
);

export const CloseCircleoIcon = props => (
  <AntDesign name="closecircleo" {...props} />
);

export const ArrowDropDownIcon = props => (
  <MaterialIcons name="arrow-drop-down" {...props} />
);
