import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
var filename = `Sky UID.json`
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
    let msg = e.msg;
    var Sky_Uid = msg.replace(/#|绑定身高id/g, "").trim();
    var data = {
      "Sky_Uid": Sky_Uid,
    }
    const id = e.user_id
    var json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));
    if(!json.hasOwnProperty(id)) {
      json[id] = data
      fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));
      await this.reply("绑定成功\n您可使用'#身高查询'查询身高")
    }
    else{
      json[id] = data
      fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));
      await this.reply("重新绑定成功")
    }
  }
  async sky_sgcx(e) {
    var version_='jsjiami.com.v7';function _0x3955(_0x98aee1,_0x3f53f7){const _0x2e11cb=_0x2e11();return _0x3955=function(_0x39555a,_0x1f2114){_0x39555a=_0x39555a-0xe7;let _0x4e45fb=_0x2e11cb[_0x39555a];if(_0x3955['eBXhGD']===undefined){var _0x3d152f=function(_0x549532){const _0x3f6d96='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x31d8d6='',_0x51d6f5='';for(let _0x3aba5f=0x0,_0x174ac2,_0x2752ca,_0x3967a9=0x0;_0x2752ca=_0x549532['charAt'](_0x3967a9++);~_0x2752ca&&(_0x174ac2=_0x3aba5f%0x4?_0x174ac2*0x40+_0x2752ca:_0x2752ca,_0x3aba5f++%0x4)?_0x31d8d6+=String['fromCharCode'](0xff&_0x174ac2>>(-0x2*_0x3aba5f&0x6)):0x0){_0x2752ca=_0x3f6d96['indexOf'](_0x2752ca);}for(let _0x5969fc=0x0,_0x22e753=_0x31d8d6['length'];_0x5969fc<_0x22e753;_0x5969fc++){_0x51d6f5+='%'+('00'+_0x31d8d6['charCodeAt'](_0x5969fc)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x51d6f5);};const _0xdc089e=function(_0xb37655,_0x150e79){let _0x48eb8a=[],_0x1bd718=0x0,_0x32cfa1,_0x5429fc='';_0xb37655=_0x3d152f(_0xb37655);let _0x30d956;for(_0x30d956=0x0;_0x30d956<0x100;_0x30d956++){_0x48eb8a[_0x30d956]=_0x30d956;}for(_0x30d956=0x0;_0x30d956<0x100;_0x30d956++){_0x1bd718=(_0x1bd718+_0x48eb8a[_0x30d956]+_0x150e79['charCodeAt'](_0x30d956%_0x150e79['length']))%0x100,_0x32cfa1=_0x48eb8a[_0x30d956],_0x48eb8a[_0x30d956]=_0x48eb8a[_0x1bd718],_0x48eb8a[_0x1bd718]=_0x32cfa1;}_0x30d956=0x0,_0x1bd718=0x0;for(let _0x58b62f=0x0;_0x58b62f<_0xb37655['length'];_0x58b62f++){_0x30d956=(_0x30d956+0x1)%0x100,_0x1bd718=(_0x1bd718+_0x48eb8a[_0x30d956])%0x100,_0x32cfa1=_0x48eb8a[_0x30d956],_0x48eb8a[_0x30d956]=_0x48eb8a[_0x1bd718],_0x48eb8a[_0x1bd718]=_0x32cfa1,_0x5429fc+=String['fromCharCode'](_0xb37655['charCodeAt'](_0x58b62f)^_0x48eb8a[(_0x48eb8a[_0x30d956]+_0x48eb8a[_0x1bd718])%0x100]);}return _0x5429fc;};_0x3955['BxGeIN']=_0xdc089e,_0x98aee1=arguments,_0x3955['eBXhGD']=!![];}const _0x26cfe2=_0x2e11cb[0x0],_0xd892d4=_0x39555a+_0x26cfe2,_0x32e584=_0x98aee1[_0xd892d4];return!_0x32e584?(_0x3955['cBJSjf']===undefined&&(_0x3955['cBJSjf']=!![]),_0x4e45fb=_0x3955['BxGeIN'](_0x4e45fb,_0x1f2114),_0x98aee1[_0xd892d4]=_0x4e45fb):_0x4e45fb=_0x32e584,_0x4e45fb;},_0x3955(_0x98aee1,_0x3f53f7);}const _0x50bf9a=_0x3955;(function(_0xc26ba6,_0x1ab12f,_0x1a1f0a,_0x17b48a,_0x464f8c,_0xd99ddb,_0x4c4202){return _0xc26ba6=_0xc26ba6>>0x2,_0xd99ddb='hs',_0x4c4202='hs',function(_0x594b44,_0x1628dc,_0x6020f,_0x5405e7,_0x4f551c){const _0x3ea774=_0x3955;_0x5405e7='tfi',_0xd99ddb=_0x5405e7+_0xd99ddb,_0x4f551c='up',_0x4c4202+=_0x4f551c,_0xd99ddb=_0x6020f(_0xd99ddb),_0x4c4202=_0x6020f(_0x4c4202),_0x6020f=0x0;const _0xdf814f=_0x594b44();while(!![]&&--_0x17b48a+_0x1628dc){try{_0x5405e7=-parseInt(_0x3ea774(0xea,'MWIm'))/0x1*(-parseInt(_0x3ea774(0x10c,'X5lG'))/0x2)+-parseInt(_0x3ea774(0xf5,'Is3#'))/0x3+parseInt(_0x3ea774(0x108,'d4Hu'))/0x4*(parseInt(_0x3ea774(0x107,'9p3S'))/0x5)+-parseInt(_0x3ea774(0x10d,'M(0t'))/0x6+-parseInt(_0x3ea774(0xf3,'fd^('))/0x7+parseInt(_0x3ea774(0x104,'DNlc'))/0x8*(parseInt(_0x3ea774(0xfb,'7amu'))/0x9)+-parseInt(_0x3ea774(0xf4,'8)1w'))/0xa;}catch(_0x2cf71a){_0x5405e7=_0x6020f;}finally{_0x4f551c=_0xdf814f[_0xd99ddb]();if(_0xc26ba6<=_0x17b48a)_0x6020f?_0x464f8c?_0x5405e7=_0x4f551c:_0x464f8c=_0x4f551c:_0x6020f=_0x4f551c;else{if(_0x6020f==_0x464f8c['replace'](/[wQqkADBLKCWyNYHXTnOgu=]/g,'')){if(_0x5405e7===_0x1628dc){_0xdf814f['un'+_0xd99ddb](_0x4f551c);break;}_0xdf814f[_0x4c4202](_0x4f551c);}}}}}(_0x1a1f0a,_0x1ab12f,function(_0x18de92,_0x139193,_0x3ccc2a,_0x4fbd42,_0x53ffb4,_0x46beb6,_0x2919f7){return _0x139193='\x73\x70\x6c\x69\x74',_0x18de92=arguments[0x0],_0x18de92=_0x18de92[_0x139193](''),_0x3ccc2a='\x72\x65\x76\x65\x72\x73\x65',_0x18de92=_0x18de92[_0x3ccc2a]('\x76'),_0x4fbd42='\x6a\x6f\x69\x6e',(0x12f745,_0x18de92[_0x4fbd42](''));});}(0x318,0xb27d0,_0x2e11,0xc8),_0x2e11)&&(version_=_0x2e11);var json=JSON[_0x50bf9a(0x106,'kiqt')](fs[_0x50bf9a(0xf8,'MTHm')](dirpath+'/'+filename,'utf8')),id=e[_0x50bf9a(0xee,'GwFK')];let msg=e[_0x50bf9a(0xe7,'xaad')],place=msg['replace'](/#|身高查询/g,'')['trim']();function _0x2e11(){const _0x3e3138=(function(){return[version_,'NnuLjWWsQqHjgYiDaBXmyikK.wWCcToDkmY.vA7O==','sahdQ2S','xwL8W7ZcKXXrW6BdTCkioxK','w2nBW7hcRrbz','W7TcWPrxW7VcGKzhW5q','eSkrkCoyW6ywW417W4C','foI5NUMOU2NcOZBLGB7MMjRVVQFdSq','W5ToW7P6WRmPyq','WRuRWOpdKq','W5aHW4RdMmk5WPzCySoDESk4FW','xXtdRwmobmogW53dRa','tMyzWPxcOCoEW6u','Eow+TowkSoI5TUMOVo+9TG','B8oaWOXEWOy','W6BcN8o3Dq3dQSkgkmkLsZldVq','q8oHW65c'].concat((function(){return['WReId8orxa','W74XWPRcKSoCrhFcISkjW7eXW4Tx','W5rJwSk9W6zYWOZcNa','WQRdGSkikeBcVCkG','ECkJydtcUq','DSk6WONcHCkwWR4','WQpdJ8kuWRrHWQBdMq','hLdcPZXuvSkDW7hdVdDJA8kF','WOiYA8k3','D8kr5Bsr5Pw/5B6+77YA5QYH5zYD5P2y6kYzB8kRBa','5OcG6l+95P6P57U05A28kwe','W5rJj8oGWRG3W7BcOLxdJ8o4WPH3','umolACofWOxdI8o2WQq','uSoRW7PlsW','w2NdN8kLqHGd','WRtcQ8ol','fUAERoMOVEwpKUwlK+++NW'].concat((function(){return['gmoSWQZdTq','W4CBW4SPoahdTCknfhneW6G','W7ZcGL1pWOi7WPmTexhdLWC','WQWQe8oQxmkcW7RdQLy','57Mh5A65WOv76zAh6kYedEIVMoE5SEwTQ+AUMoEGSCkXW70','vNeRvJPiWP4','WOVdGbCGda','W7NcGvrdWO87W5CTmKNdTs5K','eCk/WR4wahDitvTzWOCr','5lYP5z+UjmoJA+waT+AzMU+9HCoW','WRKuWRSDW5D2mZP0W6f2W7TF','WQTbb1/dM8kdWRRdGCoIWRade8kDW74','xSkbWOLXx0qvWORdMmoLW5xdGa','WOfmWOP9Eq'];}()));}()));}());_0x2e11=function(){return _0x3e3138;};return _0x2e11();};if(json['hasOwnProperty'](id)){await e[_0x50bf9a(0xf6,'MWIm')](_0x50bf9a(0x10f,'681I'),![],{'recallMsg':0xa},!![]),place=JSON[_0x50bf9a(0x100,'M(0t')](json[id][_0x50bf9a(0xfd,'fd^(')])[_0x50bf9a(0x103,']Rg*')](0x1,-0x1);let response=await fetch('https://api.t1qq.com/api/sky/sc/sg?key=uc2WiIfj8iheIVUhdtbMw7Tn6I&cx='+place),data=await response['json']();place=JSON['stringify'](json[id][_0x50bf9a(0x101,'34Z2')]),place=place['slice'](0x1,-0x1);if(data[_0x50bf9a(0x105,'GHnj')]=0xc8){let S值=data[_0x50bf9a(0xe9,'Ymvv')]['scale'],H值=data[_0x50bf9a(0xf7,'M(0t')][_0x50bf9a(0x10b,'DAzl')],最高_原值=data[_0x50bf9a(0x10e,'d4Hu')][_0x50bf9a(0xfa,'K0I6')],最矮_原值=data[_0x50bf9a(0xfe,')BlE')][_0x50bf9a(0xec,'kiqt')],当前_原值=data['data']['currentHeight'],最高=Math[_0x50bf9a(0x10a,'ng5Z')](最高_原值*0x64)/0x64,最矮=Math['floor'](最矮_原值*0x64)/0x64,当前=Math[_0x50bf9a(0xef,'Xo[[')](当前_原值*0x64)/0x64;const Textreply=_0x50bf9a(0xf2,'c2ED')+S值+_0x50bf9a(0xfc,'681I')+H值+_0x50bf9a(0xe8,']Rg*')+最高[_0x50bf9a(0xf9,'MTHm')](0x2)+'\x0a最矮可到：'+最矮[_0x50bf9a(0x109,'DNlc')](0x2)+_0x50bf9a(0x102,'YXfw')+当前[_0x50bf9a(0x114,'Okv0')](0x2);msg=[segment['at'](this['e']['user_id']),Textreply?Textreply:''];}else msg=[_0x50bf9a(0xed,'K0I6')];await this[_0x50bf9a(0x113,'GHnj')](msg,!![]);}else await e['reply'](_0x50bf9a(0x110,'fd^('));var version_ = 'jsjiami.com.v7';
}
}