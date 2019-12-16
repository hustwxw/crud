/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Modal, Popconfirm, message, Pagination, Table, Row, Col, Icon } from 'antd'
import style from '../style/crud.css'
import CrudUtil from './crudUtil'

/*
 * Crud类，表示增删改查的基础页面功能构建类
 * @constructor 相关state变量说明
 *    @param { boolean } tableLoading - state变量，用于表示表格加载过程的spin
 *    @param { Array } selectedRowKeys - state变量，用于储存有checkbox表格多选情况下的已选行id
 * @function 相关method说明
 *    @method { Function } onRefreshTable - 按照既定的(一般是model中)page和pageSize刷新表格，一般在增删改查后的回调中用得到
 *      @param { String } MODELNAMESPACE - model的名字，通过model名字入参决定取哪一个model里面的数据
 *      @return { Void } - 无返回
 *    @method { Function } onAfterAdd - 新增操作以后的统一回调函数
 *      @param { String } MODELNAMESPACE - model的名字
 *      @param { Function } loaded - 弹框按钮状态变为已加载的函数
 *      @param { Function } close - 关闭弹框的函数
 *      @return { Void } - 无返回
 *    @method { Function } onAfterUpdate - 修改操作以后的统一回调函数
 *      @param { String } MODELNAMESPACE - model的名字
 *      @param { Function } loaded - 弹框按钮状态变为已加载的函数
 *      @param { Function } close - 关闭弹框的函数
 *      @return { Void } - 无返回
 *    @method { Function } onAfterDele - 删除操作以后的统一回调函数
 *      @param { String } MODELNAMESPACE - model的名字
 *      @return { Void } - 无返回
 *    @method { Function } compareZh - 中文排序
 *      @param { String } a - 用于比较的对象1
 *      @param { String } b - 用于比较的对象2
 *      @param { String | Function } key - 如果是string那就是用于比较对象的某个字段，如果是function那就是自定义操作比较对象的规则方法
 *      @return { Void } - 无返回
 *    @method { Function } compareNo - 数字排序
 *      @param { String } a - 用于比较的对象1
 *      @param { String } b - 用于比较的对象2
 *      @param { String | Function } key - 如果是string那就是用于比较对象的某个字段，如果是function那就是自定义操作比较对象的规则方法
 *      @return { Void } - 无返回
 *    @method { Function } componentWillUnmount - Crud对象销毁执行回调
 *      @return { Void } - 无返回
 *    @method { Function } debugger - 调试方法
 *      @return { Void } - 无返回
 *    @method { Function } onModal - 用于子组件中获取父组件中的model数据函数
 *      @param { String } nameSpace - model的名字
 *      @return { Object } - 返回父组件中指定model名字的model对象
 *    @method { Function } onDispatch - 用于子组件中获取父组件的dispatch函数
 *      @return { Object } - 返回父组件中的dispatch对象
 *    @method { Function } onQuery - 查询函数
 *      @return { Void } - 无返回
 *    @method { Function } onReset - 重置函数
 *      @return { Void } - 无返回
 *    @method { Function } onAfterReset - 重置后钩子函数，在执行onReset后执行的钩子函数
 *      @return { Void } - 无返回
 *    @method { Function } onDelete - 删除函数
 *      @param { String } text - 表格行字段的值
 *      @param { Object } record - 表格行对象
 *      @param { Number } index - 表格行的索引值
 *      @return { Void } - 无返回
 *    @method { Function } onDeleteHandlerOk - 确定删除的回调函数，用于在点击确定删除对话框以后执行的回调函数
 *      @param { String } text - 表格行字段的值
 *      @param { Object } record - 表格行对象
 *      @param { Number } index - 表格行的索引值
 *      @return { Void } - 无返回
 *    @method { Function } onBatchDelete - 通用批量删除提示框
 *      @return { Void } - 无返回
 *    @method { Function } onBatchDeleteHandlerOk - 在点击确定通用批量删除提示框后的回调函数
 *      @param { Array } selectedRowKeys - 回传的已选择表格行的id
 *      @return { Void } - 无返回
 *    @method { Function } onUpdateComponentRef - 引用update弹框实例
 *      @param { Object } ref - update子组件
 *      @return { Void } - 无返回
 *    @method { Function } onOpenUpdate - 打开update弹框实例
 *      @param { String } text - 表格行字段的值
 *      @param { Object } record - 表格行对象
 *      @param { Number } index - 表格行的索引值
 *      @return { Void } - 无返回
 *    @method { Function } onAddComponentRef - 引用add弹框实例
 *      @param { Object } ref - add子组件
 *      @return { Void } - 无返回
 *    @method { Function } onOpenAdd - 打开add弹框实例
 *      @return { Void } - 无返回
 *    @method { Function } onPageChange - 分页页面改变事件
 *      @param { Number } page - 当前页数
 *      @param { Number } pageSize - 每页大小
 *      @return { Void } - 无返回
 *    @method { Function } onSizeChange - 分页页面改变事件
 *      @param { Number } page - 当前页数
 *      @param { Number } pageSize - 每页大小
 *      @return { Void } - 无返回
 *    @method { Function } setTableLoading - 设置tableLoading为true，表示表格加载中
 *      @return { Void } - 无返回
 *    @method { Function } setTableLoaded - 设置tableLoading为false，表示表格加载完毕
 *      @return { Void } - 无返回
 *    @method { Function } clearSelectedRowKeys - 清空勾选项目
 *      @return { Void } - 无返回
 *    @method { Function } getTableIndexColumn - 自增表格序号列生成函数
 *      @param { String } MODELNAMESPACE - model的名字
 *      @param { Object } opt - 可选的扩展表格列的参数，可参考Ant Design Table表格列的参数
 *                              opt支持非Ant Design Table表格列的参数transform
 *                              如果需要自定义返回的序号，可以用opt.transform
 *                              { Function } transform - transform会回传入参已经算好的序号，该函数返回自定义字符串即可
 *      @return { Void } - 无返回
 *    @method { Function } getPaginationJSX - 统一生成Pagination JSX代码的函数
 *      @param { Function } onPageChange - 分页的页数改变回调函数，默认绑定Crud类中的onPageChange
 *      @param { Function } onSizeChange - 分页的页数大小改变回调函数，默认绑定Crud类中的onSizeChange
 *      @param { Number } page - 表示分页页码的变量
 *      @param { Number } pageSize - 表示分页一页大小的变量
 *      @param { Number } totalCount - 表示条目总数的变量
 *      @param { Array } pageSizeOptions - 可选的每页容量大小，默认是['10', '20', '30', '50']
 *      @param { Array } exportOpt - 导出参数数组[{type, action, params}, ...]
 *        @param { String } type - 导出类型，仅支持pdf、excel
 *        @param { String } action - 导出的接口地址
 *        @param { Object } params - 导出的接口参数
 *      @return { JSX } - Pagination的JSX代码
 *    @method { Function } getTableJSX - 统一生成表格 JSX代码的函数
 *      @param { Array } tableData - 表格数据源数组，参考Ant Design Table
 *      @param { Array } tableColumns - 表格列数组，参考Ant Design Table
 *      @param { Object } opt - 可选的表格参数，参考Ant Design Table
 *         opt中除了有Ant Design Table的参数之外，具有如下自定义参数
 *            @param { Function } forbiddenOnRowClick - 当这个参数存在且返回true的时候，禁止行选中的同时自动勾选checkbox，回传当前行record数据作为参数
 *      @return { JSX } - Table的JSX代码
 *    @method { Function } onTableAction - 表格处理操作列函数
 *      @param { Object } model - model对象
 *      @param { Undefined | Array | Function } action - 相关参数
 *          1、如果是undefind，那么默认是update和delete操作
 *          2、如果是array，传递数组[{name, callback}, ...]
 *          3、如果是function，等同于自定义table column中的render函数
 *      @param { Object } opts - 可选的表格操作列函数，参考Ant Design Table
 *      @return { Void } - 无返回
 */
