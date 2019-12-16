import { PureComponent } from 'react'
import {
  Select,
  Form,
  Input,
  Col,
  Button,
  DatePicker,
  Radio,
  Upload,
  Icon
} from 'antd'
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

/*
 * CrudUtil类，表示Crud通用操作类
 * @function 相关method说明
 *    @method { Function } dispatch - 封装dispatch的相关操作
 *      @param { Object } dispatch - 指定的dispatch，但是非必选项，如果不传该参数，方法内部默认取this.props.dispatch
 *      @param { String } type - dispatch的路径
 *      @param { Object } payload - 载荷
 *      @param { Function } callback - dispatch后的回调
 *      @return { Void } - 无返回
 *    @method { Function } getSelectOptionUI - 按照传递的键值对参数获取生成Select的JSX
 *      @param { Array } arr - 键值对参数，诸如：[{value: 'PEK', lable: '北京'},{value: 'HAK', lable: '海口'}]
 *    @method { Function } getFormItem - 统一Form生成普通表单项
 *    @method { Function } genSearchBtns - 统一条件搜索框的按钮操作
 *    @method { Function } getFormJSX - 生成Form的JSX代码
 *    @method { Function } getLabelByValue - 在键值对数组中根据value返回label
 *    @method { Function } uploadLimit - 统一限制上传文件大小
 *    @method { Function } importUtil - 通用post导出功能
 */
class CrudUtil extends PureComponent {
  constructor(props) {
    super(props)
    if (this.isLocalHost) {
      // console.log('创建CrudUtil',this)
    }
  }

  isLocalHost = window.location.hostname === 'localhost'

  componentWillMount() {
    if (this.isLocalHost) {
      // console.log('销毁CrudUtil',this)
    }
  }  

  // 统一缩写触发dispatch的代码
  dispatch({ dispatch, type, payload, callback }) {
    let _dispatch = null
    // 判断外部是否传递dispatch参数
    let isNotDispatch = typeof dispatch === 'undefined'
    if (isNotDispatch) {
      // 如果没有指定dispatch参数，直接使用Crud类
      _dispatch = this.props.dispatch
    } else {
      // 如果指定dispatch参数
      _dispatch = dispatch
    }
    isNotDispatch && this.setTableLoading()
    _dispatch({
      type: type,
      payload: payload
    }).then(() => {
      isNotDispatch && this.setTableLoaded()
      callback && callback()
    })
  }

  // 统一生成Select下拉框UI的代码
  getSelectOptionUI = arr => {
    let _arr = arr || []
    const selectDataUI = []
    _arr.forEach(ele => {
      selectDataUI.push(
        <Option value={ele.value} key={ele.value}>
          {ele.label}
        </Option>
      )
    })
    return selectDataUI
  }

