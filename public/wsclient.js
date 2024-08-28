const uri = new URL(window.location.href);
const myUsername = localStorage.getItem('name');
const protocol = uri.host === "localhost:8080" ? "ws" : "wss";
const socket = new WebSocket(  
    `${protocol}://${uri.host}/start_web_socket?username=${myUsername}`, // put username from url
);

socket.onmessage = (m) => {
  // 接続したときの処理
  const data = JSON.parse(m.data);

  switch (data.event) {
    
    // 送ってきた“もの”のイベント類
    case "connected": 
      // Todo: 接続成功した時の処理
      break;

    case "matching-success":
      const pairName = waitingList.get(data.pairName); 
      const pairActive = waitingList.get(data.pairActive); 
      console.log(pairActive);
      // Todo: マッチング成功したときの処理
      window.location.href = "/match.html?name=" + pairName + "?activity=" + pairActive;
      // change page
      break;
    case "send-success":
      // Todo: 送信成功した時の処理
      // Todo: heyhey by ikebou
      
      break;
  }
};

// sendPair(自分の名前、相手の名前、相手の出来事)でサーバに送信する
function sendPair(myName, pairName, pairActive){
  socket.send(
    JSON.stringify({
      event: "matching-request",
      myName: myName,
      pairName: pairName,
      pairActive: pairActive,
    }),
  );
}