class Crud extends CrudUtil {
  constructor(props) {
    super(props)
    this.state = {
      tableLoading: false,
      selectedRowKeys: [],
      modalNames: []
    }
    if (this.isLocalhost) {
      console.log('创建Crud', this)
    }
  }

  setModalNames ({
    modalNamesParam = [],
    callback = () => {},
    force = false
  }) {
    let { modalNames } = this.state
    let isString = typeof modalNamesParam === 'string'
    if (isString) {
      if (force) {
        modalNames = [modalNamesParam]
      } else {
        if (modalNames.includes(modalNamesParam)) {
          throw new Error(`重复设置Modal - ${modalNamesParam}`)
        } else {
          modalNames.push(modalNamesParam)
        }
      }    
    } else {
      if (modalNamesParam.length === 0) {
        modalNames = []
      } else {
        let temp = []
        modalNamesParam.forEach(ele => {
          if (modalNames.includes(ele)) {
            temp.push(ele)
          }
        })
        if (force) {
          modalNames = [].concat(modalNamesParam)
        } else {
          if (temp.length > 1) {
            throw new Error(`重复设置Modal - ${temp.join(',')}`)
          } else {
            modalNames = modalNames.concat(modalNamesParam)
          } 
        }        
      }     
    }
    this.setState({
      modalNames
    }, callback)
  }

