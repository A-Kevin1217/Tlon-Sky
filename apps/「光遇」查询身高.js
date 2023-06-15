import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
let filename = `Sky UID.json`
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}
if (!fs.existsSync(dirpath + "/" + filename)) {
  fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({
  }))
}
export class 光遇_身高查询 extends plugin {
  constructor() {
    super({
      name: '光遇_身高查询',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
            reg: /^#?绑定身高id(.*)$/,
            fnc: 'sky_bdsg'
        },
        {
          reg: /^#?身高查询$/,
          fnc: 'sky_sgcx'
        }
      ]
    });
  }
  async sky_bdsg(e) {
    const msg = e.msg;
    const Sky_Uid = msg.replace(/#|绑定身高id/g, "").trim();
    const data = { Sky_Uid };
    const id = e.user_id;
    const json = JSON.parse(fs.readFileSync(`${dirpath}/${filename}`, "utf8"));
    json[id] = data;
    fs.writeFileSync(`${dirpath}/${filename}`, JSON.stringify(json, null, "\t"));
    const replyMsg = json.hasOwnProperty(id) ? "重新绑定成功" : "绑定成功\n您可使用'#身高查询'查询身高";
    await this.reply(replyMsg);
  }
  
  async sky_sgcx(e) {
    var version_='jsjiami.com.v7';function _0x4044(_0x4d3862,_0x257a56){const _0x57b8b8=_0x57b8();return _0x4044=function(_0x404489,_0x1cbf40){_0x404489=_0x404489-0x1d3;let _0x1d1cc9=_0x57b8b8[_0x404489];if(_0x4044['exQjgg']===undefined){var _0x5ad095=function(_0x2a7556){const _0x5e5731='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x3497a6='',_0xe37b84='';for(let _0x4ce5e4=0x0,_0x4a61bb,_0x74d7aa,_0x52d702=0x0;_0x74d7aa=_0x2a7556['charAt'](_0x52d702++);~_0x74d7aa&&(_0x4a61bb=_0x4ce5e4%0x4?_0x4a61bb*0x40+_0x74d7aa:_0x74d7aa,_0x4ce5e4++%0x4)?_0x3497a6+=String['fromCharCode'](0xff&_0x4a61bb>>(-0x2*_0x4ce5e4&0x6)):0x0){_0x74d7aa=_0x5e5731['indexOf'](_0x74d7aa);}for(let _0x18a7bb=0x0,_0x381bb3=_0x3497a6['length'];_0x18a7bb<_0x381bb3;_0x18a7bb++){_0xe37b84+='%'+('00'+_0x3497a6['charCodeAt'](_0x18a7bb)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0xe37b84);};const _0x1d95a3=function(_0x10ba09,_0x26b678){let _0x4de062=[],_0x40a09c=0x0,_0x4d8dc3,_0xd23592='';_0x10ba09=_0x5ad095(_0x10ba09);let _0x27ea54;for(_0x27ea54=0x0;_0x27ea54<0x100;_0x27ea54++){_0x4de062[_0x27ea54]=_0x27ea54;}for(_0x27ea54=0x0;_0x27ea54<0x100;_0x27ea54++){_0x40a09c=(_0x40a09c+_0x4de062[_0x27ea54]+_0x26b678['charCodeAt'](_0x27ea54%_0x26b678['length']))%0x100,_0x4d8dc3=_0x4de062[_0x27ea54],_0x4de062[_0x27ea54]=_0x4de062[_0x40a09c],_0x4de062[_0x40a09c]=_0x4d8dc3;}_0x27ea54=0x0,_0x40a09c=0x0;for(let _0x87bddc=0x0;_0x87bddc<_0x10ba09['length'];_0x87bddc++){_0x27ea54=(_0x27ea54+0x1)%0x100,_0x40a09c=(_0x40a09c+_0x4de062[_0x27ea54])%0x100,_0x4d8dc3=_0x4de062[_0x27ea54],_0x4de062[_0x27ea54]=_0x4de062[_0x40a09c],_0x4de062[_0x40a09c]=_0x4d8dc3,_0xd23592+=String['fromCharCode'](_0x10ba09['charCodeAt'](_0x87bddc)^_0x4de062[(_0x4de062[_0x27ea54]+_0x4de062[_0x40a09c])%0x100]);}return _0xd23592;};_0x4044['LWiEWy']=_0x1d95a3,_0x4d3862=arguments,_0x4044['exQjgg']=!![];}const _0x599b1f=_0x57b8b8[0x0],_0x58a30b=_0x404489+_0x599b1f,_0x4b0e32=_0x4d3862[_0x58a30b];return!_0x4b0e32?(_0x4044['gUPGKl']===undefined&&(_0x4044['gUPGKl']=!![]),_0x1d1cc9=_0x4044['LWiEWy'](_0x1d1cc9,_0x1cbf40),_0x4d3862[_0x58a30b]=_0x1d1cc9):_0x1d1cc9=_0x4b0e32,_0x1d1cc9;},_0x4044(_0x4d3862,_0x257a56);}function _0x57b8(){const _0x61f905=(function(){return[version_,'nbTCjnHpsfwjNLriqkaPmniy.wupcgeomF.DUv7H==','qmofcvFcG8kFWOLrWPlcSSo5gq','s8owW6arluZcIq','W67cSxBcMdBcU8oMw8oJW4VcPIHE','5yYOWOVNMQ/LI6ZOUQJPQzxVV4q','tWjEpmo9zCoF','gSkVW5iXcW','gmoiWQpdV2NcVHpdQmoyWRZdJa','bmkzFcBdH2hcOG','kJfPsSofvsFcHJJdS8oTkqO','fCkUW5W5ha','W7xcMbhdMa','ACkJWRWk','F8k4WR5x'].concat((function(){return['W4BcMuZdGbZcNmooWRNcPG','W63dRHZcLu/cK8khxeNdJa','B1tdLmkMzG','iMO7W5xdIXe2','omkJW4/dN8k7W6xdKCkoja','WPGZW4XIm8oQWRSPW4zEW6WjWPJcPNz7kfb7e1BdKmkNW7JdMmo2WQbJW6ZdNciWFYVdNbn9t8oma1dcRZRdGslcUCojemolecvoWPfEW4vqwSkTW4hdQc/dJX7cU8o/WPZcRgddMW','qSoodhFcJdxcQ8kEB1DvCq','W5tcMwObp3ddMCkFdSoFW4H/','aGi9r8kUWO/cKmkPWQKnWOKW','DdJcLmke','ue3dOCkstfmrW5VcKJXOyW','oUACUUMRK+AzKo++HW','WR/cVfRdHa','W7BcJ+w2JoAwGow/T++8GEASTowCSoAEGoITPmksrZaD5AYL6AoS772WW4BcImkFW7bam8o2iG','W447g8oLoCkMeLxdQmk9WPzVWRW'].concat((function(){return['dmkVW4G5efblW5tdLCo6W4tdJYVdLCoZW6ePW6zAWRRdJwddReCjWO7LRBdPOlpdIcT7ta','WRfohd8vW5FdQIDD','dv4QzCody8ovxehcQG','WOiIW4H+oq','vLzKemoV','pCkIW4RdVCk9W4NdRmkDoq','tCo2WOvTsWKmWPBdKSoDW77dLgC','tH59j8oAACoF','C1rene8','ySkJW4tdHSkL','W6a9WQldKxK','e+I7NUMPKvBcTrdLG7VMMzVVVkmi'];}()));}()));}());_0x57b8=function(){return _0x61f905;};return _0x57b8();};const _0x5deecb=_0x4044;(function(_0x5d549f,_0x25b5e5,_0x1d9d6b,_0x201055,_0x2a1d1b,_0x13a632,_0x38f6c4){return _0x5d549f=_0x5d549f>>0x5,_0x13a632='hs',_0x38f6c4='hs',function(_0x520014,_0x238612,_0x2d3502,_0x3a7cd6,_0x2a87f7){const _0x40d28e=_0x4044;_0x3a7cd6='tfi',_0x13a632=_0x3a7cd6+_0x13a632,_0x2a87f7='up',_0x38f6c4+=_0x2a87f7,_0x13a632=_0x2d3502(_0x13a632),_0x38f6c4=_0x2d3502(_0x38f6c4),_0x2d3502=0x0;const _0x2858e9=_0x520014();while(!![]&&--_0x201055+_0x238612){try{_0x3a7cd6=parseInt(_0x40d28e(0x1d7,'2ZLW'))/0x1+parseInt(_0x40d28e(0x1d9,'MR]N'))/0x2+parseInt(_0x40d28e(0x1e3,'J0Sa'))/0x3*(-parseInt(_0x40d28e(0x1f8,'L#f%'))/0x4)+-parseInt(_0x40d28e(0x1f0,'QRHo'))/0x5*(-parseInt(_0x40d28e(0x1f7,'LV#d'))/0x6)+-parseInt(_0x40d28e(0x1e4,'zB^G'))/0x7+parseInt(_0x40d28e(0x1d6,'lLXX'))/0x8+-parseInt(_0x40d28e(0x1ec,'YiCn'))/0x9;}catch(_0x4d7200){_0x3a7cd6=_0x2d3502;}finally{_0x2a87f7=_0x2858e9[_0x13a632]();if(_0x5d549f<=_0x201055)_0x2d3502?_0x2a1d1b?_0x3a7cd6=_0x2a87f7:_0x2a1d1b=_0x2a87f7:_0x2d3502=_0x2a87f7;else{if(_0x2d3502==_0x2a1d1b['replace'](/[HNUyDfknCFgwuPTbeqrLp=]/g,'')){if(_0x3a7cd6===_0x238612){_0x2858e9['un'+_0x13a632](_0x2a87f7);break;}_0x2858e9[_0x38f6c4](_0x2a87f7);}}}}}(_0x1d9d6b,_0x25b5e5,function(_0x4beea9,_0x43e9f2,_0x507f26,_0x18c19d,_0x2053d5,_0x135e6b,_0x40cdfa){return _0x43e9f2='\x73\x70\x6c\x69\x74',_0x4beea9=arguments[0x0],_0x4beea9=_0x4beea9[_0x43e9f2](''),_0x507f26='\x72\x65\x76\x65\x72\x73\x65',_0x4beea9=_0x4beea9[_0x507f26]('\x76'),_0x18c19d='\x6a\x6f\x69\x6e',(0x130893,_0x4beea9[_0x18c19d](''));});}(0x17a0,0x39272,_0x57b8,0xbf),_0x57b8)&&(version_=_0x57b8);const json=JSON['parse'](fs['readFileSync'](dirpath+'/'+filename,_0x5deecb(0x1f5,'NSVB'))),id=e['user_id'];if(json['hasOwnProperty'](id)){const 文字=_0x5deecb(0x1dc,'Xbux'),图片=_0x5deecb(0x1de,'zB^G'),消息=[文字?文字:'',图片?segment[_0x5deecb(0x1f3,'zB^G')](图片):''];await e[_0x5deecb(0x1e7,'TElS')](消息,![],{'recallMsg':0xa},!![]);const Sky_Uid=json[id][_0x5deecb(0x1eb,'9OO6')],response=await fetch(_0x5deecb(0x1d4,'JHtS')+Sky_Uid),data=await response[_0x5deecb(0x1f4,'Xbux')]();if(data[_0x5deecb(0x1f6,'NSVB')]===0xc8){const {scale,height,maxHeight,minHeight,currentHeight}=data[_0x5deecb(0x1db,'L#f%')],最高=Math[_0x5deecb(0x1e2,'2ZLW')](maxHeight*0x64)/0x64,最矮=Math[_0x5deecb(0x1ef,'zB^G')](minHeight*0x64)/0x64,当前=Math[_0x5deecb(0x1f9,'ExZ&')](currentHeight*0x64)/0x64,Textreply='\x0a体型\x20S\x20值是：\x0a'+scale+_0x5deecb(0x1e9,'!XIq')+height+_0x5deecb(0x1da,'2ZLW')+最高[_0x5deecb(0x1f1,'E]qY')](0x3)+'号\x0a最矮是：'+最矮[_0x5deecb(0x1fa,'5Com')](0x3)+_0x5deecb(0x1ed,'YiCn')+当前[_0x5deecb(0x1ee,'1L3$')](0x3)+'号',msg=[segment['at'](e[_0x5deecb(0x1e5,'1L3$')]),Textreply?Textreply:''];await this[_0x5deecb(0x1e6,'WgqD')](msg);}else{if(data[_0x5deecb(0x1d8,'5xcj')]===0xc9){const Textreply='绑定id错误,请重新绑定',msg=[Textreply?Textreply:''];await this[_0x5deecb(0x1e1,'JHtS')](msg);}}}else await e[_0x5deecb(0x1e8,'#kKQ')]('您还未绑定id');var version_ = 'jsjiami.com.v7';
}
}