import React, { PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
require('./Tabs.sass');

const viewNameToIndex = {
  history: 0,
  storyboarding: 1,
};
const indexToViewName = [
  'history',
  'storyboarding',
];

function handleTabSelector(onTabSelect) {
  return index => onTabSelect(indexToViewName[index]);
}

const HistoryContainer = ({
  onTabSelect,
  selectedTab,
  historyView,
  storyboardingView,
}) => (
  <Tabs
    onSelect={handleTabSelector(onTabSelect)}
    selectedIndex={viewNameToIndex[selectedTab]}
  >
    <TabList>
      <Tab>History</Tab>
      <Tab>Storyboards</Tab>
    </TabList>
    <TabPanel>
      {historyView}
    </TabPanel>
    <TabPanel>
      {storyboardingView}
    </TabPanel>
  </Tabs>
);

HistoryContainer.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  historyView: PropTypes.element.isRequired,
  storyboardingView: PropTypes.element.isRequired,
};

export default HistoryContainer;
