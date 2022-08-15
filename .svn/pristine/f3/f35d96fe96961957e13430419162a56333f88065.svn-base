
function createPvList(result,callback)
{
	// var rowHtml ='<ul class="aui-list aui-media-list">';
	// alert(JSON.stringify(localization));
	var rowHtml='';
	var datas=result.list;

	for(i=0;i<datas.length;i++)
	{
		var params={};

        for (j in datas[i])
        {
            params[j]=escape(datas[i][j]);
        }
         // alert(JSON.stringify(datas[i]));
        // var params={sid:datas[i].Sid,sitename:escape(datas[i].Site_Name),street:escape(datas[i].Street),city:escape(datas[i].City),state:escape(datas[i].State),country:escape(datas[i].Country),};
		// alert(JSON.stringify(params));
		rowHtml +='<li class="aui-list-item" tapmode onclick=openWin("pvdetail",'+JSON.stringify(params)+')>';

		// rowHtml +='<li class="aui-list-item" tapmode onclick=openDeail('+JSON.stringify(params)+')>';
		rowHtml += '<div class="aui-media-list-item-inner"   >';
		rowHtml += '<div class="aui-list-item-media"><img class="img_icon" src="'+datas[i].Logo+'"></div>';
		rowHtml += '<div class="aui-list-item-inner">';
		rowHtml += '<div class="aui-list-item-title item-text-nowrap">'+datas[i].Site_Name+'</div>';
		rowHtml += '<div class="item-text item-text-nowrap">'+localization.sid+':'+datas[i].Sid+'</div>';
		rowHtml += '<div class="item-text item-text-nowrap">'+localization.user+':'+datas[i].User_Email+'</div>';
		rowHtml += '<div class="item-text item-text-nowrap">'+localization.installer+':'+datas[i].Install_Email+'</div>';
		var gatways=datas[i].Gateways;
		for(j=0;j<gatways.length;j++)
		{
			if(j==0)
				rowHtml += '<div class="item-text item-text-nowrap">'+localization.sn+':'+gatways[j]+'</div>';
			else
				rowHtml += '<div class="item-text item-text-nowrap aui-padded-l-20">'+gatways[j]+'</div>';
			// rowHtml +=gatways[j]+'<br>';

		}
		rowHtml += '</div>';
		rowHtml += '</div>';
		rowHtml += '</li>';

	}

	var page=result.page;
	var totalpage=result.totalpage;



	if(page==1)
		$api.html($api.dom('.aui-list'), rowHtml);
	else
	{
		$api.append($api.dom('.aui-list'), rowHtml);
	}
	// if(page<totalpage)
	// 	rowHtml += '<div id="more" class="more aui-text-center" onclick="loadData(function(data){})">ajaxGetMore</div>';
	if(page<totalpage)
	{
		var nextpage=parseInt(page)+1;
		$api.val($api.byId('page'), nextpage);
		// $api.removeCls($api.byId('more'), 'aui-hide');
	}
	// else
	// 	$api.addCls($api.byId('more'), 'aui-hide');
	// alert(rowHtml);
	callback(rowHtml);
}



function openDeail(pv)
{
    alert(JSON.stringify(pv));
    // openWin("pvdetail",{});
}

