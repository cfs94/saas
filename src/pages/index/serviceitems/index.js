import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'


import fabu from './assets/fabu.png'
import yidong from './assets/yidong.png'
import sous from './assets/sous.png'
import lianjie from './assets/lianjie.png'
import lianxi from './assets/lianxi.png'
import paiming from './assets/paiming.png'
import shangji from './assets/shangji.png'
import ad from './assets/ad.png'
import moban from './assets/moban.png'
import shuaxin from './assets/shuaxin.png'
import biaoshi from './assets/biaoshi.png'
import tongzhi from './assets/tongzhi.png'
import weizhi from './assets/weizhi.png'
import xiufu from './assets/xiufu.png'
import tongji from './assets/tongji.png'



import './index.scss'

const itemlist = [
    { img: fabu },
    { img: yidong },
    { img: sous},
    { img: lianjie},
    { img: lianxi},
    { img: paiming},
    { img: shangji },
    { img: ad },
    { img: moban },
    { img: shuaxin },
    { img: biaoshi },
    { img: tongzhi},
    { img: weizhi},
    { img: xiufu },
    { img: tongji},
]

export default class Items extends Component {




    render() {

        const viewItem = itemlist.map((item,index)=>{
            return <View key={index} className='itemdiv'>
                <Image src={item.img} className='itemimg'></Image>
              
            </View>
        })

        return (
            <View>
                <Text className='servicetitle'>推荐服务</Text>
                <View className='itembox' onClick={this.toBuyMember}>
                    {viewItem}
                </View>
            </View>
        )
    }



    toBuyMember() {
		Taro.navigateTo({ url: '/pages/user/member' })
	}
}