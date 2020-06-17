import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import bIcon from './assets/diamonicon.png'
import dIcon from './assets/blackicon.png'
import topIcon from './assets/membertop.png'
import noIcon from './assets/error.png'
import fIcon from './assets/freeIcon.png'
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
    { i: noIcon }
]


export default class BuyMember extends Component {

    config = {
        navigationBarTitleText: '会员购买'
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
            return <View key={index} className='freeitem'>
                {index == 0 ? <span>{item.i}</span> : <Image src={item.i} className='nicon'></Image>}
            </View>
        })


        return (
            <View className='buymembermain'>
                <View className='buytop'></View>
                <View className='buytitle'>
                    <span className=''>马可会员<i>1折</i>购，原价<i>23990</i>现价<i>799</i>，仅限该行业的前<i>10名</i>！</span>
                </View>

                <View className='memberbox'>
                    <View className='diamon'>
                        <Image src={topIcon} className='topimg'></Image>
                        <View className='payicon'>
                            <Image src={dIcon} className='iconimg'></Image>
                            <span>钻石会员</span>
                        </View>
                        <View className='paydiv'>
                            <span>￥<i>799</i>/年</span>
                            <span>原价¥23990</span>
                            <span>询盘订单可提升300%</span>
                        </View>
                    </View>
                    <View className='diamonbtn'>立即开通</View>
                </View>
                <View className='memberbox'>
                    <View className='black'>
                        <View className='payicon'>
                            <Image src={bIcon} className='iconimg'></Image>
                            <span>黑钻会员</span>
                        </View>
                        <View className='paydiv'>
                            <span>￥<i>1999</i>/年</span>
                            <span>原价¥57990</span>
                            <span>询盘订单可提升300%</span>
                        </View>
                    </View>
                    <View className='blackbtn'>立即开通</View>
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
                            <span>￥799/年</span>
                            <span>原价23990</span>
                        </View>
                        <View className='toptitle'>
                            <Image src={bIcon} className='micon'></Image>
                            <span>黑钻会员</span>
                            <span>￥1999/年</span>
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
                    </View>

                </View>


            </View>
        )
    }

}