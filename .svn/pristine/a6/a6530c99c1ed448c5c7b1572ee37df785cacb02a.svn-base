$(document).ready(function () {
    // $(":input").inputmask();
    /*
            Form
    */
    $(".SerialNumbers").inputmask("99999-999999999");
    $.ajaxSettings.async = false;
    $.getJSON('data/country.json', function (data) {
        for (key in data) {
            var selObj = $("#Country");
            var text = data[key];
            selObj.append("<option value='" + key + "' >" + text + "</option>");
        }
    });
    $.getJSON('data/timezone.php', function (data) {
        for (key in data) {
            var selObj = $("#Timezone");
            var text = data[key];
            selObj.append("<option value='" + key + "' >" + text + "</option>");
        }
    })

    $.getJSON('data/currency.php', function (data) {
        for (key in data) {
            var selObj = $("#Currency_Unit");
            var text = data[key];
            selObj.append("<option value='" + key + "' >" + text + "</option>");
        }
    })
    $("#Country").bind("change", function () {
        v = $("#Country").val();
        $.getJSON('data/state.json', function (data) {
            state = data[v];
            document.getElementById("State").options.length = 0;
            for (i in state) {
                document.getElementById("State").options.add(new Option(i, state[i]));
            }
        })
    });
    $("input[type=radio][name=gateway_type]").bind("change", function () {
        var gateway_type = this.value;
        console.log(gateway_type)
        if(gateway_type == '1') {
            $("#label_gateway").show();
            $("#label-microaddress").hide();
            // $("#SerialNumbers[0]").inputmask("99999-999999999");
            $(".SerialNumbers").inputmask("99999-999999999");
        }
        if(gateway_type == '2') {
            $("#label_gateway").hide();
            $("#label-microaddress").show();
            $(".SerialNumbers").inputmask('remove');
            // $(".SerialNumbers").inputmask('Regex', { regex: "[0-9A-Fa-f]{7}" });
            // $(".SerialNumbers").inputmask('Regex', { regex: "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}" });
        }

    });
    $('.registration-form fieldset:first-child').fadeIn('slow');

    $('.registration-form input[type="text"], .registration-form input[type="password"], .registration-form textarea').on('focus', function () {
        $(this).removeClass('input-error');
    });
    var validator = $("#form1").validate({
        rules: {
            User_Email: {
                email: true,
                required: true
            },
            Install_Email: {
                email: true,
                required: true
            },
            Country: {
                required: true
            },
            State: {
                required: true
            },
            City: {
                required: true
            },
            Street: {
                required: true
            },
            Site_Name: {
                required: true
            },
            SerialNumbers: {
                required: true
            },
            gateway_type: {
                required: true
            },
            Latitude: {
                min: -90,
                max: 90
            },
            Longitude: {
                min: -180,
                max: 180
            }

        },
        errorPlacement: function(error, element) {
            if ( element.is(":radio") )
                error.appendTo( element.parent().next() );
            else if ( element.is(":checkbox") )
                error.appendTo ( element.next() );
            else
                error.appendTo( element.parent());
        },
        messages: {},
        submitHandler: function () {
            var options = {
                type: "post",
                dataType: "json",
                url: "create_site_multi.php",
                cache: "false",
                success: complete,
                error: errorhandel
            };
            // 异步提交登陆请求
            $.blockUI({
                message: 'Please Wait ...',
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5, color: '#fff'
                }
            });
            $("#form1").ajaxSubmit(options);
            // setTimeout(function () { $.unblockUI() }, 1000);
        }
    });

    function complete(data, status) {
        $.unblockUI();
        if (data.sta == 1) {
            alert(data.msg);
            // window.returnValue = { msg:"ok" };
            window.close();
        }
        if (data.sta == 0)
            alert(data.msg);
    }

    function errorhandel() {
        alert('database update error');
        setTimeout(function () {
            $.unblockUI()
        }, 1000);
    }

    var booltimezone = false;
    var boolreg = false;
    //next step
    $('.registration-form .btn-next').on('click', function () {
        var next_step = true;
        if ($("#form1").valid()) {
            next_step = true;
        } else
            next_step = false;


        var parent_fieldset = $(this).parents('fieldset');

        if (next_step) {

            if (!boolreg) {
                var sn_arr = Array();
                $(".SerialNumbers").each(function () {
                    sn_arr.push($(this).val());
                });
                console.log(sn_arr)

                $.ajax({
                    url: 'checksn.php',
                    data: {"SerialNumbers": sn_arr},
                    type: 'post',
                    dataType: 'json',
                    cache: false,
                    async: false,
                    success: function (data, status) {
                        if (data.sta == 1)
                            boolreg = true;
                        if (data.sta == 0) {
                            boolreg = false;
                            alert(data.msg);
                        }
                    }

                })
            }
            if (boolreg) {
                // var sn_arr=Array();
                // $(".SerialNumbers").each(function(){
                // 			sn_arr.push($(this).val());
                // });

                // $.ajax({
                //         url:'get_timezoneinfo.php',
                //         data:{"SerialNumbers":sn_arr},
                //         type:'post',
                //         dataType:'json',
                //         cache: false,
                // 			async: false,
                //         success:function(data){
                //         	booltimezone=true;
                //           for (key in data) {
                // 				$("#"+key).val(data[key]);
                // 		 }
                //         }
                //    		})
                street = $("#Street").val();
                city = $("#City").val();
                state_province = $("#State").val();
                country = $("#Country").val();
                url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + street + "," + city + "," + state_province + "," + country + "&key=AIzaSyBEhqeCc_aSTOAmg0OfSiaXtx0nhZATZQE";
                // alert(url);
                $.getJSON(url, function (data, status) {
                    // console.log(data);
                    if (data.status == "OK") {

                        results = data.results;

                        latlng = results[0].geometry.location;
                        lat = latlng.lat;
                        lng = latlng.lng;
                        if (lat > 0) {
                            $("#Latitude_Name").val("+");
                            $("#Latitude").val(lat);
                        } else {
                            $("#Latitude_Name").val("-");
                            $("#Latitude").val(Math.abs(parseFloat(lat)));

                        }
                        if (lng > 0) {
                            $("#Longitude_Name").val("+");
                            $("#Longitude").val(lng);
                        } else {
                            $("#Longitude_Name").val("-");
                            $("#Longitude").val(Math.abs(parseFloat(lng)));
                        }
                        timezone_url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=1331161200&key=AIzaSyBEhqeCc_aSTOAmg0OfSiaXtx0nhZATZQE";
                        $.getJSON(timezone_url, function (data, status) {
                            if (data.status == "OK") {
                                $("#Timezone").val(data.timeZoneId);
                            } else
                                $("#Timezone").val("UTC");
                        });
                    } else {
                        url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "," + state_province + "," + country + "&key=AIzaSyBEhqeCc_aSTOAmg0OfSiaXtx0nhZATZQE";
                        $.getJSON(url, function (data, status) {
                            if (data.status == "OK") {
                                results = data.results;

                                latlng = results[0].geometry.location;
                                lat = latlng.lat;
                                lng = latlng.lng;
                                if (lat > 0) {
                                    $("#Latitude_Name").val("+");
                                    $("#Latitude").val(lat);
                                } else {
                                    $("#Latitude_Name").val("-");
                                    $("#Latitude").val(Math.abs(parseFloat(lat)));

                                }
                                if (lng > 0) {
                                    $("#Longitude_Name").val("+");
                                    $("#Longitude").val(lng);
                                } else {
                                    $("#Longitude_Name").val("-");
                                    $("#Longitude").val(Math.abs(parseFloat(lng)));
                                }
                                timezone_url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + lng + "&timestamp=1331161200&key=AIzaSyBEhqeCc_aSTOAmg0OfSiaXtx0nhZATZQE";
                                $.getJSON(timezone_url, function (data, status) {
                                    if (data.status == "OK") {
                                        $("#Timezone").val(data.timeZoneId);
                                    } else
                                        $("#Timezone").val("UTC");
                                });
                            } else {
                                $("#Latitude_Name").val("+");
                                $("#Latitude").val(0);
                                $("#Longitude_Name").val("+");
                                $("#Longitude").val(0);
                                $("#Timezone").val("UTC");
                            }
                        })

                    }

                })
                parent_fieldset.fadeOut(400, function () {
                    $(this).next().fadeIn();
                });
            }
            // 	if(boolreg && booltimezone){

            // }
        }


    });

    // previous step
    $('.registration-form .btn-previous').on('click', function () {
        $(this).parents('fieldset').fadeOut(400, function () {
            $(this).prev().fadeIn();
        });
    });

    // submit
    // $('.registration-form').on('submit', function(e) {
    // 	var img=$("#form1 img")[0];
    // 	var postdata=$('#form1').serialize();
    // 	if($("#form1").valid()){
    //    		$.ajax({
    //               cache: false,
    //               type: "POST",
    //               url:'create_site_multi.php',
    //               data:postdata,
    //               async: false,
    //               dataType:'json',
    //               error: function(request) {
    //                   alert("Connection error");
    //               },
    //               success: function(data,status) {
    //                  if(data.sta==1)
    // 							 {
    // 							 		// window.opener =null;
    // 							 		// window.returnValue = { msg:"ok" };
    // 								 	alert(data.msg);

    // 								 // window.close();
    // 							 }
    // 							 if(data.sta==0)
    // 							 	alert(data.msg);
    //               }
    //           });
    // 		}


    // });


    for (var i = -11; i < 14; i++) {
        var selObj = $("#GMT_Offset");
        if (i < 0)
            var text = "GMT" + i + ":00";
        else
            var text = "GMT+" + i + ":00";
        selObj.append("<option value='" + i + "' >" + text + "</option>");
    }
    ;


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
    addButton.live('click', function () {
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
        var gateway_type = $("input[name='gateway_type']:checked").val();
        if(gateway_type == '1') {
            $(".SerialNumbers").inputmask("99999-999999999");
        }
        if(gateway_type == '2') {
            $(".SerialNumbers").inputmask('remove');
        }
        // $(":input").inputmask();
    });

    removeButton.unbind('click');
    removeButton.live('click', function () {
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


    $("#geocoding").live('click', function () {
        street = $("#Street").val();
        city = $("#City").val();
        state_province = $("#State").val();
        country = $("#Country").val();
        url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + street + "," + city + "," + state_province + "," + country + "&key=AIzaSyBEhqeCc_aSTOAmg0OfSiaXtx0nhZATZQE";
        $.getJSON(url, function (data, status) {
            // console.log(data);
            if (data.status == "OK") {
                results = data.results;

                latlng = results[0].geometry.location;
                lat = latlng.lat;
                lng = latlng.lng;
                if (lat > 0) {
                    $("#Latitude_Name").val("+");
                    $("#Latitude").val(lat);
                } else {
                    $("#Latitude_Name").val("-");
                    $("#Latitude").val(Math.abs(parseFloat(lat)));

                }
                if (lng > 0) {
                    $("#Longitude_Name").val("+");
                    $("#Longitude").val(lng);
                } else {
                    $("#Longitude_Name").val("-");
                    $("#Longitude").val(Math.abs(parseFloat(lng)));
                }
            } else {
                $("#Latitude_Name").val("+");
                $("#Latitude").val(0);
                $("#Longitude_Name").val("+");
                $("#Longitude").val(0);

            }

        })
    });
});
