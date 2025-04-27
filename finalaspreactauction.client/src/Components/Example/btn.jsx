import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
const Searching = () => {
    return(
    <Flex gap="small" vertical>
        <Flex wrap gap="small">
            
            <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
            <Button icon={<SearchOutlined />}>Search</Button>
        </Flex>
        <Flex wrap gap="small">
            <Button icon={<SearchOutlined />} href="https://www.google.com" target="_blank" />
        </Flex>
    </Flex>)
}

export default Searching;