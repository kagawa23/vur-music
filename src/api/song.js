import axios from 'axios'

let _uid = ''
function genUrlMid (mids, types) {
  function getUid () {
    if (_uid) {
      return _uid
    }
    if (!_uid) {
      const t = new Date().getUTCMilliseconds()
      _uid = '' + ((Math.round(2147483647 * Math.random()) * t) % 1e10)
    }
    return _uid
  }
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}

export function getSongUrl (mids, types) {
  const urlMid = genUrlMid(mids, types)
  const data = {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0
  }
  return axios
    .post('/api/getPurlUrl', {
      comm: data,
      url_mid: urlMid
    })
    .then(res => {
      console.log(res)
      return Promise.resolve(res.data)
      // let infos = res.url_mid.data.midurlinfo
      // songs.forEach((song, index) => {
      //   song.url = `http://dl.stream.qqmusic.qq.com/${info[index].purl}` // 拼接真正有效的url
      // })
    })
}
