import os

from flask import Flask , request , session 
from flask_socketio import SocketIO, emit



app = Flask(__name__)
app.config["SECRET_KEY"] = "sdfsdfssefe"
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def index():
    return "Server is Running...."

clients = {}  

@socketio.on("connect")
def on_connect():
    print("Client connected")
    
@socketio.on("join" , namespace="/join")
def on_join(name):
    print("client joined",name) 
    # clients.append({name: request.sid})
    clients[name] = request.sid
    print(clients)  


@socketio.on('location', namespace="/join")
def handle_message(data,name):
    print(clients)
    print(data)
    print('recieved from ',name)
    sessionId = clients[name]
    emit("new-location", data , room = sessionId)
    print("send to : ", sessionId)
    
    
if __name__ == '__main__':
    print("running")
    socketio.run(app)