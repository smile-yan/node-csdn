// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
	webPreferences: {
		nodeIntegration: false
	}
  })

  init();
  listUrl(2);

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
//   mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
global.sharedObject = {
  visitor: 'default value'
}

function init() {
//	nativeObject = yml.load('config.yml');
	// console.log("configData: " + configData.csdn)
	
	//express_demo.js 文件
	var express = require('express');
	var app2 = express();
	const CSDN = "smileyan9";
	const APP_PORT = 9899;
	app2.get('/', function (req, response) {
		response.setHeader("Access-Control-Allow-Origin", "*"); 
		response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
		response.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		response.setHeader("X-Powered-By",' 3.2.1');
		response.setHeader("Content-Type", "text/html"); 
		
		var http = require('https');
		http.get('https://blog.csdn.net/'+CSDN,function(res){
			var data = '';
			res.on('data',function(chunk){
				data += chunk;
			});
			res.on('end',function(){
				var visitor = getOne(data,"<dt>访问：</dt>",5,5);
				// console.log("访问："+visitor);
				var score = getOne(data,"<dt>积分：</dt>",5,4);
				// console.log("积分："+score);
				var place = getOne(data,"<dt>排名：</dt>",60,-48);
				// console.log("排名："+place);
				var content = '{"visitor": "'+visitor+'","score": "'+score+'","place": "'+place+'","csdn":"'+CSDN+'"}';
				response.send(content);
			})
		});  
	})
	 
	function getOne(data, key,left, right) {
		var n1 = data.indexOf(key);
		var visitor = data.substring(n1+36-left,n1+42+right);
		var a1 = visitor.indexOf("\"");
		var a2 = visitor.indexOf("\"",a1+1);
		return visitor.substring(a1+1,a2);
	}

	var server = app2.listen(APP_PORT, function () {
	 
	  var host = server.address().address
	  var port = server.address().port
	 
	 console.log("App start at : http://%s:%s", host, port)
	 
	})
}

function sleep(delay) {
	var start = (new Date()).getTime();
	while ((new Date()).getTime() - start < delay) {
	  continue;
	}
}



