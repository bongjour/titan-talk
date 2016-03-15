$(document).ready(function() {

  var ChatBox = React.createClass({

    getInitialState : function() {
      return {
        messages : []
      }
    },

    // DOM이 그려진후 호출 오직 한 번만.
    // 그려질때는 willMount
    componentDidMount : function() {
      this._socket = io.connect();

      this._socket.on('message', function(data) {
        this.setState(function(prevState) {
          prevState.messages.push(data);
          return prevState;
        });
      }.bind(this));
    },

    componentDidUpdate : function() {
      var $container = $(".container");
      $container.scrollTop($container.height());
    },

    onSendMessage : function(data) {
      this._socket.emit('message', data);
    },

    render : function() {
      return (
        <div className="container">
            <div id="content">
            {this.state.messages.map(function(data) {
              return (
                <ChatContent data={data} />
              );
            })}
            </div>
            <ChatInput onSend={this.onSendMessage}/>
        </div>
      );
    }
  });

  var ChatContent = React.createClass({
    render : function() {
      return (
        <div className="Area">
          <div className="L">
            <img src={this.props.data.avatar}/>
            <div className="tooltip">{this.props.data.name}</div>
            </div>
          <div className="text R textR">{this.props.data.message}</div>
        </div>
      );
    }
  });

  var ChatInput = React.createClass({
      getInitialState : function() {
        return {
          message : "",
          opacity: 0
        };
      },

      onChange : function(event) {
        this.setState({
          message : event.target.value
        });
      },

      sendMessage : function() {
        if(!this.state.message.trim()) {
          this.setState({
            opacity: 1
          });
          return;
        }

        this.props.onSend({
          message : this.state.message,
          name : 'dante',
          avatar : 'https://hub.coupang.net/jsp/org/view/ViewPicture.jsp?user_id=001004405'
        });

        this.setState({
          message : "",
          opacity : 0

        });
      },

      render : function() {
        return (
          <div className="Area">
              <textarea placeholder="메시지를 입력 하세요." value={this.state.message} onChange={this.onChange}></textarea>
              <input type="button" onClick={this.sendMessage} value="전송"/>
              <div className="validation" style={{opacity: this.state.opacity}}>메시지를 입력하세요.</div>
              <br/>
          </div>
        )
      }
  });


  ReactDOM.render(
    <ChatBox />,
    document.getElementById('chatBox')
  );
});
