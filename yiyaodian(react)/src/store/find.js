import {observable,action,computed} from 'mobx'
import axios from 'axios';

class FindData{
@observable findbanList=[]
@observable findList=[]
@observable needList=[]
@observable needmainList=[]
@action
  getfindList=()=>{
    axios.get("https://api.myjson.com/bins/1gu85e").then(res=>{
      this.findList=res.data
    })
  }

  getneedList=(key)=>{
    axios.get("https://api.myjson.com/bins/1gu85e").then(res=>{
      res.data.filter((item,index)=>{
        if(index==key){
          this.needList=item
          this.findbanList=item.data.categoryBanners 
          this.needmainList=item.data.categoryinfo[0].thridCategory
        }
      })
  })
}
}

export default FindData
