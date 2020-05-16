import {observable,action,computed} from 'mobx'
import {getBannerList,getgrabList,getjingbList,getbugList} from '../api/request'

class MainData{
  @observable bannerList=[]
  @observable menuList=[]
  @observable noticeList=[]
  @observable grabList=[]
  @observable grabimg=[]
  @observable jingxuan1=[]
  @observable jingxuan2=[]
  @observable jingxuan3=[]
  @observable jingxuan4=[]
  @observable jingxuan5=[]
  @observable jingxuan6=[]
  @observable jingxuan7=[]
  @observable jingxuan8=[]
  @observable jingxuan9=[]
  @observable bug1=[]
  @observable bug2=[]
  @observable bug=[]
  @observable needgoodsList=[]
  @action
    getData=()=>{
      getBannerList().then(res=>{
        this.bannerList=res.data.banner
        this.menuList=res.data.templatedata[0].contentList
        this.noticeList=res.data.notice
      })
    }
  @action
    getDatagra=()=>{
      getgrabList().then(res=>{
        this.grabList=res.data.itemData.today
        this.grabimg=res.data.jsonSale.today
      })
    }
    @action
    getDatajing=()=>{
      getjingbList().then(res=>{
        this.jingxuan1=res.data.goodTopic[0]
        this.jingxuan2=res.data.goodTopic[1]
        this.jingxuan3=res.data.goodTopic[2]
        this.jingxuan4=res.data.goodTopic[3]
        this.jingxuan5=res.data.goodTopic[4]
        this.jingxuan6=res.data.goodTopic[5]
        this.jingxuan7=res.data.goodTopic[6]
        this.jingxuan8=res.data.goodTopic[7]
        this.jingxuan9=res.data.goodTopic[8]
      })
    }
    @action
    getneedgoodslist=(key)=>{
      if(key==10){
        getgrabList().then(res=>{
          this.needgoodsList=res.data.itemData.today
        })
      }else{
        getjingbList().then(res=>{
          this.needgoodsList=res.data.goodTopic[key]
        })
        console.log(this.needgoodsList)
      }
    }
    @action
    getDatabug=()=>{
      getbugList().then(res=>{
        this.bug1=res.data.healthList
        this.bug2=res.data.newsList
      })
    } 
    @action
    getDatabugid=(key)=>{
      getbugList().then(res=>{
        res.data.healthList.filter((item,index)=>{
          if(index===key){
            this.bug=item.questionList
          }
        })
      })
    } 
  @observable imgUrl="data:image/png;base64,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"
}

export default MainData
