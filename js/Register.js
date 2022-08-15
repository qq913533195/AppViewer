
 $(document).ready(function () { 	
 		var addButton = $('input[type="button"]._dynamic.action.add');
		var removeButton = $('input[type="button"]._dynamic.action.remove');
		function getlang(){
			var lang=$("#lang").val();
	 		file="register.php";
			$.getJSON('lang.php', {lang:lang,file:file},function(data) {
				for(key in data)
		 		{
		 			$("#"+key).html(data[key]);
		 		}
		 		$("#Add").val(data["Add"]);
		 		$("#Remove").val(data["Remove"]);
		 		$("#submit").val(data['submit']);
		 		for(k in data['Temperature_Unit'])
		 		{
		 			$("#Temperature_Unit").append("<option value='"+k+"' >"+data['Temperature_Unit'][k]+"</option>"); 
		 		}
		 		
			});	 
		}
 		
		 var validator = $("#form1").validate({
				rules: {
					Email: {
						required: true,							
						remote:{
							url: "checkform.php",     //后台处理程序 
							type: "post",               //数据发送方式
							dataType: "json",           //接受数据格式   
							data: {                     //要传递的数据
									Email: function() {
										return $("#Email").val();
								 }
							}
						}		
					},
				Certification:
				{
					required: true,
					equalTo:"#code"
				},
				Password: {
						required: true				
					},
				pwd2: {
						required: true,	
						equalTo: "#Password"
					},
				City:{
						required: true
					},
				State:{
					required: true
				},
				Country:{
					required: true
				},
				ZipCode:{
					required: true
				}
			},
			messages: {
				
			},
			submitHandler: function() {
				var options = {  
					type : "post",  
					dataType : "json",  
					url : "saveform.php",  
					cache : "false", 
					success : complete,  
					error : errorhandel  
				};  
			// 异步提交登陆请求  
				$.blockUI({ message: 'Please Wait ...',
									css: { 
									border: 'none', 
									padding: '15px', 
									backgroundColor: '#000', 
									'-webkit-border-radius': '10px', 
									'-moz-border-radius': '10px', 
									opacity: .5, color: '#fff' 
							} });
				$("#form1").ajaxSubmit(options);
				 // setTimeout(function () { $.unblockUI() }, 1000);
			}
		
		});
		function complete(data,status){
			 $.unblockUI();
			 if(data.sta==1){
			 	alert(data.msg);
			 	window.location.href="http://nepviewer.com/sola/login.php";
			 }
			 if(data.sta==0)
			 	alert(data.msg);
		}
		function errorhandel()
		{		
			alert('error');
		}
		function initForm()
		{
			$.getJSON('data/country.json',function(data){ 
				for (key in data) {
					var selObj = $("#Country");  
					var text=data[key]; 
					selObj.append("<option value='"+key+"' >"+text+"</option>");    		
				 }
			})
			$.getJSON('data/timezone.json',function(data){ 
				for (key in data) {
					var selObj = $("#Timezone");  
					var text=data[key]; 
					selObj.append("<option value='"+key+"' >"+text+"</option>");    		
				 }
			})
		}
		// initForm();	

		$("#Country").bind("change",function(){
				v= $("#Country").val();
				$.getJSON('data/state.json',function(data){ 
					state=data[v];
					document.getElementById("State").options.length=0; 
					for(i in state ){				
						document.getElementById("State").options.add(new Option(state[i],i ));
				}
			})
		});		
		showsite();	
		$(".User_Type").change(function() {
					showsite();	

			});
		function showsite(){
			var $selectedvalue = $("input[name='User_Type']:checked").val();
			var html="";
			if($selectedvalue=="0" ||$selectedvalue=="")
			{
				// html="<table width=\"100%\"  border=\"0\"  cellpadding=\"0\">";
				html="<tr><td class=\"required inputtitle\"><span id=\"Plant_Name\"></span> </td><td><input type=\"text\" name=\"Site_Name\" id=\"Site_Name\" value=\"\" class=\"required\"></td></tr>";			
				html+="<tr><td class=\"required inputtitle\"><span id=\"Latitude_Name\"></span></td><td><input type=\"text\" name=\"Latitude\" value=\"\" class=\"required\"></td></tr>";
				html+="<tr><td class=\"required inputtitle\"><span id=\"Longitude_Name\"></span></td><td><input type=\"text\" name=\"Longitude\" value=\"\" class=\"required\"></tr>";
				html+="<tr><td class=\"inputtitle\"><span id=\"Timezone_Name\"></span></td><td>  <select name=\"Timezone\" id=\"Timezone\"></select></td></tr>";
				html+="<tr><td class=\"inputtitle\"><span id=\"Temperature_Unit_Name\"></span></td><td><select name=\"Temperature_Unit\" id=\"Temperature_Unit\"></select></td></tr>";
				html+="<tr><td class=\"required inputtitle\"><span id=\"Plant_Power_Name\"></span></td><td><input type=\"text\" name=\"Plant_Power\" value=\"\" class=\"required\"></td></tr>";
				html+="<tr><td class=\"inputtitle required\" ><span id=\"Currency_Unit_Name\"></span></td><td><select name=\"Currency_Unit\" id=\"Currency_Unit\"><option value=\"USD\">USD</option><option value=\"EURO\">EURO</option><option value=\"CNY\">CNY</option><option value=\"AUD\">AUD</option><option value=\"JPY\">JPY</option></select><input class=\"required\" type=\"text\" id=\"Local_electricPrice\" name=\"Local_electricPrice\"  size=\"20\" value=\"\" >/1 kWh</td></tr>";
				html+="<tr><td class=\"required inputtitle\"><span id=\"Installer_Name1\"></span></td><td><input id=\"Installer\" name=\"Installer\" value=\"\" type=\"text\" class=\"required\"></td></tr>";
				html+="<tr><td class=\"required inputtitle\"><span id=\"Installer_Email_Name\"></span></td><td><input id=\"Install_Email\" name=\"Install_Email\" value=\"\" type=\"text\" class=\"required\"></td></tr>";
					html+="<tr><td class=\"required inputtitle\"><span id=\"Location_Name\"></span></td><td><input id=\"Location\" name=\"Location\" value=\"\" type=\"text\" class=\"required\"></td></tr>";
				html+="<tr><td class=\"inputtitle\"><span id=\"Upload_Image_Name\"></span> </td><td><input id=\"fileToUpload\" type=\"file\" size=\"45\" name=\"fileToUpload\" class=\"input\"><button type=\"button\" id=\"buttonUpload\" ><span id=\"Upload_Button_Name\"></span></button></td></tr>";
				html+="<tr><td>&nbsp;</td><td><img src=\"\" alt=\"\" id=\"PlantImagePreview\" height=\"61\"><input name=\"PlantImageAttachmentId\" id=\"PlantImageAttachmentId\" value=\"-1\" type=\"hidden\"><input name=\"Sid\" id=\"Sid\" value=\"-1\" type=\"hidden\"></td></tr>";
				html+="<tr id=\"SNContainer\"><td class=\"required inputtitle\"><span id=\"Gateway_SN_Name\"></span></td><td><div><input value=\"\" id=\"Add\" class=\"_dynamic add action\" data-for=\"SerialNumbers\" type=\"button\" ><input value=\"\" class=\"_dynamic remove action hidden\" data-for=\"SerialNumbers\" type=\"button\" id=\"Remove\"><br><input name=\"SerialNumbers[0]\" id=\"SerialNumbers[0]\" class=\"_dynamic first SerialNumbers required\"  value=\"\" type=\"text\" data-inputmask=\"'mask': '99999-999999999'\"><script type=\"text/javascript\"> $(\":input\").inputmask(); </script></div></td></tr>";
				 html+="<tr><td colspan=2><input type=\"submit\" name=\"submit\" id=\"submit\"  value=\"\">  </td></tr>";
				// html+="</table>";
				// alert($selectedvalue);
				// $("#table tr:eq(10)").after(html);;
				 $("#sitetable").empty().html(html);
				 initForm();
				 getlang();
			}
				
			if($selectedvalue=="1" ||$selectedvalue=="2")
			{
				html="<tr><td colspan=2><input type=\"submit\" name=\"submit\" id=\"submit\"  value=\"\">  </td></tr>";
				$("#sitetable").empty().html(html);
				getlang();
			}						
		}	

		

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
				$(this).parent().parent().append(newElementContainer);         
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

	 $("#sendcode").live('click', function(event) {
	 	var email=$("#Email").val();
	 	if(email=="")
	 		alert("please input Email!");
	 	else{
	 		// var email=encodeURIComponent("9067211@qq.com");
		 	var url= "http://"+window.location.host+"/nep/password/send_code/"+encodeURIComponent(email);
		 	 $.getJSON(url,function(data){
		 	  if(data.status=="1"){		 	  	
		 	  	$("#code").val(data.data);
		 	  }
		 	  alert(data.info);
		 	 });
	 	}
	 
	 		// var url=<?php echo  $_SERVER['SERVER_NAME']; ?>;
	 		// alert(url);
	 });
	 $("#buttonUpload").live('click', function() {	
				// $("#loading")
		// .ajaxStart(function(){
		//   $(this).show();
		// })
		// .ajaxComplete(function(){
		//   $(this).hide();
		// });
		pre=$('#Country').val();
		if(pre=="")
			alert('please choose country');
		else
		{
			$.ajaxFileUpload
			({
					url:'upload.php',
					secureuri:false,
					fileElementId:'fileToUpload',
					dataType: 'json',
					data:{Pre:$('#Country').val()},
					success: function (data, status)
					{

						if(typeof(data.error) != 'undefined')
						{
							if(data.error != '')
							{
								alert(data.error);
							}else
							{								
								$("#PlantImagePreview").attr("src", data.filepath); 
								$("#PlantImageAttachmentId").val(data.filepath);
								$("#Sid").val(data.sid);
							}
						}
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				})
			}
		return false;
		});	 
});

