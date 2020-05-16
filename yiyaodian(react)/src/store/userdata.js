import {observable,action,computed} from 'mobx'
import axios from 'axios';

 class Userdata  {
  @observable   registList={}
  @action
    getRegistList=(user,tel,pwd)=>{
      console.log(user,tel,pwd)
      axios.get(`http://yemin.gz01.bdysite.com/yihaodianya/php/regist.php?user=${user}&tel=${tel}&pwd=${pwd}`).then(res=>{
        this.registList=res.data
        return res.data
      })
    }
}

export default Userdata