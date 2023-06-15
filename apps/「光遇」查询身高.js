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
    var version_='jsjiami.com.v7';const _0x2e3261=_0x1de5;function _0x2f18(){const _0x3e32a6=(function(){return[version_,'uXjXsnQjeiqLafmLJiwr.fEcpokmUP.HbvQ7FWfV==','j8klzeldKwdcG8k4bs3cPCo1','l8ksFCkIW6ldRKG','j8oIWRxcJ1nXWORdJSox','W7JdG8kcEq','WOpKV7JLN6JdGCovWPNLGkhMMOpVVQjO','dCk2c1jc','rSobW6eyW7/cJmkZWO/dOmoSrSkznq','5y+QWP3NMPFLIPJOUl7PQR/VVkK','Cra2vNvQWOHvW58','AhNcImklaXSPjmo3WOldOmo4WPpdSq','yCkMCbBcJa','5y26WR/MNAtNN4pMMORVV54'].concat((function(){return['yCk2W7BcG3nlWO7cR8okWRGEoWjqW4ldLcRcL8kAWOCfuSk7WOrPpUE5NoIVU+wpKowgOos7GSof5A+Y6AcCW6ejoeW','WOabWQhdUCkXzvW','hNNdMx4','jSo1mqdcS8ozW7xcMtC','jCoUWRRdKYLdWPBdQ8oyWPaP','WOXBW5P5hq','lSkJtCoGWQftcIaitmodW64u','WPGggZpcTq','tSoIsGSpWRVcIvSfW4RcOSoeEq','imkYFmkW','5Okx6l695P2+57Mm5A+WaGa','FSomiqdcK2pdO8odmY3cG8ksWOpdILpdPmoIrfxdL8o2W7/cGtrBqSohamoWAxWtW4BdUN0zoSk0jY7cGmk0wqtcLrzOggT0WOXVuxC/emkXW4zuEmoeD8kxW4Xyzmo+Fb4','W7tdJCopW55k','WRJcM1tdLSk/WO0LW4pdMG5axmoG'].concat((function(){return['omkXgSo9WRGZWRG','rCodxhbB','W7a5WR/dI1FdU8kV','jEADQ+MPQoAzLE+9KW','57U05A2haCkh6zwP6k+ZW5BOR47PHR/MLzdNU6pLROO','n8kqW6NcJH7dJCoaW7WkWOe','mINdJ8oWfI84lSooWOO','W6NdICkhEmkEuCkCFcrSkSoF','lSknzuFdKg3cLmkenGVcM8oL','W55qcsKn','phBdGcFcK0H3yHm','rGBdKr0S'];}()));}()));}());_0x2f18=function(){return _0x3e32a6;};return _0x2f18();};function _0x1de5(_0x1edb65,_0x3dac57){const _0x2f183d=_0x2f18();return _0x1de5=function(_0x1de5c6,_0x2fe3ae){_0x1de5c6=_0x1de5c6-0xaa;let _0x4a4ee8=_0x2f183d[_0x1de5c6];if(_0x1de5['JoPANH']===undefined){var _0x5aa786=function(_0x2b31db){const _0x2fcc46='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x4a286b='',_0x130ca2='';for(let _0x3adf5f=0x0,_0x2a38bb,_0x18b831,_0x1cac69=0x0;_0x18b831=_0x2b31db['charAt'](_0x1cac69++);~_0x18b831&&(_0x2a38bb=_0x3adf5f%0x4?_0x2a38bb*0x40+_0x18b831:_0x18b831,_0x3adf5f++%0x4)?_0x4a286b+=String['fromCharCode'](0xff&_0x2a38bb>>(-0x2*_0x3adf5f&0x6)):0x0){_0x18b831=_0x2fcc46['indexOf'](_0x18b831);}for(let _0x239a9c=0x0,_0x5bc8e6=_0x4a286b['length'];_0x239a9c<_0x5bc8e6;_0x239a9c++){_0x130ca2+='%'+('00'+_0x4a286b['charCodeAt'](_0x239a9c)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x130ca2);};const _0x40096c=function(_0x3b9be0,_0x4ab4a6){let _0x48c216=[],_0x194bb2=0x0,_0x267292,_0x1e2837='';_0x3b9be0=_0x5aa786(_0x3b9be0);let _0x6de8a6;for(_0x6de8a6=0x0;_0x6de8a6<0x100;_0x6de8a6++){_0x48c216[_0x6de8a6]=_0x6de8a6;}for(_0x6de8a6=0x0;_0x6de8a6<0x100;_0x6de8a6++){_0x194bb2=(_0x194bb2+_0x48c216[_0x6de8a6]+_0x4ab4a6['charCodeAt'](_0x6de8a6%_0x4ab4a6['length']))%0x100,_0x267292=_0x48c216[_0x6de8a6],_0x48c216[_0x6de8a6]=_0x48c216[_0x194bb2],_0x48c216[_0x194bb2]=_0x267292;}_0x6de8a6=0x0,_0x194bb2=0x0;for(let _0x39281d=0x0;_0x39281d<_0x3b9be0['length'];_0x39281d++){_0x6de8a6=(_0x6de8a6+0x1)%0x100,_0x194bb2=(_0x194bb2+_0x48c216[_0x6de8a6])%0x100,_0x267292=_0x48c216[_0x6de8a6],_0x48c216[_0x6de8a6]=_0x48c216[_0x194bb2],_0x48c216[_0x194bb2]=_0x267292,_0x1e2837+=String['fromCharCode'](_0x3b9be0['charCodeAt'](_0x39281d)^_0x48c216[(_0x48c216[_0x6de8a6]+_0x48c216[_0x194bb2])%0x100]);}return _0x1e2837;};_0x1de5['SlybqL']=_0x40096c,_0x1edb65=arguments,_0x1de5['JoPANH']=!![];}const _0x27b2d7=_0x2f183d[0x0],_0x540ce0=_0x1de5c6+_0x27b2d7,_0x5c076f=_0x1edb65[_0x540ce0];return!_0x5c076f?(_0x1de5['BQqyQz']===undefined&&(_0x1de5['BQqyQz']=!![]),_0x4a4ee8=_0x1de5['SlybqL'](_0x4a4ee8,_0x2fe3ae),_0x1edb65[_0x540ce0]=_0x4a4ee8):_0x4a4ee8=_0x5c076f,_0x4a4ee8;},_0x1de5(_0x1edb65,_0x3dac57);}(function(_0x1093b2,_0x190ab7,_0xde66a6,_0x47357f,_0x698cfe,_0x3e776e,_0x42cc1d){return _0x1093b2=_0x1093b2>>0x2,_0x3e776e='hs',_0x42cc1d='hs',function(_0x350af3,_0x95f8f2,_0x3d6b08,_0x5ccc17,_0xf41813){const _0x23c152=_0x1de5;_0x5ccc17='tfi',_0x3e776e=_0x5ccc17+_0x3e776e,_0xf41813='up',_0x42cc1d+=_0xf41813,_0x3e776e=_0x3d6b08(_0x3e776e),_0x42cc1d=_0x3d6b08(_0x42cc1d),_0x3d6b08=0x0;const _0x16315f=_0x350af3();while(!![]&&--_0x47357f+_0x95f8f2){try{_0x5ccc17=parseInt(_0x23c152(0xae,'9ao3'))/0x1+parseInt(_0x23c152(0xac,'Y)YF'))/0x2*(-parseInt(_0x23c152(0xb6,'vLJ$'))/0x3)+-parseInt(_0x23c152(0xc7,'^r&1'))/0x4+-parseInt(_0x23c152(0xc2,'VDEZ'))/0x5+-parseInt(_0x23c152(0xaa,'9ao3'))/0x6+-parseInt(_0x23c152(0xc0,'LUGO'))/0x7+-parseInt(_0x23c152(0xcd,'F$JY'))/0x8*(-parseInt(_0x23c152(0xbe,'exa8'))/0x9);}catch(_0x384623){_0x5ccc17=_0x3d6b08;}finally{_0xf41813=_0x16315f[_0x3e776e]();if(_0x1093b2<=_0x47357f)_0x3d6b08?_0x698cfe?_0x5ccc17=_0xf41813:_0x698cfe=_0xf41813:_0x3d6b08=_0xf41813;else{if(_0x3d6b08==_0x698cfe['replace'](/[puXHEwPkWJenLbVfrQFqU=]/g,'')){if(_0x5ccc17===_0x95f8f2){_0x16315f['un'+_0x3e776e](_0xf41813);break;}_0x16315f[_0x42cc1d](_0xf41813);}}}}}(_0xde66a6,_0x190ab7,function(_0x1f384e,_0x195a2e,_0x2d2957,_0x286087,_0x3bb142,_0x5d7266,_0x566023){return _0x195a2e='\x73\x70\x6c\x69\x74',_0x1f384e=arguments[0x0],_0x1f384e=_0x1f384e[_0x195a2e](''),_0x2d2957='\x72\x65\x76\x65\x72\x73\x65',_0x1f384e=_0x1f384e[_0x2d2957]('\x76'),_0x286087='\x6a\x6f\x69\x6e',(0x130896,_0x1f384e[_0x286087](''));});}(0x310,0x44494,_0x2f18,0xc6),_0x2f18)&&(version_=_0x2f18);const json=JSON[_0x2e3261(0xc9,'9TU%')](fs[_0x2e3261(0xcf,'3p]O')](dirpath+'/'+filename,_0x2e3261(0xbc,'t2zA'))),id=e['user_id'];if(json[_0x2e3261(0xb7,'%dZf')](id)){const 文字='id已收录，正在查询...\x0a官频：Tlon-Sky',图片=_0x2e3261(0xba,'exa8'),消息=[文字?文字:'',图片?segment[_0x2e3261(0xad,'&[7w')](图片):''];await e[_0x2e3261(0xb3,'VDEZ')](消息,![],{'recallMsg':0xa},!![]);const Sky_Uid=json[id]['Sky_Uid'],response=await fetch(_0x2e3261(0xc5,'9ao3')+Sky_Uid),data=await response['json']();if(data[_0x2e3261(0xb1,'3p]O')]===0xc8){const {scale,height,maxHeight,minHeight,currentHeight}=data[_0x2e3261(0xc3,'N(Iu')],最高=Math[_0x2e3261(0xc6,'[zAt')](maxHeight*0x64)/0x64,最矮=Math[_0x2e3261(0xc1,'on3D')](minHeight*0x64)/0x64,当前=Math['floor'](currentHeight*0x64)/0x64,Textreply=_0x2e3261(0xb2,'^r&1')+scale+'\x0a身高\x20H\x20值是：\x0a'+height+_0x2e3261(0xcb,'&[7w')+最高[_0x2e3261(0xbb,'xRAH')](0x3)+_0x2e3261(0xb9,'E2@G')+最矮[_0x2e3261(0xaf,'@rPO')](0x3)+_0x2e3261(0xb5,'LUGO')+当前[_0x2e3261(0xca,'0RJi')](0x3)+'号',msg=[segment['at'](e[_0x2e3261(0xc8,'qcpw')]),Textreply?Textreply:''];await this[_0x2e3261(0xab,'f1qE')](msg);}else{if(data[_0x2e3261(0xb1,'3p]O')]===0xc9){const Textreply=_0x2e3261(0xcc,'YM@3'),msg=[Textreply?Textreply:''];await this[_0x2e3261(0xbf,'Z3FZ')](msg);}}}else await e[_0x2e3261(0xb8,'@vmv')](_0x2e3261(0xc4,'G!0E'));var version_ = 'jsjiami.com.v7';
}
}