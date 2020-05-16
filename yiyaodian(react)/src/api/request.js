import axios from './index'; 

export const getBannerList=()=>{
  return axios.get("mobile/home/getHeadData?tradername=yw_app&trader=h5&closesignature=yes&signature_method=md5&timestamp=1583222148102&signature=****&siteid=9&deviceCode=BfeBC0Ea-e9C9-4e6c-9a-7AA0deEbb9C&locatecityname=%E6%B5%8E%E5%8D%97&locateprovinceid=16")
}

export const getgrabList=()=>{
  return axios.get("mobile/flashsale/getTodayData?tradername=mobileios&trader=h5&closesignature=yes&signature_method=md5&timestamp=1583231288552&signature=****&provinceid=1&versionFlag=")
}

export const getjingbList=()=>{
  return axios.get("mobile/home/getTailData?tradername=yw_app&trader=h5&closesignature=yes&signature_method=md5&timestamp=1583238690518&signature=****&siteid=9&deviceCode=BfeBC0Ea-e9C9-4e6c-9a-7AA0deEbb9C&locatecityname=济南&locateprovinceid=16")
}

export const getbugList=()=>{
  return axios.get("/layout/h5/index?tradername=yw_app&trader=h5&closesignature=yes&signature_method=md5&timestamp=1583240724293&signature=****&siteid=9&deviceCode=BfeBC0Ea-e9C9-4e6c-9a-7AA0deEbb9C&locatecityname=济南&locateprovinceid=16")
}


export const detailtuijian=(type,cataid,id)=>{
  return axios.post(`/product/v1/recommend/getrecommend?tradername=yw_app&trader=h5&closesignature=yes&signature_method=md5&timestamp=1583461185165&signature=****&siteid=9&province=18&deviceid=BfeBC0Ea-e9C9-4e6c-9a-7AA0deEbb9C&catid=${cataid}&itemid=${id}&requestType=${type}`)
}


export const goodsdetail=(id)=>{
  return axios.post(`/product/v1/product/getProductBaseInfo?tradername=yw_app&trader=h5&closesignature=yes&signature_method=md5&timestamp=1583462508792&signature=****&siteid=9&provinceid=18&itemid=${id}&width=375&provinceName=湖北`)
}


export const getchangxu=()=>{
  return axios.get("/mobile/standbyMedicine?token=WEkrakpTa3pwZUh2S2tHVWxjdEN2dXBObEphM29GQkphU0EzSmtab1dtb2t2NWFuVDBkaHJJcENqQUVXWVVmWUFZdEJJb2hSeVUvUjNmUlREK2tZd0o0aklBMmpMZ2htb0t5VnpQU1ErL2phRTNtZi8xQlFVcXpxVy8vUmE3dmFIYnNZWlJXWVhqTzRhcm03cVhjYW93Szk5ampyeEx2WHk5TXkrVG0zQXFHTWdieUtZQUdEem51QzNSamlCMkVudC8yMlZVRGNmV2ZZNXFPY3I5K095QT09P2FwcElkPTExMjcma2V5SWQ9MTEyNw%253D%253D&demandcartkey=5e164deb8ee124721dd9d9429e6fa267&cartkey=5e164deb8ee124721dd9d9429e6fa267&h5version=100&provinceid=18&province=18&provincename=%E6%B9%96%E5%8C%97&cityname=%E4%B8%8A%E6%B5%B7&countyname=%E6%B5%A6%E4%B8%9C%E6%96%B0%E5%8C%BA&tradername=yw_app&trader=h5&closesignature=yes&signature_method=md5&timestamp=1583482682772&signature=****&siteid=9&isAddYz=1&cartVersion=h5&locateProvinceId=18&locateCityName=%E5%92%B8%E5%AE%81")
}

export const goodsdlistya=(key1,key2)=>{
  return axios.post(`http://gateway.fangkuaiyi.com/search/prod?tradername=yw_app&trader=h5&categoryId=${key1}&categoryName=${key2}&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9`)
}


export const getdruglist1=()=>{
  return axios.get("/pruduct/queryItemsByItemIds?&trader=h5&&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9&itemids=9972655,50092349,51255937,51425982,51426757&tradername=release&provinceId=18")
}

export const getdruglist2=()=>{
  return axios.get("/pruduct/queryItemsByItemIds?&trader=h5&&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9&itemids=51424612,51425013,51425653,51426031,51426320,51426803,51426954&tradername=release&provinceId=18")
}

export const getdruglist3=()=>{
  return axios.get("/pruduct/queryItemsByItemIds?&trader=h5&&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9&itemids=51422006,51422058,51422263,51422319,51422363,51422402,51424518,51424519,51424532,51424566,51425078,51425450,51425456&tradername=release&provinceId=18")
}


export const getdruglist4=()=>{
  return axios.get("/pruduct/queryItemsByItemIds?&trader=h5&&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9&itemids=51424856,51425449,51425987,51425988,51426131,51426134,51426143,51426462&tradername=release&provinceId=18")
}

export const getdruglist5=()=>{
  return axios.get("/pruduct/queryItemsByItemIds?&trader=h5&&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9&itemids=971706,971734,971744,971821,971833,972419,972655,983363,1689052,4303173,7835068,50003429,50089978,50092349,50104428,50159532,50181621,50317653,50814717,50988426,51142914,51255937,51308390,51422058,51424692&tradername=release&provinceId=18")
}

export const getdruglist6=()=>{
  return axios.get("/pruduct/queryItemsByItemIds?&trader=h5&&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9&itemids=50985376,51352579,51388329,51388331,51422356,51424623,51425448&tradername=release&provinceId=18")
}

export const getdruglist7=()=>{
  return axios.get("/pruduct/queryItemsByItemIds?&trader=h5&&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9&itemids=971851,971868,972549,972587,972684,972690,976427,5423544,13179689,50003581,50005522,50089978,50103178,50160475,51336239&tradername=release&provinceId=18")
}

export const getdruglist8=()=>{
  return axios.get("/pruduct/queryItemsByItemIds?&trader=h5&&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9&itemids=971706,971777,971778,971779,971784,971919,974636,994739,1122101,2042943,7885204,50007206,50069099,50091100,50093213,50095521,50098219,51074527,51172850&tradername=release&provinceId=18")
}

export const getdruglist9=()=>{
  return axios.get("/pruduct/queryItemsByItemIds?&trader=h5&&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9&itemids=972656,973590,1008237,1016790,1689052,2659077,50006417,50022840,50022843,50072335,50090898,50090913,50131905,50148526,50184165,50284800,50836285,50836297,51017595,51074183,51156726,51350752,51385972&tradername=release&provinceId=18")
}

export const getdruglist10=()=>{
  return axios.get("/pruduct/queryItemsByItemIds?&trader=h5&&closesignature=yes&signature_method=md5&timestamp=1583571097833&signature=****&siteid=9&itemids=50092349,50098359,50181621,51033298,51033299,51146144&tradername=release&provinceId=18")
}