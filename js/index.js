
$(document).ready(function(){


var root = "http://rest.learncode.academy/api/learncode/friends/";

//select2模块
$("select").select2({
  placeholder:'选择账号类型'
  
});
//select2结束

//赋值
$content = $('#content');
$number = $('#number');
$name = $('#name');
$note=$('#note')

//var orderTemplate = $('#order-template').html();
var day=moment().format('L');   //获得当前时间值

$("#time").html(day);            


/*post 到服务器开始*/

$('#add-order').on('click', function() {
	var type=$('select').val();
	var day=moment().format('L')
	
    var order = {
    number: $number.val(),
    name: $name.val(),
    note:$note.val(),
	type:type,
	day:day

  };
  var a=Number($number.val());
 
  if(!isNaN(a)&&a!=0)
  {
     function checkNum(a)
    {
	var check=0;
    $.ajax({
    type: 'GET',
    url: root,
	async:false,
    success: function(content) {
	for(var i=0;i<content.length;i++)
	{
	if(a==Number(content[i].number))
	{
		alert("该编码已被占用，请输入其他编码");
		check=1;
		
	}
	
	}
	
	
	}
	});
	return check;
	}
    
    
 if((checkNum(a))==0)
 {
 //if(checkNum(a)==0)
   //{
  $.ajax({
    type: 'POST',
    data: order,
    url: root,
    success: function(data) {
      alert("您已成功添加账户");
    },
    error: function(e) {
      console.log('error adding');
    }
  });
  }
    
  }
  
  else{
    alert("请输入数字编码")
    
  }
  
});

/*post 结束*/

function listOrders() {
  $.ajax({
    type: 'GET',
    url: root,
    success: function(content) {
      $.each(content, function(i, data) {
        appendOrder(data);
      });
    },
    error: function(e) {
      console.log("Error in listing");
    }
  });
}

listOrders();

// Method two with then. This is easier to remember and read.
/*  
$.ajax({
  url:root + '/posts',
  method:'GET'
}).then(function(data) {
  $.each(data, function(i, datum) {
    //console.log(datum.title);
    $content.append('<li>Title' + datum.title + '<br/>' + datum.body +'</li>');
  })
});

*/

$content.delegate('.remove', 'click', function() {
  var self = $(this);
  var $li = self.closest('li');
  //console.log(self.attr('data-id'));

  $.ajax({
    type: 'DELETE',
    url: root + self.attr('data-id'),
    success: function() {
      $li.fadeOut(500, function() {
        $(this).remove();
      });
    }
  });
});

$content.delegate('.editOrder', 'click', function() {
  var self = $(this);
  var $li = self.closest('li');
  $li.find('input.number').val($li.find('span.number').html());
  $li.find('input.name').val($li.find('span.name').html());
  $li.find('input.note').val($li.find('span.note').html());
  
  
  $li.addClass('edit');

});

$content.delegate('.cancelEdit', 'click', function() {
  $(this).closest('li').removeClass('edit');
});

$content.delegate('.saveEdit', 'click', function() {
  var self = $(this);
  var $li = $(this).closest('li');
  var order = {
    number: $li.find('input.number').val(),
    name: $li.find('input.name').val(),
    note: $li.find('input.note').val()
  };
  console.log($li.attr('data-id'));
  $.ajax({
    type: 'PUT',
    url: root + $li.attr('data-id'),
    data: order,
    success: function() {
      $li.find('span.number').html(order.number);
      $li.find('span.name').html(order.name);
      $li.find('span.note').html(order.note);
      $li.removeClass('edit');
    },
    error: function(e) {
      console.log("Error updating" + e);
    }
  });

});


});