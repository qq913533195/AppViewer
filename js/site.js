
$(function () {  
	$(":input").inputmask();
	$.ajaxSettings.async = false;
	
	$('.site-form fieldset:first-child').fadeIn('slow');
	$('.site-form input[type="text"], .site-form input[type="password"], .site-form textarea').on('focus', function() {
			$(this).removeClass('input-error');
	});		


	$("#site_form").validate({
			rules: { 
				User_Email:{
					email:true,
					required: true
				},
				Install_Email:{
					email:true,
					required: true
				},
				Country:{
					required: true
				},
				State:{
					required: true
				},
				City:{
          required: true
        },
        Street:{
          required: true
        },
			 	Site_Name:{
					required: true
				},
				SerialNumbers:{
					required: true
				},					
				Latitude:{
					min:-90,
					max:90
				},
				Longitude:{
					min:-180,
					max:180
				}

			}		
	});
	var booltimezone=false;
	var boolreg=false;
	$('.site-form .btn-next').on('click', function() {
		var parent_fieldset = $(this).parents('fieldset');
		var next_step = true;
			if($("#form1").valid()){
     		next_step=true;
 			}
 			else
 				next_step=false;

		parent_fieldset.fadeOut(400, function() {
			$(this).next().fadeIn();
		});
	})

	$('.site-form .btn-previous').on('click', function() {
		$(this).parents('fieldset').fadeOut(400, function() {
			$(this).prev().fadeIn();
		});
	});


	var addButton = $('input[type="button"]._dynamic.action.add');
	var removeButton = $('input[type="button"]._dynamic.action.remove');

	var getLatestIndex = function (groupName) {
			var result = 0;
			while (true) {
					var nextSelector = $('input[type="text"].' + groupName + '[name="' + groupName + '[' + (result + 1) + ']"]');
					if (nextSelector == undefined || nextSelector.length == 0) {
							return result;
					} else {
							result++;
					}
			}
	};

		addButton.unbind('click');
		addButton.live('click', function() {
				var groupName = $(this).data('for');
				var lastIndex = getLatestIndex(groupName);
				var last = $('input[type="text"].' + groupName + '[name="' + groupName + '[' + lastIndex + ']"]');
				var newElement = $(last[0]).clone();
				newElement.val('');
				newElement.attr('name', groupName + '[' + (lastIndex + 1) + ']');
				newElement.attr('id', groupName + '[' + (lastIndex + 1) + ']');
				var newElementContainer = $('<div/>');
				newElementContainer.append(newElement);
				$(this).parent().append(newElementContainer);         
				if (lastIndex == 0) {
						removeButton.show();
				}
			 $(":input").inputmask(); 
		});

		removeButton.unbind('click');
		removeButton.live('click', function() {
				var groupName = $(this).data('for');          
				var lastIndex = getLatestIndex(groupName);
				if (lastIndex == 0) {
						return;
				}
				if (lastIndex == 1) {
						$(this).hide();
				}
				var last = $('input[type="text"].' + groupName + '[name="' + groupName + '[' + lastIndex + ']"]');
				last.remove();
		});


	$.getJSON('data/country.json',function(data){ 
			for (key in data) {
				var selObj = $("#Country");  
				var text=data[key]; 
				selObj.append("<option value='"+key+"' >"+text+"</option>");        
			 }
		}) ;
		$.getJSON('data/timezone.php',function(data){ 
					for (key in data) {
						var selObj = $("#Timezone");  
						var text=data[key]; 
						selObj.append("<option value='"+key+"' >"+text+"</option>");    		
					 }
		})
		 $("#Country").bind("change",function(){
        v= $("#Country").val();
        $.getJSON('data/state.json',function(data){ 
          state=data[v];
          document.getElementById("State").options.length=0; 
          for(i in state ){       
            document.getElementById("State").options.add(new Option(i, state[i]));
        }
      })
    });   
});
