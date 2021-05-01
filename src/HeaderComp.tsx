import * as React from 'react';
import { Divider } from 'antd';
import { Row, Col } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Sider } = Layout;
export default class HeaderComp extends React.Component {
    render() {
        return (
            <Layout style={{padding:"20px",marginBottom:"20px"}}>
                
                    <Row>
                        <Col span={8}>Gang Management System <Divider type="vertical" /></Col>

                        
                    </Row>
               
            </Layout>
        )
    }
}