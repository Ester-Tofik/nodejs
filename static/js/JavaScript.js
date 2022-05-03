//lesson 2
function a() {
fetch("https://localhost:44367/api/First")
    .then(res => { res.text() })
    .then(data => document.getElementById("user").innerText="wellcom: "+ data)
    .catch(alert("faild"));}