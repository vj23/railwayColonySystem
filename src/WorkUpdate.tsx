import * as React from 'react';
import { Select } from 'antd';
import * as moment from 'moment'
import { Form, Input, Button, Checkbox } from 'antd';
import GangInchargeJson from './gangInchargeJson';
const { Option } = Select;

const { TextArea } = Input;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const onFinish = function (values) {
    console.log('Success:', values);
    fetch('/updateWork', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
    }).then((response) => {

    })
};
const onSelectHanlder = function (event) {
    this.setState({
        'gang': event
    })
}
const taskHandler = function (id, event) {
    let obj = {}
    obj[id] = event.target.value
    this.setState({
        ...obj
    })
}
export default class WorkUpdate extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            compliance: "",
            materialreq: "",
            incharge: JSON.parse(localStorage.getItem("railwayloginincharge"))["incharge"],
            unit: "BXM",
            datestamp: moment(new Date()).format('MM/DD/YYYY'),
            other: "",
            gang: ""
        }
    }

    render() {
        let inchargeJson = JSON.parse(localStorage.getItem("railwayloginincharge"))

        let optionList = inchargeJson.gangs.map((ele) => <Option value={ele}>{ele}</Option>)
        return (
            <div style={{ display: "flex" }}>
                <div>
                    <div>
                        Select a Gang
                    </div>
                    <div>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select group"
                            onSelect={onSelectHanlder.bind(this)}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {optionList}
                        </Select>
                    </div>
                </div>
                <div>

                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish.bind(this)}

                    >
                        {this.state['gang'].includes("DTM") ?
                            <React.Fragment>
                                <Form.Item
                                    label="Compliance"
                                    name="compliance"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <TextArea onChange={taskHandler.bind(this, "compliance")} />
                                </Form.Item>

                                <Form.Item
                                    label="Material Requirement"
                                    name="materialreq"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <TextArea onChange={taskHandler.bind(this, "materialreq")} />
                                </Form.Item>
                            </React.Fragment> :
                            <Form.Item
                                label="Update Work"
                                name="update"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <TextArea onChange={taskHandler.bind(this, "other")} />
                            </Form.Item>

                        }

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>


                </div>
            </div>
        )
    }
}