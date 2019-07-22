// Type definitions for react-native-modal-dropdown 0.6
// Project: https://github.com/sohobloo/react-native-modal-dropdown
// Definitions by: Carlos Li <https://github.com/echoulen>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import * as React from 'react';

import TabBar = RNTabBar.TabBar;
export = TabBar;

declare namespace RNTabBar {
  interface TabBarProps {
    displayTab?: number;
    children?: Node;
    tabBarContainerStyle?: any;
    tabBarTextStyle?: any;
    tabIndicatorStyle?: any;
    activeColor?: string;
    inactiveColor?: string;
  }

  class TabBar extends React.Component<TabBarProps> {
    static default: typeof TabBar;
  }
}
