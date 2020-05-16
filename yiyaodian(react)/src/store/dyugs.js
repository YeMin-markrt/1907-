import {observable,action} from 'mobx'
import {getdruglist1,getdruglist2,getdruglist3,getdruglist4,getdruglist5,getdruglist6,getdruglist7,getdruglist8,getdruglist9,getdruglist10} from '../api/request'

class Drug{
  @observable needlist1=[]
  @observable needlist2=[]
  @observable needlist3=[]
  @observable needlist4=[]
  @observable needlist5=[]
  @observable needlist6=[]
  @observable needlist7=[]
  @observable needlist8=[]
  @observable needlist9=[]
  @observable needlist10=[]

  @action
  getLidt1t1=()=>{
    getdruglist1().then(res=>{
      this.needlist1=res.data.list
    })
  }

  @action
  getLidt1t2=()=>{
    getdruglist2().then(res=>{
      this.needlist2=res.data.list
    })
  }

  @action
  getLidt1t3=()=>{
    getdruglist3().then(res=>{
      this.needlist3=res.data.list
    })
  }

  @action
  getLidt1t4=()=>{
    getdruglist4().then(res=>{
      console.log(res.data.list)
      this.needlist4=res.data.list
    })
  }

  @action
  getLidt1t5=()=>{
    getdruglist5().then(res=>{
      this.needlist5=res.data.list
    })
  }

  @action
  getLidt1t6=()=>{
    getdruglist6().then(res=>{
      this.needlist6=res.data.list
    })
  }

  @action
  getLidt1t7=()=>{
    getdruglist7().then(res=>{
      this.needlist7=res.data.list
    })
  }

  @action
  getLidt1t8=()=>{
    getdruglist8().then(res=>{
      this.needlist8=res.data.list
    })
  }

  @action
  getLidt1t9=()=>{
    getdruglist9().then(res=>{
      this.needlist9=res.data.list
    })
  }

  @action
  getLidt1t10=()=>{
    getdruglist10().then(res=>{
      this.needlist10=res.data.list
    })
  }

}

export default Drug