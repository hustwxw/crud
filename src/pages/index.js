import React from 'react';
import { Component } from 'react';
import { connect } from 'dva'
import { Button } from 'antd'
class Test extends Component{
  render () {
    return (
      <Button>Test</Button>
    )
  }
}

export default connect(ele => {
  return {
    ...ele
  }
})(Test)
