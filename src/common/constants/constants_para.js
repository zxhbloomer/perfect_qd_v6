/** 类型 */
/** 查看类型 */
const MODEL_VIEW = 'model_view'
/** 可写类型 */
const MODEL_EDIT = 'model_edit'

/** 弹出框窗体类型 */
/** 查看 */
const STATUS_VIEW = 'view'
/** 更新 */
const STATUS_UPDATE = 'update'
/** 插入 */
const STATUS_INSERT = 'insert'
/** 插入 */
const STATUS_COPY_INSERT = 'copyInsert'
/** 弹出框标题 */
const STATUS_TEXT_MAP = {
  view: '查看',
  update: '修改',
  insert: '新增',
  copyInsert: '复制新增'
}
/** 翻页条件 */
const PAGE_CONDITION = {
  current: 1,
  size: 20,
  sort: '-u_time' // 排序
}
/** 分页控件的json */
const PAGE_JSON = {
  current: 1,
  size: 20,
  total: 0
}
/** 分页控件的json */
const SORT_PARA = ['ascending', 'descending']

/** 设置弹窗：点击窗口外部可以关闭 */
const DIALOG_CLOSE_BY_CLICK = false
/** 设置弹窗：点击esc按钮可以关闭 */
const DIALOG_CLOSE_BY_ESC = false
/** 设置弹窗：显示关闭按钮X */
const DIALOG_SHOW_CLOSE = false

export default {
  /** 查看类型 */
  MODEL_VIEW,
  /** 可写类型 */
  MODEL_EDIT,

  /** 弹出框窗体类型 */
  /** 查看 */
  STATUS_VIEW,
  /** 更新 */
  STATUS_UPDATE,
  /** 插入 */
  STATUS_INSERT,
  /** 插入 */
  STATUS_COPY_INSERT,
  /** 弹出框标题 */
  STATUS_TEXT_MAP,
  /** 设置弹窗：点击窗口外部可以关闭 */
  DIALOG_CLOSE_BY_CLICK,
  /** 设置弹窗：点击esc按钮可以关闭 */
  DIALOG_CLOSE_BY_ESC,
  /** 设置弹窗：显示关闭按钮X */
  DIALOG_SHOW_CLOSE,

  /** 翻页条件 */
  PAGE_CONDITION,
  /** 分页控件的json */
  PAGE_JSON,
  /** 分页控件的json */
  SORT_PARA
}
