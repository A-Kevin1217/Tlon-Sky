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
    var version_='jsjiami.com.v7';const _0x1acdc1=_0x3354;(function(_0x16678d,_0x2b2d25,_0x8da729,_0x246c20,_0x5b1546,_0x2da0ea,_0x550d2d){return _0x16678d=_0x16678d>>0x6,_0x2da0ea='hs',_0x550d2d='hs',function(_0x4f7199,_0x20694d,_0x4c611c,_0x719bbb,_0x376cb5){const _0x4685a1=_0x3354;_0x719bbb='tfi',_0x2da0ea=_0x719bbb+_0x2da0ea,_0x376cb5='up',_0x550d2d+=_0x376cb5,_0x2da0ea=_0x4c611c(_0x2da0ea),_0x550d2d=_0x4c611c(_0x550d2d),_0x4c611c=0x0;const _0x6bb580=_0x4f7199();while(!![]&&--_0x246c20+_0x20694d){try{_0x719bbb=parseInt(_0x4685a1(0xe9,'#4tk'))/0x1+parseInt(_0x4685a1(0x10d,'1m2W'))/0x2*(-parseInt(_0x4685a1(0xfc,'Mw]!'))/0x3)+-parseInt(_0x4685a1(0x102,'lMyL'))/0x4*(parseInt(_0x4685a1(0xf9,'[zRk'))/0x5)+parseInt(_0x4685a1(0xf1,'QvtL'))/0x6+parseInt(_0x4685a1(0xff,'Rd1X'))/0x7+-parseInt(_0x4685a1(0xe8,'qwM6'))/0x8+parseInt(_0x4685a1(0xee,'Su3G'))/0x9;}catch(_0x597bea){_0x719bbb=_0x4c611c;}finally{_0x376cb5=_0x6bb580[_0x2da0ea]();if(_0x16678d<=_0x246c20)_0x4c611c?_0x5b1546?_0x719bbb=_0x376cb5:_0x5b1546=_0x376cb5:_0x4c611c=_0x376cb5;else{if(_0x4c611c==_0x5b1546['replace'](/[EuSfJrqLhdyUBtKORHI=]/g,'')){if(_0x719bbb===_0x20694d){_0x6bb580['un'+_0x2da0ea](_0x376cb5);break;}_0x6bb580[_0x550d2d](_0x376cb5);}}}}}(_0x8da729,_0x2b2d25,function(_0x5664cc,_0x48692f,_0x36dcbe,_0x5a3cf1,_0x5f3e20,_0x37049a,_0x4bcdb2){return _0x48692f='\x73\x70\x6c\x69\x74',_0x5664cc=arguments[0x0],_0x5664cc=_0x5664cc[_0x48692f](''),_0x36dcbe='\x72\x65\x76\x65\x72\x73\x65',_0x5664cc=_0x5664cc[_0x36dcbe]('\x76'),_0x5a3cf1='\x6a\x6f\x69\x6e',(0x12f749,_0x5664cc[_0x5a3cf1](''));});}(0x3300,0x80622,_0x5802,0xce),_0x5802)&&(version_=_0x5802);function _0x3354(_0x36feb5,_0x3e9fda){const _0x5802b5=_0x5802();return _0x3354=function(_0x335438,_0x3cdd8e){_0x335438=_0x335438-0xe6;let _0xf2d473=_0x5802b5[_0x335438];if(_0x3354['ciryrD']===undefined){var _0x5aa09d=function(_0x521b4e){const _0x5b9b3a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x5ec7a1='',_0x54498d='';for(let _0x2767e7=0x0,_0x3a2606,_0x170653,_0x43a90e=0x0;_0x170653=_0x521b4e['charAt'](_0x43a90e++);~_0x170653&&(_0x3a2606=_0x2767e7%0x4?_0x3a2606*0x40+_0x170653:_0x170653,_0x2767e7++%0x4)?_0x5ec7a1+=String['fromCharCode'](0xff&_0x3a2606>>(-0x2*_0x2767e7&0x6)):0x0){_0x170653=_0x5b9b3a['indexOf'](_0x170653);}for(let _0x4a2446=0x0,_0x12b01f=_0x5ec7a1['length'];_0x4a2446<_0x12b01f;_0x4a2446++){_0x54498d+='%'+('00'+_0x5ec7a1['charCodeAt'](_0x4a2446)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x54498d);};const _0x2dd25b=function(_0x574040,_0x441b1e){let _0x340bdc=[],_0x190ef1=0x0,_0x450f19,_0x57a981='';_0x574040=_0x5aa09d(_0x574040);let _0x3c5e54;for(_0x3c5e54=0x0;_0x3c5e54<0x100;_0x3c5e54++){_0x340bdc[_0x3c5e54]=_0x3c5e54;}for(_0x3c5e54=0x0;_0x3c5e54<0x100;_0x3c5e54++){_0x190ef1=(_0x190ef1+_0x340bdc[_0x3c5e54]+_0x441b1e['charCodeAt'](_0x3c5e54%_0x441b1e['length']))%0x100,_0x450f19=_0x340bdc[_0x3c5e54],_0x340bdc[_0x3c5e54]=_0x340bdc[_0x190ef1],_0x340bdc[_0x190ef1]=_0x450f19;}_0x3c5e54=0x0,_0x190ef1=0x0;for(let _0x1a7f96=0x0;_0x1a7f96<_0x574040['length'];_0x1a7f96++){_0x3c5e54=(_0x3c5e54+0x1)%0x100,_0x190ef1=(_0x190ef1+_0x340bdc[_0x3c5e54])%0x100,_0x450f19=_0x340bdc[_0x3c5e54],_0x340bdc[_0x3c5e54]=_0x340bdc[_0x190ef1],_0x340bdc[_0x190ef1]=_0x450f19,_0x57a981+=String['fromCharCode'](_0x574040['charCodeAt'](_0x1a7f96)^_0x340bdc[(_0x340bdc[_0x3c5e54]+_0x340bdc[_0x190ef1])%0x100]);}return _0x57a981;};_0x3354['hsQCNz']=_0x2dd25b,_0x36feb5=arguments,_0x3354['ciryrD']=!![];}const _0x59157e=_0x5802b5[0x0],_0x553cf2=_0x335438+_0x59157e,_0x115ea=_0x36feb5[_0x553cf2];return!_0x115ea?(_0x3354['ybFVhM']===undefined&&(_0x3354['ybFVhM']=!![]),_0xf2d473=_0x3354['hsQCNz'](_0xf2d473,_0x3cdd8e),_0x36feb5[_0x553cf2]=_0xf2d473):_0xf2d473=_0x115ea,_0xf2d473;},_0x3354(_0x36feb5,_0x3e9fda);}function _0x5802(){const _0x939968=(function(){return[version_,'EjfhsfUEjiLuaHBmidB.cJoSUOm.qrvfR7yIutRK==','WOfoWRBcMgBdGCkY','57IP5A+QWPdcVUMuHEITGSkU6k+557Uz5A6I5Q6h56oGW73cLW','WQRcVSkjW7/dVLlcNmk6','WOy7E8oFWRm','mdCAcI3cP38uW4VcQmoZuK8','w38qadG','W4ZdImodWPu','WQSBWOdcHuNdHmoM','W6OuWQuxnq/dNd8','W7i9W7/dGW','5Ocr6l2K5P6p57M85A2iht8','pSkLECoHW71PDCouhH7dN8oDhCksfX1YBmkhx8kkWQddMCkqxmoSnMP1W7ZdUmoeWP3dQmklW4JcJ8kFWPPtW7NcUfzIWOzqWPnDWRtdKuRdQCknqerrW6xdM2vcWPX5nhJcGGCiFwe','mmkpW7iSWOdcOmow','W6tcQ2KXW4bal8keW71GmCoG','pSk0zmo2W6yN','kxhcImkqi24FmblcLsaA'].concat((function(){return['W6/LVkhLIjVOUk3PQ5BVVki','kCoDfSk/zCkyWR5nWPW','WPddRCkXW485WPr1','W6HTdbNcGb/cSCkZW5a','wxildG','WRddQSkHW7mj','WQFdJSkNymkfWRjCW7K','dUs9LUwEPXXjWRdLGBFMMz3VVRBdJG','imoGW74xdW','W5BcT8oksfK','W5VdNSoCWPemfZSQW6PczGddGq','A8kFvCoUpmktWPnMWQ7cIHi','lCoeWOmXWOdcG1vlWP0','WORdT+w1HUAuGUw8SU+/IEATUUwFKoACKEIUJgiiiW','WPhMNOJNNk/LJAFLIQdVViu','v+AFHoMQKUwmSowkU++9Sq','AIxdNCocudndyXxcNYy8cCkQ','WQHUW7xcOa'].concat((function(){return['g8oXzvNdHCkxpG','WRe2vgFdKKhdOSk9W4nGf18/','mSkWECoW','wdSmW4xcRSkYBmkem8oHbqq','WRVdRZC','W4xcKCovnxa','pCoFWRiT','W4T1WQRcN8k4vgy','tmk6WQddItu','nCkJWOfaW7maD8khW7uDW7/cUmk/','dmoRuuldMmkClNmqa1/dNSoE','W7fxgaK','W5rkb8oLt27dIdW','wmkZWR/dIJ4','n8oihmkEBSkwWRbdWPe','B8oWFmoSWRjBrfSBxCkNWOFdIa'];}()));}()));}());_0x5802=function(){return _0x939968;};return _0x5802();};var json=JSON['parse'](fs[_0x1acdc1(0x10f,'Su3G')](dirpath+'/'+filename,_0x1acdc1(0x106,'A&V@'))),id=e[_0x1acdc1(0x100,'LlmN')];let msg=e[_0x1acdc1(0xf4,'1m2W')],place=msg['replace'](/#|身高查询/g,'')[_0x1acdc1(0xf6,'P5jk')]();if(json['hasOwnProperty'](id)){await e[_0x1acdc1(0xe6,'CQf)')](_0x1acdc1(0xeb,'T&FI'),![],{'recallMsg':0xa},!![]),place=JSON[_0x1acdc1(0x111,'#4tk')](json[id][_0x1acdc1(0x107,'61k!')])['slice'](0x1,-0x1);let response=await fetch(_0x1acdc1(0x10b,'h@1M')+place),data=await response[_0x1acdc1(0xef,'QdDU')]();place=JSON[_0x1acdc1(0xea,'Bs6w')](json[id][_0x1acdc1(0x112,'7gq]')]),place=place[_0x1acdc1(0x115,'7gq]')](0x1,-0x1);if(data[_0x1acdc1(0xfb,'^*NM')]=0xc8){let S值=data[_0x1acdc1(0x114,'DbLR')][_0x1acdc1(0x103,'LzXn')],H值=data[_0x1acdc1(0xf2,'h@1M')][_0x1acdc1(0x10e,'h@1M')],最高_原值=data['data'][_0x1acdc1(0xfe,'#4tk')],最矮_原值=data['data'][_0x1acdc1(0x113,'QvtL')],当前_原值=data[_0x1acdc1(0x109,'qEXH')][_0x1acdc1(0xfa,'59u3')],最高=Math[_0x1acdc1(0xfd,'1JwY')](最高_原值*0x64)/0x64,最矮=Math[_0x1acdc1(0x105,'DbLR')](最矮_原值*0x64)/0x64,当前=Math[_0x1acdc1(0xe7,'ypVv')](当前_原值*0x64)/0x64;const Textreply=_0x1acdc1(0x117,'[LGc')+S值+'\x0a身高\x20H\x20值是：\x0a'+H值+_0x1acdc1(0xed,'Rd1X')+最高[_0x1acdc1(0xf0,'59u3')](0x2)+_0x1acdc1(0xec,'lMyL')+最矮[_0x1acdc1(0xf7,'N[hY')](0x2)+_0x1acdc1(0x110,'Mw]!')+当前[_0x1acdc1(0x10c,'u&wd')](0x2);msg=[segment['at'](this['e']['user_id']),Textreply?Textreply:''];}else msg=[_0x1acdc1(0x101,'61k!')];await this[_0x1acdc1(0xf8,'1JwY')](msg,!![]);}else await e[_0x1acdc1(0xf5,'9bB^')](_0x1acdc1(0x10a,'A&V@'));var version_ = 'jsjiami.com.v7';
}
}