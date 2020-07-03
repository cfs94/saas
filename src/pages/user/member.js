import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import api from '@service/ask'
import { BUY_MEMBER, CHECK_MEMBER, MEMBER_PRICE } from '@service/api'
import bIcon from './assets/diamonicon.png'
import dIcon from './assets/blackicon.png'
import topIcon from './assets/membertop.png'
import noIcon from './assets/error.png'
import fIcon from './assets/freeIcon.png'
import fiveIcon from './assets/five.png'
import fourIcon from './assets/four.png'
import phoneIcon from './assets/dh.png'
import chatIcon from './assets/wx.png'
import './member.scss'


const typelist = [
    '产品发布权限',
    '移动营销管理工具',
    '全网搜索引擎优化',
    '全网搜索引擎权重增强特别链接',
    '联系方式全站推荐',
    '站内同行业产品搜索优先排名',
    '精准采购商机查看权限',
    '企业全网去广告',
    '20套店铺豪华模板',
    '产品一键刷新',
    '店铺星级标识',
    '采购商询盘及时通知',
    '首页位置产品推荐',
    '商铺、产品一键修复',
    '企业运营数据统计'
]
const freelist = [
    { i: '1条/年' },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon },
    { i: noIcon }
]

const diamonlist = [
    { s: '1500条/年', p: "￥1499/年" },
    { s: '全年服务', p: "￥1999/年" },
    { s: '全年服务', p: "￥5999/年" },
    { s: '300个', p: "￥2999/年" },
    { s: '排名前五', p: "￥2999/年" },
    { s: '排名前五', p: "￥2999/年" },
    { s: '30条/年', p: "￥899/年" },
    { s: '全年服务', p: "￥2999/年" },
    { s: '全年服务', p: "￥599/年" },
    { s: '1次/1天', p: "￥999/年" },
    { s: fourIcon, p: "￥2999/年" },
    { s: '6条/年', p: "￥999/年" },
    { s: noIcon },
    { s: noIcon },
    { s: noIcon },
]

const blacklist = [
    { s: '3000条/年', p: '￥2999/年' },
    { s: '全年服务', p: '￥1999/年' },
    { s: '全年服务', p: '￥5999/年' },
    { s: '800个', p: '￥6999/年' },
    { s: '排名第一', p: '￥6999/年' },
    { s: '排名第一', p: '￥6999/年' },
    { s: '60条/年', p: '￥1799/年' },
    { s: '全年服务', p: '￥2999/年' },
    { s: '全年服务', p: '￥599/年' },
    { s: '不限次数', p: '￥6999/年' },
    { s: fiveIcon, p: '￥3999/年' },
    { s: '无限看', p: '￥4999/年' },
    { s: '全年服务', p: '￥6999/年' },
    { s: '全年服务', p: '￥6999/年' },
    { s: '全年服务', p: '￥6999/年' },
]


export default class BuyMember extends Component {

    config = {
        navigationBarTitleText: '会员购买'
    }

    state = {
        showTip: false,
        payflag: false
    }

    componentWillMount() {
        if (this.$router.params.sp_code) {
            this.setState({
                sp_code: this.$router.params.sp_code
            })
        }
    }


    componentDidShow() {
        this.getPrice()
        // console.log(this.$router.params)
    }

