$(document).ready(function() {

  var socket = io.connect();

  socket.on('message', function(data) {
    var output = '';
    output += '<div class="Area">';
    output += ' <div class="L">';
    output += '   <img src="https://hub.coupang.net/jsp/org/view/ViewPicture.jsp?user_id=001004405"/>';
    output += '   <div class="tooltip">Sami Massadeh - 28 Years<br/>Doctor <br/>Jordan</div>';
    output += ' </div>';
    output += ' <div class="text R textR"> ' + data.message.replace(/\n/g, "<br />") + '</div>'
    output += '</div>';

    $(output).appendTo('#content');

  });

  $('#sendButton').click(function() {
    var message = $('#message').val();
    if(message === '') {
      $(".validation").animate({'height': '16px'}, 500).show();
      return;
    }
    $(".validation").animate({'height': '0px'}, 500).hide();
    socket.emit('message', {
      message : $('#message').val()
    });
    $('#message').val('');
    //$('.container').find('scroll');
  });
});
