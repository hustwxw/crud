import { connect } from 'dva'
import { Row, Form } from 'antd'
import CrudStyle from "../../components/Crud/style/common.js";
import Crud from "../../components/Crud/view/crud.js";
const MODELNAMESPACE = 'TestModal'
class Test extends Crud{
  componentDidMount () {
    console.log(this.props[MODELNAMESPACE])    
  }

  onQuery () {
    const { getFieldsValue } = this.props.form
    console.log(getFieldsValue(['text', 'date']))
    this.setModalNames({
      modalNamesParam: ['TestModal', 'TestModal1'],
      callback: () => {
        this.setModalNames({
          modalNamesParam: 'asff',
          force: true,
          callback: () => {
            console.log(this.getModalNames())
          }
        })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Row>
        {/* search area */}
        <Row className={CrudStyle.rowClassName}>
          {
            this.getFormJSX({
              getFieldDecorator,
              formItems: [
                {
                  type: 'rangePicker',
                  label: '录入时间',
                  field: 'date'
                }
              ],
              btns: [
                {
                  name: '查询',
                  onClick: this.onQuery.bind(this),
                  key: 'query'
                }
              ]
            })
          }
        </Row>
        {/* table area */}
        <Row className={CrudStyle.rowClassName}>
        
        </Row>
      </Row>
    )
  }
}

const TestForm = Form.create({
  mapPropsToFields(props) {
    const { test, date } = props[MODELNAMESPACE]

    return {
      range: Form.createFormField({
        ...test
      }),
      date: Form.createFormField({
        ...date
      })
    }
  },
  onFieldsChange(props, fields) {
    props.dispatch({
      type: `${MODELNAMESPACE}/overrideState`,
      payload: {
        ...fields
      }
    })
  }
})(Test)

export default connect(ele => {
  return {
    ...ele
  }
})(TestForm)