    render() {

        //服务标题
        const typeview = typelist.map((item, index) => {
            return <span key={index}>
                {item}
            </span>
        })

        //免费会员内容
        const freeview = freelist.map((item, index) => {
            return <View key={index} className={'freeitem'+index}>
                {index == 0 ? <span>{item.i}</span> : <Image src={item.i} className='nicon'></Image>}
            </View>
        })

        //钻石会员内容
        const diamonview = diamonlist.map((item, index) => {
            return <View key={index} className='diamonitem'>
                {index == 10 || index == 12 || index == 13 || index == 14 ? <Image src={item.s} className={'img' + index}></Image> : <span>{item.s}</span>}
                <span>{item.p}</span>
            </View>
        })

        //黑钻会员内容
        const blackview = blacklist.map((item, index) => {
            return <View key={index} className='blackitem'>
                {index == 10 ? <Image src={fiveIcon}></Image> : <span>{item.s}</span>}
                <span>{item.p}</span>
            </View>
        })

        let { diamonPrice, blackPrice } = this.state

        return (
            <View className='buymembermain'>
                <View className='buytop'></View>
                <View className='buytitle'>
                    <span className=''>马可会员<i>1折</i>购，原价<i>23990</i>现价<i>{diamonPrice}</i>，仅限该行业的前<i>10名</i>！</span>
                </View>

                <View className='memberbox'>
                    <View className='diamon'>
                        <Image src={topIcon} className='topimg'></Image>
                        <View className='payicon'>
                            <Image src={dIcon} className='iconimg'></Image>
                            <span>钻石会员</span>
                        </View>
                        <View className='paydiv'>
                            <span>￥<i>{diamonPrice}</i>/年</span>
                            <span>原价¥23990</span>
                            <span>询盘订单可提升200%</span>
                        </View>
                    </View>
                    <View className='diamonbtn' onClick={this.buyDiamon}>立即开通</View>
                </View>
                <View className='memberbox'>
                    <View className='black'>
                        <View className='payicon'>
                            <Image src={bIcon} className='iconimg'></Image>
                            <span>黑钻会员</span>
                        </View>
                        <View className='paydiv'>
                            <span>￥<i>{blackPrice}</i>/年</span>
                            <span>原价¥57990</span>
                            <span>询盘订单可提升600%</span>
                        </View>
                    </View>
                    <View className='blackbtn' onClick={this.buyBlack}>立即开通</View>
                </View>


                <View className='typetitle'>
                    <Text>特权对比</Text>
                </View>
                <View className='memberservice'>
                    <View className='tabletop'>
                        <View className='toptitle'>功能特权</View>
                        <View className='toptitle'>
                            <Image src={fIcon}></Image>
                            <span>免费会员</span>
                            <span>0元</span>
                        </View>
                        <View className='toptitle'>
                            <Image src={dIcon} className='micon'></Image>
                            <span>钻石会员</span>
                            <span>￥{diamonPrice}/年</span>
                            <span>原价23990</span>
                        </View>
                        <View className='toptitle'>
                            <Image src={bIcon} className='micon'></Image>
                            <span>黑钻会员</span>
                            <span>￥{blackPrice}/年</span>
                            <span>原价57990</span>
                        </View>
                    </View>


                    <View className='allservice'>
                        <View className='typeul'>
                            {typeview}
                        </View>
                        <View className='freeul'>
                            {freeview}
                        </View>

                        <View className='diamonul'>
                            {diamonview}
                        </View>

                        <View className='blackul'>
                            {blackview}
                        </View>

                    </View>

                    <View className='tablebottom'>
                        <View className='toptitle'>功能特权</View>
                        <View className='toptitle'>
                            <Image src={fIcon}></Image>
                            <span>免费会员</span>
                            <span>0元</span>
                        </View>
                        <View className='toptitle'>
                            <Image src={dIcon} className='micon'></Image>
                            <span>钻石会员</span>
                            <span>￥{diamonPrice}/年</span>
                            <span>原价23990</span>
                        </View>
                        <View className='toptitle'>
                            <Image src={bIcon} className='micon'></Image>
                            <span>黑钻会员</span>
                            <span>￥{blackPrice}/年</span>
                            <span>原价57990</span>
                        </View>
                    </View>



                </View>

                <View className='memberbtn'>
                    <View onClick={this.buyDiamon} className='diabtn'>开通钻石会员</View>
                    <View onClick={this.buyBlack} className='blabtn'>开通黑钻会员</View>
                </View>
                <View className='lookbtn'>查看特权详情</View>
                <View className='chatus'>
                    <Image src={phoneIcon}></Image>
                    <span>官方微信：QYBB-VIP</span>
                </View>
                <View className='chatus'>
                    <Image src={chatIcon}></Image>
                    <span>官方热线：010-82855119</span>
                </View>

                <View className='getbtn' onClick={this.buyDiamon}>立即享受会员特权</View>

                {this.state.showTip ? <View className='membertip'>
                    <View className='tipbox'>
                        {this.state.payflag ? <Text>恭喜您已开通马可波罗网会员服务</Text> :
                            <Text>支付中，请稍等...</Text>}
                        {this.state.payflag ? <Text className='btn' onClick={this.memberOk}>确定</Text> : ''}
                    </View>
                </View> : ''}



            </View>
        )
    }

