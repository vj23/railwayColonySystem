import * as React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Card } from 'antd';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

import WorkUpdate from './WorkUpdate';
import Grievance from './Grievance';

export default class App extends React.Component<any, any>{
  state = {
    selectedKey: "workupdate"
  }
  changeHandler(event) {
    this.setState({
      selectedKey: event.key
    })

  }
  render() {
    return (
      <Card>
        <Tabs defaultActiveKey="workupdate" onChange={this.changeHandler.bind(this)}>
          <TabPane tab="Work Update" key="workupdate">
            <WorkUpdate />
          </TabPane>
          <TabPane tab="Grievance" key="grievance">
            <Grievance />
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}