  getModalNames (index) {
    if (typeof index === 'undefined') {
      return this.state.modalNames
    } else {
      return this.state.modalNames[index]
    }
  }

  // 按照既定的page和pageSize刷新表格，一般在增删改查后的回调中用得到
  onRefreshTable(MODELNAMESPACE) {
    const { page, pageSize, totalCount } = this.props[MODELNAMESPACE]
    let p = page
    if ((page - 1) * pageSize >= totalCount - 1) {
      p--
    }
    this.onQuery({
      page: p === 0 ? 1 : p,
      pageSize
    })
  }

  // 新增操作以后的统一回调函数
  onAfterAdd(MODELNAMESPACE, loaded, close) {
    loaded && loaded()
    setTimeout(() => {
      const { code, infoCode } = this.props[MODELNAMESPACE]
      if (code === 200 && !infoCode) {
        close && close()
        this.onRefreshTable(MODELNAMESPACE)
      }
    }, 200)
  }

  // 修改操作以后的统一回调函数
  onAfterUpdate(MODELNAMESPACE, loaded, close) {
    loaded && loaded()
    setTimeout(() => {
      const { code, infoCode } = this.props[MODELNAMESPACE]
      if (code === 200 && !infoCode) {
        close && close()
        this.onRefreshTable(MODELNAMESPACE)
      }
    }, 200)
  }

  // 删除操作以后的统一回调函数
  onAfterDele(MODELNAMESPACE) {
    const { code, infoCode } = this.props[MODELNAMESPACE]
    if (code === 200 && !infoCode) {
      this.onRefreshTable(MODELNAMESPACE)
    }
  }

  // 中文排序
  compareZh(a, b, key) {
    if (typeof key === 'string') {
      return (a[key] || '').toString().localeCompare(b[key] || '', 'zh')
    }
    if (typeof key === 'function') {
      return (key(a) || '').toString().localeCompare(key(b) || '', 'zh')
    }
  }

  // 数字排序
  compareNo(a, b, key) {
    if (typeof key === 'string') {
      return a[key] - b[key]
    }
    if (typeof key === 'function') {
      return key(a) - key(b)
    }
  }

