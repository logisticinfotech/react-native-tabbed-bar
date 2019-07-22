import React, { Component } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';

import PropTypes from 'prop-types';
import Posed from 'react-native-pose';

// Mics Constant
import { styles } from './TopTabBarStyle';
import Constants from './Constants';

let TabIndicator;
const tabJson = {};

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  componentDidMount = () => {};

  // Mics Method
  setTabRef = element => {
    this.tabList = element;
  };

  setTabScreenRef = element => {
    this.tabListScreen = element;
  };

  handleTabScroll = event => {
    const ratio = event.nativeEvent.contentOffset.x / Constants.scrWidth;
    const index = Math.round(ratio);
    this.tabList.scrollToIndex({ animated: true, index, viewPosition: 1.0 });
  };

  handleScreenScroll = event => {
    const { activeTab } = this.state;
    const { changeIndex } = this.props;
    const ratio = event.nativeEvent.contentOffset.x / Constants.scrWidth;
    const index = Math.round(ratio);

    if (activeTab !== index) {
      changeIndex(index);
      this.setState({
        activeTab: index,
      });
      this.tabList.scrollToIndex({ animated: true, index, viewPosition: 1.0 });
    }
  };

  onPressTab = index => () => {
    this.tabListScreen.scrollToIndex({ animated: true, index });
  };

  changeTabIndex = isLeft => {
    const { activeTab } = this.state;
    const { children } = this.props;
    let index = activeTab;
    if (isLeft) {
      if (index !== 0) {
        index -= 1;
      }
    } else if (index !== children.length - 1) {
      index += 1;
    }
    this.setState({
      activeTab: index,
    });
    this.tabList.scrollToIndex({ animated: true, index, viewPosition: 1.0 });
    this.tabListScreen.scrollToIndex({ animated: true, index });
  };

  // Render Method

  keyExtractorTab = item => item.props.title;

  renderTab = ({ item, index }) => {
    const { activeTab } = this.state;
    const { displayTab, tabBarContainerStyle, tabBarTextStyle, activeColor, inactiveColor } = this.props;
    const displayTabInt = Math.floor(displayTab);
    const width = Constants.scrWidth / (displayTabInt > 4 ? 4 : displayTab);

    return (
      <TouchableOpacity
        style={[styles.tabContainer, tabBarContainerStyle, { width }]}
        activeOpacity={0.8}
        onPress={this.onPressTab(index)}>
        <Text
          style={[
            styles.tabText,
            tabBarTextStyle,
            {
              color: index === activeTab ? activeColor || 'red' : inactiveColor || 'gray',
            },
          ]}>
          {item.props.title}
        </Text>
      </TouchableOpacity>
    );
  };

  keyExtractorScreen = item => item.props.title;

  renderScreen = ({ item }) => {
    return <View style={styles.contentContainer}>{item}</View>;
  };

  render() {
    const { activeTab } = this.state;
    const { children, displayTab, tabIndicatorStyle, activeColor } = this.props;

    // tab Width
    const displayTabInt = Math.floor(displayTab);
    const width = Constants.scrWidth / (displayTabInt > 4 ? 4 : displayTab);
    if (!TabIndicator) {
      for (let index = 0; index < displayTab; index += 1) {
        tabJson[`tab${index}`] = { x: index * (Constants.scrWidth / displayTab) };
      }
      TabIndicator = Posed.View(tabJson);
    }

    return (
      <View style={styles.container}>
        <View style={styles.tabMainContainer}>
          <FlatList
            ref={this.setTabRef}
            data={children}
            extraData={this.state}
            keyExtractor={this.keyExtractorTab}
            renderItem={this.renderTab}
            horizontal
            scrollEnabled={false}
            bounces={false}
            showsHorizontalScrollIndicator={false}
          />
          <TabIndicator
            style={[
              styles.tabContainerActive,
              tabIndicatorStyle,
              {
                width,
                backgroundColor: activeColor || 'red',
              },
            ]}
            pose={`tab${activeTab}`}
          />
        </View>
        {/* Content */}
        <FlatList
          ref={this.setTabScreenRef}
          data={children}
          extraData={this.state}
          keyExtractor={this.keyExtractorScreen}
          renderItem={this.renderScreen}
          bounces={false}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleScreenScroll}
          maxToRenderPerBatch={1}
        />
      </View>
    );
  }
}

TabBar.propTypes = {
  displayTab: PropTypes.number,
  children: PropTypes.node.isRequired,
  tabBarContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
  tabBarTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
  tabIndicatorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number]),
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
};

TabBar.defaultProps = {
  displayTab: 3,
  tabBarContainerStyle: {},
  tabBarTextStyle: {},
  tabIndicatorStyle: {},
  activeColor: undefined,
  inactiveColor: undefined,
};

export default TabBar;
