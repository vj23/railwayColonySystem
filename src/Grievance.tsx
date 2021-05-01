import * as React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default class Grievance extends React.Component {
    render() {
        return (
            <div>
                Please enter your grievance
                <TextArea />
            </div>

        )
    }
}
