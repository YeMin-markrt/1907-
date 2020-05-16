
import FindData from './find'
import MainData from './main'
import Usericon from './usericon'
import Userdata from './userdata'
import Goodsdetail from './goodsdetail'
import Drug from './dyugs'

let main=new MainData()
let find=new FindData()
let user=new Usericon()
let userdata=new Userdata()
let detail =new Goodsdetail()
let drugs= new Drug()

const store={
  main,
  find,
  user,
  userdata,
  detail,
  drugs
}
export default store