  // 统一表格布局
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 }
    }
  }

  // 统一表格布局 -- 特殊处理inputSplit
  formItemLayout4InputSplit = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 }
    }
  }

  // 统一表格布局 -- 特殊处理RichText
  formItemLayout4RichText = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 21 }
    }
  }

  // 统一Form生成普通表单项
  getFormItem = (ele, getFieldDecorator, colSpan = 6, formItemNum) => {
    let type = ele.type
    let {
      label,
      field,
      getFieldDecoratorOpt,
      itemOpt,
      events,
      style,
      labelSplit,
      fieldSplit,
      getFieldDecoratorOptSplit,
      itemOptSplit,
      eventsSplit
    } = ele

    // 特殊处理
    style = style || {}

    if (type === 'input') {
      let _placeholder = ele.placeholder || `请输入${label}`
      return (
        <Col span={ele.colSpan || colSpan} key={field} style={{ ...style }}>
          <Form.Item label={label} {...ele.formItemLayout}>
            {getFieldDecorator(field, {
              ...getFieldDecoratorOpt
            })(<Input placeholder={_placeholder} {...events} {...itemOpt} />)}
          </Form.Item>
        </Col>
      )
    }
    if (type === 'inputSplit') {
      return (
        <Col
          span={ele.colSpan || colSpan}
          key={field}
          style={{ ...(style || {}) }}
        >
          <Col span={11}>
            <Form.Item label={label} {...ele.formItemLayout}>
              {getFieldDecorator(field, {
                ...getFieldDecoratorOpt
              })(
                <Input
                  placeholder={ele.placeholder || `请输入${label}`}
                  {...events}
                  {...itemOpt}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={2} style={{ textAlign: 'center' }}>
            <Form.Item>/</Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label={labelSplit} {...ele.formItemLayoutSplit}>
              {getFieldDecorator(fieldSplit, {
                ...getFieldDecoratorOptSplit
              })(
                <Input
                  placeholder={ele.placeholderSplit || `请输入${labelSplit}`}
                  {...eventsSplit}
                  {...itemOptSplit}
                />
              )}
            </Form.Item>
          </Col>
        </Col>
      )
    }
    if (type === 'textArea') {
      let _placeholder = ele.placeholder || `请输入${label}`
      return (
        <Col span={ele.colSpan || colSpan} key={field} style={{ ...style }}>
          <Form.Item label={label} {...ele.formItemLayout}>
            {getFieldDecorator(field, {
              ...getFieldDecoratorOpt
            })(
              <TextArea placeholder={_placeholder} {...events} {...itemOpt} />
            )}
          </Form.Item>
        </Col>
      )
    }
    if (type === 'select') {
      return (
        <Col span={ele.colSpan || colSpan} key={field} style={{ ...style }}>
          <Form.Item label={label} {...ele.formItemLayout}>
            {getFieldDecorator(field, {
              ...getFieldDecoratorOpt
            })(
              <Select
                {...events}
                {...itemOpt}
                placeholder={ele.placeholder || `请选择${label}`}
              >
                {this.getSelectOptionUI(ele.data)}
              </Select>
            )}
          </Form.Item>
        </Col>
      )
    }
    if (type === 'rangePicker') {
      return (
        <Col span={ele.colSpan || colSpan} key={field} style={{ ...style }}>
          <Form.Item label={label} {...ele.formItemLayout}>
            {getFieldDecorator(field, {
              ...getFieldDecoratorOpt
            })(
              <RangePicker
                style={{ width: '100%' }}
                {...events}
                {...itemOpt}
              ></RangePicker>
            )}
          </Form.Item>
        </Col>
      )
    }
    if (type === 'datePicker') {
      return (
        <Col span={ele.colSpan || colSpan} key={field} style={{ ...style }}>
          <Form.Item label={label} {...ele.formItemLayout}>
            {getFieldDecorator(field, {
              ...getFieldDecoratorOpt
            })(
              <DatePicker
                {...events}
                style={{ width: '100%' }}
                {...itemOpt}
              ></DatePicker>
            )}
          </Form.Item>
        </Col>
      )
    }
    if (type === 'radio') {
      let radios = ele.data.map(e => {
        return (
          <Radio value={e.value} key={e.value}>
            {e.label}
          </Radio>
        )
      })

      return (
        <Col span={ele.colSpan || colSpan} key={field} style={{ ...style }}>
          <Form.Item label={label} {...ele.formItemLayout}>
            {getFieldDecorator(field, {
              ...getFieldDecoratorOpt
            })(
              <Radio.Group {...events} {...itemOpt}>
                {radios}
              </Radio.Group>
            )}
          </Form.Item>
        </Col>
      )
    }
    if (type === 'upload') {
      return (
        <Col span={ele.colSpan || colSpan} key={field} style={{ ...style }}>
          <Form.Item label={label} {...ele.formItemLayout}>
            {getFieldDecorator(field, {
              ...getFieldDecoratorOpt
            })(
              <Upload
                name={ele.field}
                action={ele.action}
                listType="picture"
                {...events}
                {...itemOpt}
              >
                <Button>
                  <Icon type="upload" /> {ele.uploadText || '点击上传'}
                </Button>
                {ele.uploadTextEx}
              </Upload>
            )}
          </Form.Item>
        </Col>
      )
    }
    // if (type === 'richText') {
    //   return (
    //     <Col span={ele.colSpan || colSpan} key={field} style={{ ...style }}>
    //       <Form.Item label={label} {...this.formItemLayout4RichText}>
    //         {getFieldDecorator(field, {
    //           ...getFieldDecoratorOpt
    //         })(<RichText {...events} {...itemOpt}></RichText>)}
    //       </Form.Item>
    //     </Col>
    //   )
    // }
    // if (type === 'dynamicTransfer') {
    //   return (
    //     <Col span={ele.colSpan || colSpan} key={field} style={{ ...style }}>
    //       <Form.Item label={label} {...ele.formItemLayout}>
    //         {getFieldDecorator(field, {
    //           ...getFieldDecoratorOpt
    //         })(
    //           <DynamicTransfer
    //             data={ele.data || []}
    //             {...events}
    //             {...itemOpt}
    //           ></DynamicTransfer>
    //         )}
    //       </Form.Item>
    //     </Col>
    //   )
    // }
    if (type === 'button') {
      return (
        <Col span={ele.colSpan || colSpan} key={field} style={{ ...style }}>
          <Button {...events} {...itemOpt}>
            {ele.label}
          </Button>
        </Col>
      )
    }
  }

  // 统一条件搜索框的按钮操作
  genSearchBtns = (btns, opt = {}) => {
    if (!btns) {
      return
    }
    let _inner = () => {
      let btnsJsx = []
      btns.forEach(ele => {
        btnsJsx.push(
          <Button
            onClick={ele.onClick}
            type={ele.type || 'primary'}
            style={{ marginRight: '10px' }}
            key={ele.key}
            {...ele.opt}
          >
            {ele.name}
          </Button>
        )
      })
      return btnsJsx
    }

    return (
      <Col
        span={opt.span || 24}
        style={opt.style || {
          height: '40px',
          lineHeight: '40px',
          textAlign: 'center',
          marginTop: '20px'
        }}
        key="searchBtn"
      >
        {_inner()}
      </Col>
    )
  }

  // 生成Form的JSX代码
  getFormJSX = ({ getFieldDecorator, formItems, btns, colSpan }) => {
    let items = () => {
      let _items = []
      formItems.forEach(ele => {
        _items.push(
          this.getFormItem(ele, getFieldDecorator, colSpan, formItems.length)
        )
      })
      return _items
    }
    let searchBtn = (opt) => {
      return this.genSearchBtns(btns, opt)
    }
    let result = (
      <Form {...this.formItemLayout}>
        {items()}
        {searchBtn()}
      </Form>
    )
    return result
  }

  // 在键值对数组中根据value返回label
  getLabelByValue = (kvArrs, value) => {
    let f = kvArrs.find(ele => {
      return ele.value === value
    })
    if (f) {
      return f.label
    } else {
      return '--'
    }
  }

  // 统一限制上传文件大小
  uploadLimit = (() => {
    const s = 5
    const size = (size, limit = s) => {
      return size / 1000 / 1000 > limit
    }
    const text = `${s}M`
    return {
      size,
      text
    }
  })()

  // 通用post导出功能
  importUtil = ({ action, params }) => {
    var form = document.createElement('form')
    form.style.display = 'none'
    form.action = action
    form.method = 'post'
    document.body.appendChild(form)
    for (var key in params) {
      var input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = params[key]
      form.appendChild(input)
    }

    form.submit()
    form.remove()
  }
}

export default CrudUtil
