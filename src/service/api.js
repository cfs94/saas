const host = 'https://sprog.makepolo.net'

export const LOGIN = `${host}/saas/weapp/login.php`
export const MK_LOGIN = `${host}/saas/login.php`
export const GET_CODE = `${host}/saas/get_code.php`

export const REGISTER = `${host}/saas/reg.php`
export const FORGET_PWD = `${host}/saas/forgot_passwd.php`
export const SET_NEW_PWD = `${host}/saas/set_new_passwd.php`
//服务超市
export const CPC_BUY = `${host}/saas/servuce_mall/cpc.php`
export const POINT_BUY = `${host}/saas/servuce_mall/purchase_score.php`
export const RE_BUY = `${host}/saas/servuce_mall/repay.php`
export const ORDER_LIST = `${host}/saas/servuce_mall/order_list.php`
export const BAIDU_BUY = `${host}/saas/servuce_mall/baidu_b2b.php`
export const BAIDU_CONSUME = `${host}/saas/servuce_mall/b2b_consume_stat.php`
export const BAIDU_CONSUME_DETAIL = `${host}/saas/servuce_mall/b2b_hit_detail.php`
export const CPC_CONSUME = `${host}/saas/servuce_mall/cpc_consume_stat.php`
export const POINT_CONSUME = `${host}/saas/servuce_mall/bussines_point.php`
//商机
export const BUSINESS_LIST = `${host}/saas/clue_list.php`
export const BUSINESS_ALREADY = `${host}/saas/matched_clue_list.php`
export const BUSINESS_MATCH = `${host}/saas/matche_clue.php`
// 用户相关
export const AGENT_LIST = `${host}/saas/my_user_list.php`
export const AGENT_DETAIL = `${host}/saas/my_user_one.php`
export const CREATE_USER = `${host}/saas/add_user.php`
export const CHECK_PHONE = `${host}/saas/check_mobile.php`
// 评论
export const EVALUATE_LIST = `${host}/saas/evaluate/evaluate.php`
export const EVALUATE_REPLY = `${host}/saas/evaluate/evaluate_reply.php`
export const EVALUATE_DELETE = `${host}/saas/evaluate/evaluate_del.php`
//企业宣传
export const ISSUE_ARTICAL = `${host}/saas/article/article_issue.php`
export const ARTICAL_LIST = `${host}/saas/article/article_list.php`
export const ARTICAL_DETAIL = `${host}/saas/article/article_one.php`
export const EDIT_ARTICAL = `${host}/saas/article/article_update.php`
export const DEL_ARTICAL = `${host}/saas/article/article_del.php`
// 个人资料
export const PERSON_INFO = `${host}/saas/user/info.php`
export const MODIFY_PWD = `${host}/saas/user/change_password.php`
export const LOGOUT = `${host}/saas/logout.php`

export const GET_PROVINCE = `${host}/saas/get_province.php`
export const GET_CITY = `${host}/saas/get_city.php`
export const UP_IMG = `${host}/saas/upload_img.php`


//购买会员
export const BUY_MEMBER = `${host}/saas/vip/buy.php`
export const CHECK_MEMBER = `${host}/saas/vip/check_order.php`

//获取套餐价格
export const MEMBER_PRICE = `${host}/saas/vip/app.php`


//推广分销
export const PROMOTION_LIST = `${host}/saas/vip/my_spread.php` //推广接口
export const EXCHANGE_LIST =`${host}/saas/vip/my_exchange.php` //兑换列表
export const EXCHANGE_SUBMIT = `${host}/saas/vip/my_receive_add.php`//兑换提交
export const EXCHANGE_DETAIL = `${host}/saas/vip/my_exchange_detail.php`//兑换详情
export const EXCHANGE_INFO = `${host}/saas/vip/my_info.php` //兑换信息
export const CHECK_CODE = `${host}/saas/vip/get_check_code.php` //获取兑换码