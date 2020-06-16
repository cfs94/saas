import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'


import fabu from './image/fabu.png'
import yidong from './image/yidong.png'
import sous from './image/sous.png'
import lianjie from './image/lianjie.png'
import lianxi from './image/lianxi.png'
import paiming from './image/paiming.png'
import shangji from './image/shangji.png'
import ad from './image/ad.png'
import moban from './image/moban.png'
import shuaxin from './image/shuaxin.png'
import biaoshi from './image/biaoshi.png'
import tongzhi from './image/tongzhi.png'
import weizhi from './image/weizhi.png'
import xiufu from './image/xiufu.png'
import tongji from './image/tongji.png'



import './index.scss'

const itemlist = [
    { img: fabu, title: '3000条店铺标识' },
    { img: yidong, title: '移动营销管理工具' },
    { img: sous, title: '全网搜索引擎优化' },
    { img: lianjie, title: '全网搜索引擎权重增强特别链接' },
    { img: lianxi, title: '联系方式全站推荐' },
    { img: paiming, title: '站内同行业产品搜索优先排名' },
    { img: shangji, title: '60精准采购商机免费查看' },
    { img: ad, title: '企业全网去广告' },
    { img: moban, title: '20套店铺豪华模板' },
    { img: shuaxin, title: '产品一键刷新' },
    { img: biaoshi, title: '5星店铺标识' },
    { img: tongzhi, title: '采购商询盘即时通知' },
    { img: weizhi, title: '首页位置产品推荐' },
    { img: xiufu, title: '商铺、产品一键体检修复' },
    { img: tongji, title: '运营数据统计' },
]

export default class Items extends Component {




    render() {

        // const viewItem = itemlist.map((item,index)=>{
        //     return <View key={index} className='itemdiv'>
        //         <Image src={item.img} className='itemimg'></Image>
        //         <Text className='itemtitle'>{item.title}</Text>
        //     </View>
        // })

        return (
            <View>
                <Text className='servicetitle'>推荐服务</Text>
                <View className='itembox'>
                    <View className='itemdiv'>
                        {/* <Text>3000条</Text>
                        <Text>发布权限</Text> */}
                    </View>
                </View>
            </View>
        )
    }
}