  componentWillUnmount() {
    if (window.location.hostname === 'localhost') {
      console.log('销毁Crud', this)
    }
    // 销毁时候重置一下Form
    this.props && this.props.form && this.props.form.resetFields()
    // 万金油解决某些情况下的问题，比如路由切换的时候会销毁对话框
    // Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return
    }
  }
  /*
    debugger专用方法
   */
  // 打印Modal Data的按钮
  _getPrintModalBtn(MODELNAMESPACE) {
    return (
      <div className={style.debugger}>
        <div>Debugger</div>
        <Button
          onClick={this._onPrintModal.bind(this, MODELNAMESPACE)}
          type="primary"
          style={{ marginBottom: '5px' }}
        >
          PrintModal
        </Button>
        <Button
          onClick={this._onPrintCookie.bind(this)}
          type="primary"
          style={{ marginBottom: '5px' }}
        >
          PrintCookie
        </Button>
        <Button onClick={this._onPrintLocalStorage.bind(this)} type="primary">
          PrintLocalStorage
        </Button>
      </div>
    )
  }
  // 打印Modal Data的方法
  _onPrintModal(MODELNAMESPACE) {
    console.log(
      '%c【Print Modal Data】',
      'background-color: gray;color: whitesmoke;'
    )
    console.log('--打印Object')
    console.log(this.props[MODELNAMESPACE])
    console.log('--打印Object序列化')
    console.log(JSON.stringify(this.props[MODELNAMESPACE]))
  }
  // 打印Cookie
  _onPrintCookie() {
    console.log(
      '%c【Print Cookie】',
      'background-color: gray;color: whitesmoke;'
    )
    console.log(document.cookie)
  }
  // 打印LS
  _onPrintLocalStorage() {
    console.log(
      '%c【Print LocalStorage】',
      'background-color: gray;color: whitesmoke;'
    )
    console.log(localStorage)
  }

  debugger(MODELNAMESPACE) {
    if (this.isLocalhost) {
      return this._getPrintModalBtn(MODELNAMESPACE)
    } else {
      return ''
    }
  }

  // 用于子组件中获取父组件中的model数据函数
  onModal(nameSpace) {
    return this.props[nameSpace]
  }

  // 用于子组件中获取父组件的dispatch函数
  onDispatch() {
    return this.props.dispatch
  }

  onQuery() {}

  onReset() {
    // 先重置
    this.props && this.props.form && this.props.form.resetFields()
    // 钩子函数
    this.onAfterReset && this.onAfterReset()
    // 等待重置完成，进行一个异步
    setTimeout(() => {
      // 后查询
      this.onQuery()
    }, 0)
  }

  // 删除事件
  onDelete(text, record, index) {
    Modal.confirm({
      title: '温馨提示',
      content: '你确定要删除吗？',
      okText: '确认',
      cancelText: '取消',
      onCancel: () => {
        message.info('取消删除')
      },
      onOk: () => {
        this.onDeleteHandlerOk &&
          this.onDeleteHandlerOk({
            text,
            record,
            index
          })
        !this.onDeleteHandlerOk && console.log('尚未实现onDeleteHandlerOk')
      }
    })
  }

  // 通用批量删除提示框
  onBatchDelete() {
    const { selectedRowKeys } = this.state
    Modal.confirm({
      title: '温馨提示',
      content: '你确定要批量删除吗？',
      okText: '确认',
      cancelText: '取消',
      onCancel: () => {
        message.info('取消删除')
      },
      onOk: () => {
        this.onBatchDeleteHandlerOk &&
          this.onBatchDeleteHandlerOk(selectedRowKeys)
        !this.onBatchDeleteHandlerOk &&
          console.log('尚未实现onBatchDeleteHandlerOk')
      }
    })
  }

  // 引用update弹框实例
  onUpdateComponentRef = ref => {
    this.updateComponentChild = ref
  }

  // 打开update弹框实例
  onOpenUpdate(text, record, index) {
    this.updateComponentChild.open({ text, record, index })
  }

  // 引用Add弹框实例
  onAddComponentRef = ref => {
    this.addComponentChild = ref
  }

  // 打开Add弹框实例
  onOpenAdd() {
    this.addComponentChild.open()
  }

  // 页数改变事件
  onPageChange(page, pageSize) {
    this.onQuery({
      page,
      pageSize
    })
  }

  // 每页大小改变事件
  onSizeChange(page, pageSize) {
    this.onQuery({
      page: 1,
      pageSize
    })
  }

  // 表格加载中
  setTableLoading() {
    this.setState({
      tableLoading: true
    })
  }

  // 表格加载完毕
  setTableLoaded() {
    this.setState({
      tableLoading: false
    })
  }

  // 清空勾选项目
  clearSelectedRowKeys() {
    this.setState({
      selectedRowKeys: []
    })
  }

  // 自增序号表格列生成函数
  getTableIndexColumn(MODELNAMESPACE, opt = {}) {
    return Object.assign(
      {
        title: '序号',
        key: 'index',
        render: (text, record, index) => {
          const { page, pageSize } = this.props[MODELNAMESPACE]
          const _index = index + 1 + (page - 1) * pageSize
          return (opt.transform && opt.transform(_index)) || _index
        }
      },
      opt
    )
  }

  // 统一生成Pagination的代码
  getPaginationJSX({
    onPageChange = this.onPageChange.bind(this), // 页码改变回调
    onSizeChange = this.onSizeChange.bind(this), // 每页容量大小改变回调
    page, // 当前页码
    totalCount, // 数据总条数
    pageSize, // 每页容量大小
    pageSizeOptions = ['10', '20', '30', '50'], // 可选的每页容量大小
    exportOpt = [] // 导出配置参数
    // exportOpt例子
    /*
     * [{type: 'pdf', action: 'url', params: {}}, {type: 'excel', action: 'url', params: {}}]
     */
  }) {
    if (totalCount === 0) {
      return null
    }
    // 处理导出
    const _export = opt => {
      Modal.confirm({
        title: '温馨提示',
        content: `你确定要导出${opt.type}吗？`,
        okText: '确认',
        cancelText: '取消',
        onCancel: () => {
          message.info('取消导出')
        },
        onOk: () => {
          this.importUtil({
            ...opt
          })
        }
      })
    }

    // 导出csv
    const _exportCSV = ({ column = [], data = [] }) => {
      const _column =
        column
          .map(ele => {
            return ele.title
          })
          .join(',') + '\n'
      const _data = data
        .map(ele => {
          return Object.values(ele).join(',')
        })
        .join('\n')
      // 创建隐藏的可下载链接
      var eleLink = document.createElement('a')
      eleLink.download = 'data.csv'
      eleLink.style.display = 'none'
      // 字符内容转变成blob地址
      var blob = new Blob([_column + _data])
      eleLink.href = URL.createObjectURL(blob)
      // 触发点击
      document.body.appendChild(eleLink)
      eleLink.click()
      // 然后移除
      document.body.removeChild(eleLink)
    }

    const _exportOpt = exportOpt.filter(ele => {
      return ['pdf', 'excel', 'csv'].indexOf(ele.type) > -1
    })
    let exportJsx = []
    _exportOpt.forEach((ele, index) => {
      exportJsx.push(
        <Icon
          key={`${ele.type}`}
          type={ele.type === 'csv' ? `file-text` : `file-${ele.type}`}
          style={{
            fontSize: '25px',
            marginRight: '10px',
            cursor: 'pointer'
          }}
          title={`导出${ele.type}`}
          onClick={
            ele.type === 'csv'
              ? _exportCSV.bind(this, {
                  ...ele
                })
              : _export.bind(this, {
                  ...ele
                })
          }
        />
      )
    })

    return (
      <Row style={{ textAlign: 'right', width: '100%' }}>
        <Col span={24}>
          {/* 分页组件 */}
          <Pagination
            showQuickJumper
            showSizeChanger
            current={page}
            total={totalCount || 0}
            pageSize={pageSize || 10}
            onChange={onPageChange}
            onShowSizeChange={onSizeChange}
            pageSizeOptions={pageSizeOptions}
            showTotal={total => `总共 ${total} 条`}
            style={{
              userSelect: 'none',
              display: 'inline-block',
              verticalAlign: 'middle'
            }}
          />
          {/* 导出图标 */}
          {exportJsx.length !== 0 ? (
            <div
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginLeft: '20px',
                color: '#e20b00'
              }}
            >
              {exportJsx}
            </div>
          ) : (
            ''
          )}
        </Col>
      </Row>
    )
  }

  // 统一生成表格JSX
  getTableJSX({ tableData, tableColumns, opt = {} }) {
    // 如果存在checkbox可选择的table，那么就加上点击行任意处可以勾选的效果
    if (opt.rowSelection && !opt.noSelectRow) {
      // 统一处理行事件
      opt.onRow = record => ({
        onClick: e => {
          if (opt.forbiddenOnRowClick && opt.forbiddenOnRowClick(record)) {
            return false
          }
          const tagName = e.target.tagName
          // 排除具有响应事件的一些标签
          if (['BUTTON', 'A'].findIndex(ele => ele === tagName) > -1) {
            return false
          }
          const selectedRowKeys = [...this.state.selectedRowKeys]
          if (selectedRowKeys.indexOf(record.id) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
          } else {
            selectedRowKeys.push(record.id)
          }
          this.setState({ selectedRowKeys })
        }
      })
    }
    return (
      <Table
        bordered
        dataSource={tableData}
        columns={tableColumns}
        pagination={false}
        rowKey={ele => ele.id || Math.random()}
        // loading={this.state.tableLoading || false}
        loading={{ spinning: this.state.tableLoading, tip: '数据加载中...' }}
        {...opt}
      />
    )
  }

  // 处理表格操作列
  /*
    action
    1、自定义render函数
    2、传递数组[{name, callback}, ...],
    3、默认（只有修改和删除）
  */
  onTableAction(model, action, opts) {
    const _action = action
    // 查找一下有没有值为action的key
    const tableColumns = model.tableColumns
    let temp = tableColumns.findIndex(ele => {
      return ele.key === 'action'
    })
    // 有就先删掉，然后重新加载action操作列
    // 防止挂在的对话框子组件open的时候报如下错误
    // Can't perform a React state update on an unmounted component.
    // This is a no-op, but it indicates a memory leak in your application.
    // To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method
    // const tableColumns = this.props.tableModel.tableColumns
    if (temp !== -1) {
      model.tableColumns.splice(temp, 1)
    }

    let _render = (text, record, index) => {
      const updateBtn = (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Button
          type="primary"
          // eslint-disable-next-line no-script-url
          href="javascript:void(0)"
          onClick={this.onOpenUpdate.bind(this, text, record, index)}
          key="update"
        >
          修改
        </Button>
      )
      const deleteBtn = (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Popconfirm
          title="确定要删除吗?"
          onConfirm={this.onDeleteHandlerOk.bind(this, text, record, index)}
        >
          <a
            // eslint-disable-next-line no-script-url
            href="javascript:void(0)"            
            key="delete"
          >
            删除
          </a>
        </Popconfirm>        
      )
      if (typeof _action === 'undefined') {
        return (
          <span className={'act-bar'}>
            {updateBtn}
            {deleteBtn}
          </span>
        )
      } else if (Object.prototype.toString.call(_action) === '[object Array]') {
        let jsxes = _action.map(ele => {
          let jsx
          ele.callback = ele.callback || ((text, record, index) => {})
          if (ele.name === 'update') {
            ele.name = '修改'
            ele.callback = this.onOpenUpdate
          }          
          if (ele.name === 'delete') {
            ele.name = '删除'
            ele.callback = this.onDelete
          }
          jsx = (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              // eslint-disable-next-line no-script-url
              href="javascript:void(0)"
              key={ele.name}
              onClick={ele.callback.bind(this, text, record, index)}
            >
              {ele.name}
            </a>
          )
          if (ele.getLink) {
            jsx = (
              // eslint-disable-next-line react/jsx-no-target-blank
              <a href={ele.getLink(text, record, index)} key={ele.name} target="_blank">
                {ele.name}
              </a>
            )
          }
          if (ele.name === '删除') {
            jsx = (
              <Popconfirm
                title="确定要删除吗?"
                key="delete"
                onConfirm={this.onDeleteHandlerOk.bind(this, {text, record, index})}
              >
                <a
                  // eslint-disable-next-line no-script-url
                  href="javascript:void(0)"                              
                >
                  删除
                </a>
              </Popconfirm>
            )
          }      
          return jsx
        })
        return <span className={'act-bar'}>{jsxes}</span>
      }
    }

    if (typeof _action === 'function') {
      _render = _action
    }

    // 如果没有的话才插入action
    const tableAction = {
      title: '操作',
      key: 'action',
      render: _render
    }
    if (opts) {
      for (var opt in opts) {
        tableAction[opt] = opts[opt]
      }
    }
    tableColumns.push(tableAction)
  }
}

export default Crud
