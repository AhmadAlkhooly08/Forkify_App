import * as confing from './confing.js'
const timeout = function(s){
    return new Promise(function(_,reject){
        setTimeout(()=>{
            reject(new Error(`Request took too long! Timeout after ${s} second`))
        },s * 1000);
    })
}

// export const getJson = async function (lnk) {
//     try{
//         const res = await Promise.race([fetch(lnk),timeout(confing.TIMEOUT_SEC)]);
//         const data = await res.json();
            
//         if(!res.ok) throw new Error(`${data.message} (${res.status})`);

//         return data;
//     }catch(err){
//         throw err;
//     }
// }
const sendJson = function (uploadData) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // ✅ correct casing
    },
    body: JSON.stringify(uploadData), // ✅ data passed in
  };
};

export const AJAX = async function (lnk, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(lnk, sendJson(uploadData))
      : fetch(lnk);

    const res = await Promise.race([fetchPro, timeout(confing.TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};