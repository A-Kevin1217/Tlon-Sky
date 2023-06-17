import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
const 使用次数文件夹 = "plugins/Tlon-Sky/data/使用次数"
let filename = 'Sky UID.json'
let 使用次数文件 = '身高查询使用次数.json'
// 没有则自动创建
if (!fs.existsSync(dirpath)){fs.mkdirSync(dirpath);}
if (!fs.existsSync(使用次数文件夹)){fs.mkdirSync(使用次数文件夹);}
if (!fs.existsSync(dirpath + "/" + filename)) {fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({}))}
if (!fs.existsSync(使用次数文件夹 + "/" + 使用次数文件)) {fs.writeFileSync(使用次数文件夹 + "/" + 使用次数文件, JSON.stringify({}))}

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
          reg: /^#?(身高查询|查询身高)$/,
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
    var version_='jsjiami.com.v7';function _0x20db(_0x1e5f17,_0x98230b){const _0x25e67d=_0x25e6();return _0x20db=function(_0x20db9b,_0x2f34a3){_0x20db9b=_0x20db9b-0xe5;let _0x307a11=_0x25e67d[_0x20db9b];if(_0x20db['zMTpkm']===undefined){var _0x12eabc=function(_0x11f489){const _0x34b18c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x20c6d4='',_0x30a1ce='';for(let _0x3e80b7=0x0,_0x1af1de,_0x580d9c,_0x5703eb=0x0;_0x580d9c=_0x11f489['charAt'](_0x5703eb++);~_0x580d9c&&(_0x1af1de=_0x3e80b7%0x4?_0x1af1de*0x40+_0x580d9c:_0x580d9c,_0x3e80b7++%0x4)?_0x20c6d4+=String['fromCharCode'](0xff&_0x1af1de>>(-0x2*_0x3e80b7&0x6)):0x0){_0x580d9c=_0x34b18c['indexOf'](_0x580d9c);}for(let _0x39e9fc=0x0,_0x1954af=_0x20c6d4['length'];_0x39e9fc<_0x1954af;_0x39e9fc++){_0x30a1ce+='%'+('00'+_0x20c6d4['charCodeAt'](_0x39e9fc)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x30a1ce);};const _0x453d81=function(_0x255de5,_0x3c7b30){let _0x141425=[],_0x5d4fe0=0x0,_0x333396,_0x1263a8='';_0x255de5=_0x12eabc(_0x255de5);let _0x2e3f38;for(_0x2e3f38=0x0;_0x2e3f38<0x100;_0x2e3f38++){_0x141425[_0x2e3f38]=_0x2e3f38;}for(_0x2e3f38=0x0;_0x2e3f38<0x100;_0x2e3f38++){_0x5d4fe0=(_0x5d4fe0+_0x141425[_0x2e3f38]+_0x3c7b30['charCodeAt'](_0x2e3f38%_0x3c7b30['length']))%0x100,_0x333396=_0x141425[_0x2e3f38],_0x141425[_0x2e3f38]=_0x141425[_0x5d4fe0],_0x141425[_0x5d4fe0]=_0x333396;}_0x2e3f38=0x0,_0x5d4fe0=0x0;for(let _0x187737=0x0;_0x187737<_0x255de5['length'];_0x187737++){_0x2e3f38=(_0x2e3f38+0x1)%0x100,_0x5d4fe0=(_0x5d4fe0+_0x141425[_0x2e3f38])%0x100,_0x333396=_0x141425[_0x2e3f38],_0x141425[_0x2e3f38]=_0x141425[_0x5d4fe0],_0x141425[_0x5d4fe0]=_0x333396,_0x1263a8+=String['fromCharCode'](_0x255de5['charCodeAt'](_0x187737)^_0x141425[(_0x141425[_0x2e3f38]+_0x141425[_0x5d4fe0])%0x100]);}return _0x1263a8;};_0x20db['FybODy']=_0x453d81,_0x1e5f17=arguments,_0x20db['zMTpkm']=!![];}const _0x14e8cc=_0x25e67d[0x0],_0x4c8753=_0x20db9b+_0x14e8cc,_0x38ed07=_0x1e5f17[_0x4c8753];return!_0x38ed07?(_0x20db['uwooRo']===undefined&&(_0x20db['uwooRo']=!![]),_0x307a11=_0x20db['FybODy'](_0x307a11,_0x2f34a3),_0x1e5f17[_0x4c8753]=_0x307a11):_0x307a11=_0x38ed07,_0x307a11;},_0x20db(_0x1e5f17,_0x98230b);}const _0x36169c=_0x20db;(function(_0x41c52e,_0x5eb831,_0x468aed,_0x593bc8,_0x3c4f69,_0x11d792,_0x19a17c){return _0x41c52e=_0x41c52e>>0x3,_0x11d792='hs',_0x19a17c='hs',function(_0x47e541,_0x3081ee,_0x313699,_0x297c62,_0x52071c){const _0x493375=_0x20db;_0x297c62='tfi',_0x11d792=_0x297c62+_0x11d792,_0x52071c='up',_0x19a17c+=_0x52071c,_0x11d792=_0x313699(_0x11d792),_0x19a17c=_0x313699(_0x19a17c),_0x313699=0x0;const _0x187649=_0x47e541();while(!![]&&--_0x593bc8+_0x3081ee){try{_0x297c62=parseInt(_0x493375(0x10f,'IkON'))/0x1+-parseInt(_0x493375(0xf3,'r(ar'))/0x2*(parseInt(_0x493375(0xfb,'LdA3'))/0x3)+parseInt(_0x493375(0x109,'$gcp'))/0x4*(parseInt(_0x493375(0xf2,'IkON'))/0x5)+parseInt(_0x493375(0xef,'F@Xk'))/0x6+parseInt(_0x493375(0x114,'pZPc'))/0x7+-parseInt(_0x493375(0xe6,'0rb3'))/0x8+-parseInt(_0x493375(0xfd,'&&[d'))/0x9;}catch(_0x257c2d){_0x297c62=_0x313699;}finally{_0x52071c=_0x187649[_0x11d792]();if(_0x41c52e<=_0x593bc8)_0x313699?_0x3c4f69?_0x297c62=_0x52071c:_0x3c4f69=_0x52071c:_0x313699=_0x52071c;else{if(_0x313699==_0x3c4f69['replace'](/[LgbEBCkVtlyNSpJGer=]/g,'')){if(_0x297c62===_0x3081ee){_0x187649['un'+_0x11d792](_0x52071c);break;}_0x187649[_0x19a17c](_0x52071c);}}}}}(_0x468aed,_0x5eb831,function(_0x10561c,_0x227d0f,_0x1a212e,_0x41b64c,_0x373874,_0x4aa165,_0x1c5421){return _0x227d0f='\x73\x70\x6c\x69\x74',_0x10561c=arguments[0x0],_0x10561c=_0x10561c[_0x227d0f](''),_0x1a212e='\x72\x65\x76\x65\x72\x73\x65',_0x10561c=_0x10561c[_0x1a212e]('\x76'),_0x41b64c='\x6a\x6f\x69\x6e',(0x130b81,_0x10561c[_0x41b64c](''));});}(0x5f0,0x1f655,_0x25e6,0xc0),_0x25e6)&&(version_=_0x25e6);let userCounts=JSON['parse'](fs[_0x36169c(0x115,'F@Xk')](使用次数文件夹+'/'+使用次数文件,_0x36169c(0x100,'H4os')));function _0x25e6(){const _0x5eae07=(function(){return[version_,'kJejrGstbkjiytaEmikV.BGcCBNomgE.tLv7tplS==','xSkXcw3cMe0XWP7dKSkLW5BdPq','W7PjW6vc','iKxcMmoTWRTnFa','WRJdQZpcMq','W75IBs3dUSkBW5rGECkgwSoMWQu','WRDFW5nDW7ldQSoW','E8ofuSoYWPy','W7bVbxZcI8ouWPe','h8oHmvS0W7i','W71sWQTz','WO9rW7ibWQtcH8kO','meBcSCoRWRe','W5xKVz7LNAVcNSoDWR7LGQxMMkJVVjVcGq','Dr0rWQe','W5VcJmkXWP7dKwuuW5uma38rFCkO','W5DVW4JdRc/cMf4'].concat((function(){return['ymkBpNtcVWHLmmkSWQtcQq','nspcO8ksWP8kmqi','qx7dHCkcuq','DCoYt8ok','zSoXxSoiW57dTmo3W4nfxg8sWRPdWR7cPbddTexcRGdcNg0mzhFNURtORy/LJBNLH6tKUi105A6i6AgobgxcImoF','umoBBmoqW57cUsJdRKniW57cQq','yxaCFmoOc8o4iSk5WQdcP8kL','dNrHWQ3cOs/cNbVdMCkIDCkN','qh4er8o7c8oW','WR02DY3dGmkdWRSpt3HXta','n8oSFCoWta','eLnlW7bVq8oup8kLhIJcHq','57MQ5A6iW7iJ6zE46kYVW6hOR5xPHR/ML7BNUjNLRlm','5Og/6l2f5PYQ57U95AYiW44Q','FmoTwWdcRSo1WQNdO8kolCoXW71J','WPDgDCkUmW','BmojWQ7dOq','WRTSWPtdNW'].concat((function(){return['iIDkkSkwvSkIcCkfWRFcMSkJxq','W4GvrmovW53cO8kQWPi','cSoSxJiXbeZcNwpdKb7dOSoh','zSksp33cULWjkSkpWOlcIKLB','W6RcU3ddHCkqWPLZW4uFpmoAW4W','5y+WiUs/Q+EuOUATQoAuN++/OG','DUACKEMRMoABPU+/Vq','tUI4NUMQSHNdIX/LG5/MMiBVVzDN','W7fZjMFcRmoyWPe','WQP5WOBcHG','5y+HEoADTEECQUAyV++/GG','W7PdWR0nWQC','hgFcNSo3W7ZdGuC','ymowWQ7dOa8','xmkLamoqW6KQWPtcUGvYWQBcMeS','W6b05BE25PwV5B+k77+r5Q+E5zYK5P+56kY3dCkMW6GR5A696AcI77YoWPnBtg8MW7xcJqm'];}()));}()));}());_0x25e6=function(){return _0x5eae07;};return _0x25e6();};const 用户QQ=e['user_id'],用户昵称=e[_0x36169c(0x107,'uIri')][_0x36169c(0x110,'tKp1')],用户群昵称=e['sender'][_0x36169c(0x102,'r(ar')],使用群昵称=e['group_name'],使用群号=e[_0x36169c(0xf0,'wLyO')],{使用次数:userCount,用户信息:userInfo}=userCounts[用户QQ]||{'使用次数':0x0,'用户信息':{}},newCount=userCount+0x1;userCounts[用户QQ]={'使用次数':newCount,'用户信息':{...userInfo,'用户QQ':用户QQ,'用户昵称':用户昵称,'用户群昵称':用户群昵称,'使用群昵称':使用群昵称,'使用群号':使用群号}},fs[_0x36169c(0x103,'LVn4')](使用次数文件夹+'/'+使用次数文件,JSON['stringify'](userCounts,null,'\x09'));const json=JSON['parse'](fs['readFileSync'](dirpath+'/'+filename,_0x36169c(0x108,'LUIt'))),id=e['user_id'];if(json[_0x36169c(0x10d,'jyMl')](id)){const 打开使用次数文件=JSON[_0x36169c(0xec,'fFp#')](fs[_0x36169c(0x116,'u8TZ')](使用次数文件夹+'/'+使用次数文件,_0x36169c(0xf8,'YxVK'))),使用次数=打开使用次数文件[''+id]['使用次数'],文字=_0x36169c(0xfe,'LVn4'),图片=_0x36169c(0x113,'3&5B'),消息=[文字?文字:'',图片?segment[_0x36169c(0xe7,'qXVI')](图片):''];await e[_0x36169c(0xfa,'LUIt')](消息,![],{'recallMsg':0x14},!![]);const Sky_Uid=json[id][_0x36169c(0xe5,'F@Xk')],response=await fetch('https://api.t1qq.com/api/sky/sc/sg?key=uc2WiIfj8iheIVUhdtbMw7Tn6I&cx='+Sky_Uid),data=await response[_0x36169c(0xed,'53Qk')]();if(data[_0x36169c(0x10c,'AeqU')]===0xc8){const {scale,height,maxHeight,minHeight,currentHeight}=data[_0x36169c(0xee,'YxVK')],最高=Math[_0x36169c(0xfc,'53Qk')](maxHeight*0x64)/0x64,最矮=Math['floor'](minHeight*0x64)/0x64,当前=Math[_0x36169c(0x10a,'04up')](currentHeight*0x64)/0x64,Textreply=_0x36169c(0x10b,'YxVK')+scale+_0x36169c(0xf6,'n@0Q')+height+_0x36169c(0xf5,'u8TZ')+最高[_0x36169c(0x10e,'dGVC')](0x3)+_0x36169c(0xf9,'AeqU')+最矮[_0x36169c(0x106,'0rb3')](0x3)+'号\x0a目前身高：'+当前[_0x36169c(0x101,'04up')](0x3)+_0x36169c(0xf4,'sJrS')+使用次数,msg=[segment['at'](e[_0x36169c(0xf7,'0rb3')]),Textreply?Textreply:''];await this['reply'](msg);}else{if(data[_0x36169c(0x112,'3&5B')]===0xc9){const Textreply=_0x36169c(0xe9,'$gcp'),msg=[Textreply?Textreply:''];await this[_0x36169c(0x105,'*n*S')](msg);}}}else await e[_0x36169c(0x111,'xIKG')](_0x36169c(0xea,'8tt&'));var version_ = 'jsjiami.com.v7';
}
}