    //确定按钮
    memberOk() {
        this.setState({
            showTip: false,
            payflag: false
        })
    }


    //购买钻石
    buyDiamon() {
        console.log(this.state.sp_code)
        let params = {
            app_id: 10095,
            sp_code: this.state.sp_code
        }
        api.api(BUY_MEMBER, params).then(res => {
            // console.log(res,'钻石')
            let that = this
            if (res.data.state == 1) {
                this.setState({
                    order_id: res.data.data.order_id
                })
                Taro.requestPayment({
                    timeStamp: res.data.data.timeStamp,
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                    success(val) {


                        that.checkOrder(res.data.data.order_id)


                        // Taro.navigateTo({ url: '/pages/result-pay/result-pay?type=0' })
                    },
                    fail(res) {
                        // Taro.navigateTo({ url: `/pages/result-pay/result-pay?type=1&typeService=2&orderId=${id}` })
                    }
                })
            } else {
                
                Taro.showToast({ title: res.data.msg, icon: 'none' })
                Taro.navigateTo({ url: '/pages/first-login/first-login' })
            }
        })
    }

    //购买黑钻
    buyBlack() {
        let params = {
            app_id: 10097,
            sp_code: this.state.sp_code
        }
        api.api(BUY_MEMBER, params).then(res => {
            let that = this
            if (res.data.state == 1) {
                this.setState({
                    order_id: res.data.data.order_id
                })
                Taro.requestPayment({
                    timeStamp: res.data.data.timeStamp,
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                    success() {
                        that.checkOrder(res.data.data.order_id)
                        // Taro.navigateTo({ url: '/pages/result-pay/result-pay?type=0' })
                    },
                    fail(res) {
                        // Taro.navigateTo({ url: `/pages/result-pay/result-pay?type=1&typeService=2&orderId=${id}` })
                    }
                })
            } else {
                Taro.showToast({ title: res.data.msg, icon: 'none' })
                Taro.navigateTo({ url: '/pages/first-login/first-login' })
            }
        })
    }



    //检查是否购买
    checkOrder(param) {
        let id = {
            order_id: param
        }
        api.api(CHECK_MEMBER, id).then(res => {

            // console.log(res,'检查')
            if (res.data.state == 1) {
                this.setState({
                    showTip: true,
                    payflag: true
                })
                return false;
            }
            if (res.data.state == 4) {
                this.setState({
                    showTip: true
                })
                let time = null
                time = setTimeout(() => {
                    this.checkOrder(this.state.order_id)
                }, 1000)
            }
        })
    }


    //获取套餐信息
    getPrice() {
        api.api(MEMBER_PRICE).then(res => {
            let diamonPrice = res.data.data.app_info['10095'].price
            let blackPrice = res.data.data.app_info['10097'].price
            let sp_code = res.data.data.sp_code
            if (this.$router.params.sp_code) {
                this.setState({
                    diamonPrice: diamonPrice,
                    blackPrice: blackPrice,
                    sp_code: this.$router.params.sp_code
                })
                return false
            }
            this.setState({
                diamonPrice: diamonPrice,
                blackPrice: blackPrice,
                sp_code: sp_code
            })
        })
    }



}