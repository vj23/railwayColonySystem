import * as React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Card } from 'antd';
import { message } from 'antd';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const onFinish = function (values) {
    let self = this;
    let jsonBody = {}
    jsonBody['username'] = values.username
    jsonBody['password'] = values.password
    fetch('/loginAuthentication', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
    }).then((res) => {
        return res.json()
    }).then((json) => {
        console.log(json)
        localStorage.setItem("railwayloginincharge",JSON.stringify(json))
        if (json['role'] && json['role'] == 'admin') {
            self.props.history.push("/admin")
        }
        else if (json['role'] && json['role'] != 'admin') {
            self.props.history.push("/app")
        }
        else {
            message.error(json.error)
        }
    })

};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};
export default class Login extends React.Component {
    render() {
        return (
            <Card
                title="User Login"
                style={{ padding: "30px" }}
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish.bind(this)}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
              </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}