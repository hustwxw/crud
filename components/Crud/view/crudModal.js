import { PureComponent } from 'react'

/*
 * CrudModal类，表示对话框类
 * @constructor 相关state变量说明
 *    @param { boolean } isShowModal - state变量，用于表示是否显示对话框
 *    @param { boolean } confirmLoading - state变量，用于确定按钮的执行状态
 *    @param { Object } opt - state变量，可选参数
 *    @param { Object } data - state变量，存储额外传递给modal对话框的数据
 * @function 相关method说明
 *    @method { Function } componentDidMount - CrudModal挂载执行函数
 *      @return { Void } - 无返回
 *    @method { Function } componentWillUnmount - CrudModal销毁执行函数
 *      @return { Void } - 无返回
 *    @method { Function } open - 打开对话框函数
 *      @param { Object } data - 外部打开对话框时候传递的额外数据
 *      @return { Void } - 无返回
 *    @method { Function } onBeforeOpen - 打开对话框以后的钩子函数，子类可以写用于open之前调用的钩子函数
 *      @return { Void } - 无返回
 *    @method { Function } onAfterOpen - 打开对话框以后的钩子函数，子类可以写用于open之后调用的钩子函数
 *      @return { Void } - 无返回
 *    @method { Function } close - 关闭对话框函数
 *      @return { Void } - 无返回
 *    @method { Function } setWidth - 设置对话框宽度的函数
 *      @param { Number } width - 宽度
 *      @return { Void } - 无返回
 *    @method { Function } onOk - 对话框ok回调，可以重写
 *      @return { Void } - 无返回
 *    @method { Function } onCancel - 对话框Cancel回调，可以重写
 *      @return { Void } - 无返回
 *    @method { Function } loading - 确定按钮执行中状态
 *      @return { Void } - 无返回
 *    @method { Function } loaded - 确定按钮已执行状态
 *      @return { Void } - 无返回
 */
class CrudModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isShowModal: false,
      confirmLoading: false,
      opt: {
        width: '800px',
        maskClosable: false
      },
      data: {}
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    // 万金油解决某些情况下的问题，比如路由切换的时候会销毁对话框
    // Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return
    }
  }

  open(data) {
    // 如果有传递数据的话，一般是update对话框
    if (data) {
      this.props && this.props.form && this.props.form.resetFields()
    }
    this.onBeforeOpen && this.onBeforeOpen()
    this.setState({
      isShowModal: true,
      confirmLoading: false,
      data: data
    }, () => {
      this.onAfterOpen && this.onAfterOpen()
    })
  }

  close() {
    this.setState({
      isShowModal: false
    })
  }

  setWidth(width) {
    let opt = this.state.opt
    opt.width = width
    this.setState({
      opt
    })
  }

  onOk() {
    this.close()
  }

  onCancel() {
    this.close()
  }

  loading() {
    this.setState({
      confirmLoading: true
    })
  }

  loaded() {
    this.setState({
      confirmLoading: false
    })
  }
}

export default CrudModal
