import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import api from '@service/ask'
import { MEMBER_PRICE} from '@service/api'
import tipBanner from '../assets/tip_banner.png'
import './index.scss'

export default class PromotionTip extends Component {

    config = {
        navigationBarTitleText: '活动说明'
    }

    state = {}
    render() {
        return (
            <View className='promotiontipmain'>
                <Image src={'http://jic.makepolo.net/img15/memberpng/tip_banner.png'} className='topbanner'></Image>
                <View className='codebox'>
                    <span>您的推广码已生成：</span>
                    <span>{this.state.sp_code}</span>
                    <span>点击复制</span>
                    <Button openType='share' className='sharebtn'>去赚钱</Button>
                </View>
                <View className='tipbox'>
                    <Text>1.邀请新用户填写推广者的推广码，新用户购买会员服务，推广者将获得积分。</Text>
                    <Text>2.推广者的邀请码在会员中心右上角。</Text>
                    <Text>3.购买999元套餐获得300积分；购买2199元套餐获得500积分。</Text>
                    <Text>4.积分目前可用于兑换现金或购物卡，满800积分可兑换现金或等值800元购物卡。</Text>
                    <Text>5.对于恶意利用平台规则赚取积分的用户，平台有权对其进行封号处理。</Text>
                    <Text>6.购买流程：在马可波罗网注册登陆后可购买会员；支付页面填写推广码，没有推广码可不填写；可去小程序
                    和wap页面购买；可用小程序和wap页面分享给其他用户购买，购买时填写推广者的推广码即可。</Text>
                    <Text>7.获得邀请积分，被推广用户必须填写您的推广码。</Text>
                    <Text>8.推广者和被推广者为同一公司用户购买视为无效订单。</Text>
                    <Text>9.被推广者填推广码购买且被推广者为网站新用户为有效订单（注册24小时之内填写推广码购买）。</Text>
                    <Text>10.转发流程：pc 登录---会员中心/首页banner等位置---进入活动落地页（本页面）---点击上方复制电脑短连接---分享给你要推荐的人---被推荐人点开链接购买会员服务即可</Text>
                    <Text>wap 获取推广码---登录---浏览器分享---微信/qq---分享给你要推荐的人---被推荐人点开链接购买会员服务即可</Text>
                    <Text > 获取推广码---登录---复制推广码---发送给你要推荐的人---被推荐人登录网站购买会员服务时填推广码购买即可</Text>
                    <Text>11.被推广的企业必须符合国家和平台的规定，否则由此带来的后果以及损失由推广者负责。</Text>
                    <Text>12.本服务概不退款。</Text>
                    <Text>13.对本次活动有任何疑问请联系官方客服。 </Text>
                </View>

                <Button className='probtn' openType='share'>去赚钱</Button>
            
            </View>
        )
    }

    onShareAppMessage (res) {
        if (res.from === 'button') {
         
        }
        return {
          title: '转发即可获得500元现金',
          path: '/page/user/member?sp_code='+this.state.sp_code,
          imageUrl:tipBanner
        }
    }



    componentDidShow(){
        this.getPrice()
    }


    //获取套餐信息
    getPrice(){
        api.api(MEMBER_PRICE).then(res=>{
            let diamonPrice = res.data.data.app_info['10095'].price
            let blackPrice = res.data.data.app_info['10097'].price
            let sp_code = res.data.data.sp_code
            console.log(sp_code)
            this.setState({
                diamonPrice:diamonPrice,
                blackPrice:blackPrice,
                sp_code:sp_code
            })
        })
    }
   


}