console.info("Loaded main.js");

// Set variables
var functionDomain = "https://example.azurewebsites.net";

var getKey = function(event) {
    event.preventDefault();
    console.debug("start GetKey");

    var request = new XMLHttpRequest();
    var key = document.getElementById("getkey").value;
    console.debug("Key: " + key)
    request.open('GET', functionDomain + '/api/GetKey?key=' + key, true);
  
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.response);
        console.info(data);
        if (data.data == null) {
          document.getElementById("result").innerHTML = '<div class="alert alert-warning">GET ' + key + ' => No data found</div>';
  
        } else {
          document.getElementById("result").innerHTML = '<div class="alert alert-success">GET ' + key + ' => ' + data.data + '</div>';
        }
      } else {
        document.getElementById("result").innerHTML = '<div class="alert alert-danger">GET ' + key + ' => Something went wrong</div>';
      }
  
      document.getElementById("getredis").reset();
    };
  
    request.send();
};

var setKey = function(event) {
    event.preventDefault();
    console.debug("start SetKey");
  
    var request = new XMLHttpRequest();
    request.open('POST', functionDomain + '/api/SetKey', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    var key = document.getElementById("setkey").value;
    var value = document.getElementById("setvalue").value;
  
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.response);
        console.info(data);
        document.getElementById("result").innerHTML = '<div class="alert alert-info">' + data.data + '</div>';
      } else {
        document.getElementById("result").innerHTML = '<div class="alert alert-danger">Something went wrong</div>';
      }
  
      document.getElementById("setredis").reset();
    };
  
    request.send('{"key":"' + key + '", "value": "' + value + '"}');
  }

var getKeyForm = document.getElementById("getredis");
getKeyForm.addEventListener("submit", getKey, false);

var setKeyForm = document.getElementById("setredis");
setKeyForm.addEventListener("submit", setKey, false);