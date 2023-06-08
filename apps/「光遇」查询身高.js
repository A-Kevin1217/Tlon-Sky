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
    var version_='jsjiami.com.v7';function _0x5d85(_0x6f4630,_0x15984d){const _0x48daa1=_0x48da();return _0x5d85=function(_0x5d8593,_0x2474dc){_0x5d8593=_0x5d8593-0x93;let _0x147a2f=_0x48daa1[_0x5d8593];if(_0x5d85['jglStW']===undefined){var _0x44c43=function(_0x84d402){const _0xbb389a='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x490bc0='',_0x4dcf19='';for(let _0x38dffb=0x0,_0x104865,_0x4a8029,_0x33fdb9=0x0;_0x4a8029=_0x84d402['charAt'](_0x33fdb9++);~_0x4a8029&&(_0x104865=_0x38dffb%0x4?_0x104865*0x40+_0x4a8029:_0x4a8029,_0x38dffb++%0x4)?_0x490bc0+=String['fromCharCode'](0xff&_0x104865>>(-0x2*_0x38dffb&0x6)):0x0){_0x4a8029=_0xbb389a['indexOf'](_0x4a8029);}for(let _0xee4fca=0x0,_0x566c77=_0x490bc0['length'];_0xee4fca<_0x566c77;_0xee4fca++){_0x4dcf19+='%'+('00'+_0x490bc0['charCodeAt'](_0xee4fca)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x4dcf19);};const _0x4c2996=function(_0x4eef11,_0x5e4d48){let _0x2f73eb=[],_0x591b94=0x0,_0x1d8d6a,_0x572420='';_0x4eef11=_0x44c43(_0x4eef11);let _0x31d92a;for(_0x31d92a=0x0;_0x31d92a<0x100;_0x31d92a++){_0x2f73eb[_0x31d92a]=_0x31d92a;}for(_0x31d92a=0x0;_0x31d92a<0x100;_0x31d92a++){_0x591b94=(_0x591b94+_0x2f73eb[_0x31d92a]+_0x5e4d48['charCodeAt'](_0x31d92a%_0x5e4d48['length']))%0x100,_0x1d8d6a=_0x2f73eb[_0x31d92a],_0x2f73eb[_0x31d92a]=_0x2f73eb[_0x591b94],_0x2f73eb[_0x591b94]=_0x1d8d6a;}_0x31d92a=0x0,_0x591b94=0x0;for(let _0x30adda=0x0;_0x30adda<_0x4eef11['length'];_0x30adda++){_0x31d92a=(_0x31d92a+0x1)%0x100,_0x591b94=(_0x591b94+_0x2f73eb[_0x31d92a])%0x100,_0x1d8d6a=_0x2f73eb[_0x31d92a],_0x2f73eb[_0x31d92a]=_0x2f73eb[_0x591b94],_0x2f73eb[_0x591b94]=_0x1d8d6a,_0x572420+=String['fromCharCode'](_0x4eef11['charCodeAt'](_0x30adda)^_0x2f73eb[(_0x2f73eb[_0x31d92a]+_0x2f73eb[_0x591b94])%0x100]);}return _0x572420;};_0x5d85['cJNIDi']=_0x4c2996,_0x6f4630=arguments,_0x5d85['jglStW']=!![];}const _0x53240b=_0x48daa1[0x0],_0x3fd3ff=_0x5d8593+_0x53240b,_0x55238e=_0x6f4630[_0x3fd3ff];return!_0x55238e?(_0x5d85['ieggqh']===undefined&&(_0x5d85['ieggqh']=!![]),_0x147a2f=_0x5d85['cJNIDi'](_0x147a2f,_0x2474dc),_0x6f4630[_0x3fd3ff]=_0x147a2f):_0x147a2f=_0x55238e,_0x147a2f;},_0x5d85(_0x6f4630,_0x15984d);}function _0x48da(){const _0x33d6ab=(function(){return[version_,'HWxjSOsfNUjgWqiMYlalPbmTyik.Rcxotqem.Iv7==','BtmbWPu','j8ooW77dJCosb25Oqa','W6DDaSoibNqrW4xcN8kCpmkL','umkei3RdOmoXxXfs','pmotdwG','FvVcNeyu','BepcKvBdS8kbEYu','W643lqBcUG','eCkmA8kedG','W58WtuzyWQvTgfe7WOS','wr9ZW6L1WQ1xqtLA','WRerW58sWONdL8odAG','W5i2tsWTWRbteNS','r8k+W7xcNG','amouy2W','WPLQFWv1W4xcV8ouWPqTW7TBoa'].concat((function(){return['W6/cQ8kNW4e','shxcPSolW4iMESo7WONdSa','W48VpY1DW4FcJ8oDWPq','WPHEfCo+kd54FYJcQ8oUW4i','CSoYemkPWR/cLci','WQykWR7cOCkzWPO0W6jdWRHazq','yCoTgSk0WPi','W5VdUX/dRh7dLqVdKq','qXhdQ8o2W4T0Cmo3pa','ig0avmoFWPFcRW','WO9YcWytW6y4Fh8NWRRdO8k1WPbGW41aj2vDmSkTpCkpWO1VW77dPxFdQIxcRXGXWPtdG2zLWRD+W5ldMmkqmvG3pmkGW6VdM8oxC8omW4pcQCkJdCkzsCoNWOvBCxtcK8kIkmkkWQO','W5RdVh/cLbBdIaJdKmkFbWO','W7VcQ8kHW5mq','W7JcKIZcTq','fSoqz2hdUG','WOhcQuRdRa','W4FcPmkfz8opkh3dPW','AdakWP8t'].concat((function(){return['WO/dS8kjW4L1qW4tv2b2','WOhdR8kX','n203WRGXBSoraG','WQ8iWR/cP8kyW5G6W7rbWRfp','W6Pf5Bwe5Pw15B6S776E5Q+b5zY05PYk6k2aAhRdHa','5Ock6l+G5P2Z57IB5AYMvfy','57Mg5A6IW6tdToMwSoITJxZORzlPH57MLylNU6VLRPC','5yY8s+EBNEwjV+I4HUMRPU+/Sa','nSkZrSoQW5ddHsi6W6Tyeq0','tH7dQSkpWPKGuCoQdh1fjq','FupcH0WFWP4AWPZcQa','WPXyBmkew0PqxG','W6Owa2tcUtO','lrJcMNBdImkGEG','sEs/OowFN8kPWPldM+waMoAzL+++Q8or','WOZcOCogk8krW4GacxpdGgjcW64Y','ixyGbq'];}()));}()));}());_0x48da=function(){return _0x33d6ab;};return _0x48da();};const _0x5215a3=_0x5d85;(function(_0x570908,_0x161ab6,_0x128fb2,_0x1da2c5,_0x23b639,_0xc907f4,_0x4fc154){return _0x570908=_0x570908>>0x4,_0xc907f4='hs',_0x4fc154='hs',function(_0x54b36b,_0x2a584d,_0x1383b7,_0x217ba8,_0x43f245){const _0x5c8df6=_0x5d85;_0x217ba8='tfi',_0xc907f4=_0x217ba8+_0xc907f4,_0x43f245='up',_0x4fc154+=_0x43f245,_0xc907f4=_0x1383b7(_0xc907f4),_0x4fc154=_0x1383b7(_0x4fc154),_0x1383b7=0x0;const _0x51d97d=_0x54b36b();while(!![]&&--_0x1da2c5+_0x2a584d){try{_0x217ba8=-parseInt(_0x5c8df6(0x96,'UkB%'))/0x1+-parseInt(_0x5c8df6(0xb3,'a@Bu'))/0x2*(parseInt(_0x5c8df6(0xaa,'KP!B'))/0x3)+-parseInt(_0x5c8df6(0xba,'7E[s'))/0x4*(parseInt(_0x5c8df6(0x94,'xq*C'))/0x5)+-parseInt(_0x5c8df6(0xbc,'A@iI'))/0x6*(parseInt(_0x5c8df6(0xbe,'sdL^'))/0x7)+parseInt(_0x5c8df6(0xb1,'abzh'))/0x8+-parseInt(_0x5c8df6(0xad,'27Hz'))/0x9*(-parseInt(_0x5c8df6(0xa9,'Y%Io'))/0xa)+parseInt(_0x5c8df6(0xbf,'8!YC'))/0xb*(parseInt(_0x5c8df6(0xb0,'a@Bu'))/0xc);}catch(_0x1ca164){_0x217ba8=_0x1383b7;}finally{_0x43f245=_0x51d97d[_0xc907f4]();if(_0x570908<=_0x1da2c5)_0x1383b7?_0x23b639?_0x217ba8=_0x43f245:_0x23b639=_0x43f245:_0x1383b7=_0x43f245;else{if(_0x1383b7==_0x23b639['replace'](/[PIkOWlYfeRUqMNgTySxbHt=]/g,'')){if(_0x217ba8===_0x2a584d){_0x51d97d['un'+_0xc907f4](_0x43f245);break;}_0x51d97d[_0x4fc154](_0x43f245);}}}}}(_0x128fb2,_0x161ab6,function(_0x1242fd,_0x6edb36,_0x10ec62,_0x1bd0fa,_0x4a0a1d,_0x3c9cbf,_0x419a61){return _0x6edb36='\x73\x70\x6c\x69\x74',_0x1242fd=arguments[0x0],_0x1242fd=_0x1242fd[_0x6edb36](''),_0x10ec62='\x72\x65\x76\x65\x72\x73\x65',_0x1242fd=_0x1242fd[_0x10ec62]('\x76'),_0x1bd0fa='\x6a\x6f\x69\x6e',(0x12f81c,_0x1242fd[_0x1bd0fa](''));});}(0xca0,0x66c28,_0x48da,0xcc),_0x48da)&&(version_=_0x48da);var json=JSON[_0x5215a3(0xc3,'b(C@')](fs['readFileSync'](dirpath+'/'+filename,_0x5215a3(0xa6,'c)gK'))),id=e['user_id'];let msg=e[_0x5215a3(0x97,'%[b!')],place=msg['replace'](/#|身高查询/g,'')['trim']();if(json[_0x5215a3(0xa5,'t@9@')](id)){await e[_0x5215a3(0xaf,'R2dX')](_0x5215a3(0x9a,'H2Xy'),![],{'recallMsg':0xa},!![]),place=JSON[_0x5215a3(0xa0,'cf!(')](json[id]['Sky_Uid'])[_0x5215a3(0xae,'OPHJ')](0x1,-0x1);let response=await fetch(_0x5215a3(0xc1,'a@Bu')+place),data=await response[_0x5215a3(0x93,']DyQ')]();place=JSON['stringify'](json[id]['Sky_Uid']),place=place[_0x5215a3(0xac,'cf!(')](0x1,-0x1);if(data[_0x5215a3(0xa7,'Ry2%')]===0xc8){let S值=data['data']['scale'],H值=data[_0x5215a3(0xb5,'KP!B')][_0x5215a3(0xa2,'2Y0G')],最高_原值=data[_0x5215a3(0xab,'78Pb')]['maxHeight'],最矮_原值=data[_0x5215a3(0xc4,'b*Yf')][_0x5215a3(0xa8,'^nXa')],当前_原值=data[_0x5215a3(0xb7,'b(C@')][_0x5215a3(0xb6,'f))8')],最高=Math[_0x5215a3(0x95,'Ry2%')](最高_原值*0x64)/0x64,最矮=Math['floor'](最矮_原值*0x64)/0x64,当前=Math[_0x5215a3(0xbd,'^XKf')](当前_原值*0x64)/0x64;const Textreply=_0x5215a3(0xa4,'lcS0')+S值+'\x0a身高\x20H\x20值是：\x0a'+H值+'\x0a最高是：'+最高[_0x5215a3(0xa3,'27Hz')](0x3)+'号\x0a最矮是：'+最矮[_0x5215a3(0xc0,'c)gK')](0x3)+_0x5215a3(0x9d,'Pnzn')+当前[_0x5215a3(0xc0,'c)gK')](0x3)+'号';msg=[segment['at'](this['e'][_0x5215a3(0xbb,'^XKf')]),Textreply?Textreply:''];}else{if(data[_0x5215a3(0xb4,'jTmx')]===0xc9){const Textreply=_0x5215a3(0x9c,'A@iI');msg=[Textreply?Textreply:''];}}await this[_0x5215a3(0xc5,'KP!B')](msg);}else await e['reply'](_0x5215a3(0x9b,'gDIF'));var version_ = 'jsjiami.com.v7';
}
}