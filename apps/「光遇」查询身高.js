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
var version_='jsjiami.com.v7';const _0x108dc8=_0x3d9a;(function(_0xa5c22,_0x28a332,_0x5a9613,_0x5c32b8,_0xebef85,_0x145981,_0x258ada){return _0xa5c22=_0xa5c22>>0x6,_0x145981='hs',_0x258ada='hs',function(_0xd0c9d7,_0x3cd281,_0x49ec51,_0x3a0a8d,_0x415f1e){const _0x4aada2=_0x3d9a;_0x3a0a8d='tfi',_0x145981=_0x3a0a8d+_0x145981,_0x415f1e='up',_0x258ada+=_0x415f1e,_0x145981=_0x49ec51(_0x145981),_0x258ada=_0x49ec51(_0x258ada),_0x49ec51=0x0;const _0x18573d=_0xd0c9d7();while(!![]&&--_0x5c32b8+_0x3cd281){try{_0x3a0a8d=parseInt(_0x4aada2(0x213,'*KIt'))/0x1+-parseInt(_0x4aada2(0x1fa,'ZtS%'))/0x2+-parseInt(_0x4aada2(0x217,'H42g'))/0x3+-parseInt(_0x4aada2(0x216,'6us1'))/0x4*(parseInt(_0x4aada2(0x1fd,'v23s'))/0x5)+parseInt(_0x4aada2(0x205,'PQ$a'))/0x6+-parseInt(_0x4aada2(0x1fc,'PQ$a'))/0x7+parseInt(_0x4aada2(0x21e,']SMD'))/0x8;}catch(_0x24e243){_0x3a0a8d=_0x49ec51;}finally{_0x415f1e=_0x18573d[_0x145981]();if(_0xa5c22<=_0x5c32b8)_0x49ec51?_0xebef85?_0x3a0a8d=_0x415f1e:_0xebef85=_0x415f1e:_0x49ec51=_0x415f1e;else{if(_0x49ec51==_0xebef85['replace'](/[BeIJQkXRYbEynfGNH=]/g,'')){if(_0x3a0a8d===_0x3cd281){_0x18573d['un'+_0x145981](_0x415f1e);break;}_0x18573d[_0x258ada](_0x415f1e);}}}}}(_0x5a9613,_0x28a332,function(_0x9d88ed,_0x1bba0c,_0x10cbbf,_0x3b6c98,_0x4347ed,_0x933f6c,_0x338e09){return _0x1bba0c='\x73\x70\x6c\x69\x74',_0x9d88ed=arguments[0x0],_0x9d88ed=_0x9d88ed[_0x1bba0c](''),_0x10cbbf='\x72\x65\x76\x65\x72\x73\x65',_0x9d88ed=_0x9d88ed[_0x10cbbf]('\x76'),_0x3b6c98='\x6a\x6f\x69\x6e',(0x12f68f,_0x9d88ed[_0x3b6c98](''));});}(0x3100,0x9cacb,_0x2831,0xc6),_0x2831)&&(version_=_0x2831);var json=JSON[_0x108dc8(0x20e,'YaGD')](fs['readFileSync'](dirpath+'/'+filename,'utf8')),id=e['user_id'];function _0x3d9a(_0x354a4f,_0x37b812){const _0x283190=_0x2831();return _0x3d9a=function(_0x3d9a3a,_0x5b92d2){_0x3d9a3a=_0x3d9a3a-0x1f4;let _0x24a2ee=_0x283190[_0x3d9a3a];if(_0x3d9a['FtxJuZ']===undefined){var _0x57962e=function(_0xf7bbc0){const _0x1ee48c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x220c4f='',_0x127649='';for(let _0x2e8177=0x0,_0x41b72c,_0x57f8c5,_0x11147a=0x0;_0x57f8c5=_0xf7bbc0['charAt'](_0x11147a++);~_0x57f8c5&&(_0x41b72c=_0x2e8177%0x4?_0x41b72c*0x40+_0x57f8c5:_0x57f8c5,_0x2e8177++%0x4)?_0x220c4f+=String['fromCharCode'](0xff&_0x41b72c>>(-0x2*_0x2e8177&0x6)):0x0){_0x57f8c5=_0x1ee48c['indexOf'](_0x57f8c5);}for(let _0x226082=0x0,_0x2d6aec=_0x220c4f['length'];_0x226082<_0x2d6aec;_0x226082++){_0x127649+='%'+('00'+_0x220c4f['charCodeAt'](_0x226082)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x127649);};const _0x1dd238=function(_0x38afdb,_0x5e2a62){let _0x1621e4=[],_0x155182=0x0,_0x3fdb62,_0x3ce535='';_0x38afdb=_0x57962e(_0x38afdb);let _0x54a8c2;for(_0x54a8c2=0x0;_0x54a8c2<0x100;_0x54a8c2++){_0x1621e4[_0x54a8c2]=_0x54a8c2;}for(_0x54a8c2=0x0;_0x54a8c2<0x100;_0x54a8c2++){_0x155182=(_0x155182+_0x1621e4[_0x54a8c2]+_0x5e2a62['charCodeAt'](_0x54a8c2%_0x5e2a62['length']))%0x100,_0x3fdb62=_0x1621e4[_0x54a8c2],_0x1621e4[_0x54a8c2]=_0x1621e4[_0x155182],_0x1621e4[_0x155182]=_0x3fdb62;}_0x54a8c2=0x0,_0x155182=0x0;for(let _0x1a8c85=0x0;_0x1a8c85<_0x38afdb['length'];_0x1a8c85++){_0x54a8c2=(_0x54a8c2+0x1)%0x100,_0x155182=(_0x155182+_0x1621e4[_0x54a8c2])%0x100,_0x3fdb62=_0x1621e4[_0x54a8c2],_0x1621e4[_0x54a8c2]=_0x1621e4[_0x155182],_0x1621e4[_0x155182]=_0x3fdb62,_0x3ce535+=String['fromCharCode'](_0x38afdb['charCodeAt'](_0x1a8c85)^_0x1621e4[(_0x1621e4[_0x54a8c2]+_0x1621e4[_0x155182])%0x100]);}return _0x3ce535;};_0x3d9a['oaWpIP']=_0x1dd238,_0x354a4f=arguments,_0x3d9a['FtxJuZ']=!![];}const _0x3558c1=_0x283190[0x0],_0x4a0df5=_0x3d9a3a+_0x3558c1,_0x375d42=_0x354a4f[_0x4a0df5];return!_0x375d42?(_0x3d9a['hXPOJr']===undefined&&(_0x3d9a['hXPOJr']=!![]),_0x24a2ee=_0x3d9a['oaWpIP'](_0x24a2ee,_0x5b92d2),_0x354a4f[_0x4a0df5]=_0x24a2ee):_0x24a2ee=_0x375d42,_0x24a2ee;},_0x3d9a(_0x354a4f,_0x37b812);}let msg=e['msg'],place=msg[_0x108dc8(0x1fb,'xjJQ')](/#|身高查询/g,'')[_0x108dc8(0x209,'FUI1')]();if(json['hasOwnProperty'](id)){await e[_0x108dc8(0x1ff,'v23s')]('id已收录，正在查询...',![],{'recallMsg':0xa},!![]),place=JSON['stringify'](json[id]['Sky_Uid'])[_0x108dc8(0x1f4,'GKMU')](0x1,-0x1);let response=await fetch('https://api.t1qq.com/api/sky/sc/sg?key=uc2WiIfj8iheIVUhdtbMw7Tn6I&cx='+place),data=await response[_0x108dc8(0x200,'lpYe')](),S值=data[_0x108dc8(0x220,']SMD')][_0x108dc8(0x21b,'NEQb')],H值=data['data']['height'],最高_原值=data[_0x108dc8(0x21f,'&8(h')][_0x108dc8(0x20a,'KO*N')],最矮_原值=data[_0x108dc8(0x20d,'#r]!')][_0x108dc8(0x214,'cLb^')],当前_原值=data[_0x108dc8(0x1f7,'bmaR')]['currentHeight'],最高=Math['floor'](最高_原值*0x64)/0x64,最矮=Math['floor'](最矮_原值*0x64)/0x64,当前=Math[_0x108dc8(0x203,'rb3#')](当前_原值*0x64)/0x64;place=JSON['stringify'](json[id][_0x108dc8(0x208,'n8)p')]),place=place[_0x108dc8(0x204,'SA2q')](0x1,-0x1),(data['code']=0xc8)?msg=[_0x108dc8(0x1f9,'5mE(')+(place['substring'](0x0,0x4)+place['substring'](0x4,place[_0x108dc8(0x212,'YaGD')]-0x4)[_0x108dc8(0x1f5,'D2f&')](/./g,'*')+place[_0x108dc8(0x202,'7GoT')](place[_0x108dc8(0x20b,'AsED')]-0x4))+_0x108dc8(0x206,'xjJQ')+S值+_0x108dc8(0x219,'Ozx^')+H值+'\x0a最高可到：'+最高['toFixed'](0x2)+_0x108dc8(0x1f8,'6us1')+最矮[_0x108dc8(0x21a,'a(lM')](0x2)+_0x108dc8(0x21d,'IT0e')+当前[_0x108dc8(0x1f6,'Ozx^')](0x2)]:msg=['绑定id错误,请绑定正确id'],await this[_0x108dc8(0x207,'n8)p')](msg,!![]);}else await e['reply'](_0x108dc8(0x21c,'FUI1'));function _0x2831(){const _0x569b2e=(function(){return[version_,'fjBsHjeiyXaJEmGNiIR.RcXom.Iv7XYbBbnkkQkJ==','WQv8W7H+gbWRbSkMdSkQW4i','WPBcM8kVf3ZcHuewW5C','fSkTyIHD','W6O+WPDiWQ4','c0/dMbxcOCkOW6tcSmk9WOJcULtcIa','vos9H+wFL8knlmku5yc377+l','W7ldLt3cKeK','W5pdMZtcO2uGsW','W7/cVmo8W48','aSkufCozixXPfCkT','W7/cJ8kMjmkNna','WO9ZqSoLbHqTu8ocWRtcSvKY','sCoXiCos','W43cO1tcU3S'].concat((function(){return['dmoTW4tdKdbKAIFdImkPWRNdISkg','rmo1oxuEW5irWPZdQgBcGCkw','WOLWq8oObX4MFCoNWPJcKgmx','W5hcP0JcR2RcHG','fxDYvwdcRSk3BunFE8kD','EqJdI8oGdCkGW67dNX4','WRhcIxtdHqz7gc5bl8ocv8k4Fq','cmoHW7jyug5UW7BdLmkhWPmqWPS','W4aJW5NdH8oay8oGvvvHW49Cqa','qCo1nhqxW5fUWOhdTehcRmkSlG','mUI5S+MOQSohqhpLGAdVVAu','WQOtk8kcEZ4+','yCk3W4PUWRa','5OcJ6lYw5P6/57MZ5A2RWQ5W','Fow+HUwkLUI6R+MOHU++LG','WO14s8oPbbqOjCoIWRhcH0qRWRm'].concat((function(){return['WQJcVvCB','W5GGbSkX','W6dcL8kPgGS','eCoXWPTysr/dVW','tmk3WRtcJNa2oa','WOJdMa8X','nUAFLoECQUwoGowjMo+9GW','yKS577+q','rI0UxhbuWPnlaquUcG','lheSW4eEW5DU','duZdMrJcOmkIW6/cNSkyWQtcM27cRq','W73cKJTBcSkhW6a','qCoRuw0drSok','WRRcNanZha','W5T0WO3dOa'];}()));}()));}());_0x2831=function(){return _0x569b2e;};return _0x2831();};var version_ = 'jsjiami.com.v7';
  }
}