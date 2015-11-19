function init(e){
    $('<div class="modal-backdrop custom_backdrop"><img src="http://kodekloud.s3.amazonaws.com/sites/554a79236e6f64713f000000/69e8cd982124dc73de1f5a67a627ee75/loading.gif" class="" alt=""></div>').appendTo(document.body);
    
    
    $(window).scroll(function(e){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
    //Click event to scroll to top
	$('.scrollToTop').click(function(e){
		$('html, body').animate({scrollTop : 0},800);
		e.preventDefault();
	});
	
	$('.accordion_header').click(function(e){
        $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
	});
	
	if ($('#instafeed').length > 0) {
        var feed = new Instafeed({
            get: 'user',
            userId: '1285623815',
            clientId: 'da5cf03899eb49a496424d9a76bafa0d',
            template: '<a class="ig-image" target=_blank href="{{link}}" title="{{caption}}" ><img src="{{image}}" /></a>',
            limit : 12,
            resolution:'low_resolution'
    
        });
    
        feed.run();
    }
    blog_searcher();
}


function show_content(){
    $('.yield').fadeIn();
    $(".modal-backdrop").remove();
    var windowWidth = $(window).width();
    if(windowWidth <= 1024) {
         $('.panel-collapse').removeClass('in')
    }
}

function show_cat_stores(){
    $('.show_cat_stores').click(function(e){
        var cat_id = $(this).attr('data-id');
        $('.active_cat').removeClass('active_cat');
        $(this).addClass('active_cat');
        var rows = $('.cats_row');
        rows.hide();
        $('.store_initial').hide();
        $('#cat_name').text($(this).text());
        $('#cat_name').css('display', 'block');
        $.each(rows, function(i, val){
            var cat_array = val.getAttribute('data-cat').split(',');
            if ($.inArray(cat_id, cat_array) >= 0){
                $(val).show();
            }
        });
        e.preventDefault();
    });
    $('.show_all_stores').click(function(e){
        $('.active_cat').removeClass('active_cat');
        $(this).addClass('active_cat');
        var rows = $('.cats_row');
        rows.show();
        $.each($('.store_initial'), function(i, val){
           if ($(val).text().length > 0){
               $(val).show();
           } 
        });
        $('#cat_name').hide();
        e.preventDefault();
    });
    
}

function jobs_filter(){
    $('.filter_jobs').click(function(e){
        var filter_id = $(this).attr('data-id');
        $('.active_filter').removeClass('active_filter');
        $(this).addClass('active_filter');
        $('#current_filter').text($(this).text());
        var rows = $('.filter_row');
        if (filter_id == "all"){
            rows.show();
        } else{
            rows.hide();
            $.each(rows, function(i, val){
                var filter_array = val.getAttribute('data-job-type').split('/');
                if ($.inArray(filter_id, filter_array) >= 0){
                    $(val).show();
                }
            });
        }
    });
}

function get_day(id){
    switch(id) {
        case 0:
            return ("Sunday");
            break;
        case 1:
            return ("Monday");
            break;
        case 2:
            return ("Tuesday");
            break;
        case 3:
            return ("Wednesday");
            break;
        case 4:
            return ("Thursday");
            break;
        case 5:
            return ("Friday");
            break;
        case 6:
            return ("Saturday");
            break;
    }
}


function convert_hour(d){
    
    var h = (d.getUTCHours());
    var m = addZero(d.getUTCMinutes());
    var s = addZero(d.getUTCSeconds());
    if (h >= 12) {
        if ( h != 12) {
            h = h - 12;    
        }
        
        i = "pm"
    } else {
        i = "am"
    }
    return h+":"+m+" "+i;
}



function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function get_month (id){
    var month = "";
    switch(id) {
        case 0:
            month = "Jan";
            break;
        case 1:
            month = "Feb";
            break;
        case 2:
            month = "Mar";
            break;
        case 3:
            month = "Apr";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "Jun";
            break;
        case 6:
            month = "Jul";
            break;
        case 7:
            month = "Aug";
            break;
        case 8:
            month = "Sep";
            break;
        case 9:
            month = "Oct";
            break;
        case 10:
            month = "Nov";
            break;
        case 11:
            month = "Dec";
            break;
            
    }
    return month;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function drop_pin(id){
    map.marksHide();
    var coords = map.get_coords(id);
    var height = parseInt(coords["height"]);
    var width = parseInt(coords["width"]);
    var x_offset = (parseInt(width) / 2);
    var y_offset = (parseInt(height) /2);
    map.setMarks([{ xy: [coords["x"] - 46 + x_offset, coords["y"] - 110 + y_offset],
        attrs: {
            src:  'http://assets.codecloudapp.com/sites/562a661e6e6f64426b000000/image/png/1446749946000/pin.png'
        }
    }]);
}

function load_map(reg, store_details){
    this_region = {};
    this_region = store_details.svgmap_region;
    map = $('#mapsvg_store_detail').mapSvg({
        source: getSVGMapURL(),    // Path to SVG map
        colors: {stroke: '#aaa', hover: 0, selected: '#EF4D86'},
        disableAll: true,
        height:335,
        width:848,
        regions: reg,
        tooltipsMode:'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': false,'location': 'left' },
        pan:true,
        cursor:'pointer',
        responsive:true,
        zoomLimit: [0,10],
        viewBox:[420,420,1650,1650]
    });
    map.setViewBox(store_details.svgmap_region);
    map.selectRegion(store_details.svgmap_region);
    drop_pin(store_details.svgmap_region);
}

function init_map(reg){
    map = $('#mapsvg').mapSvg({
        source: getSVGMapURL(),    // Path to SVG map
        colors: {stroke: '#aaa', hover: '#EF4D86'},
        disableAll: true,
        height:800,
        width:1140,
        regions: reg,
        tooltipsMode:'custom',
        loadingText: "loading...",
        zoom: true,
        zoomButtons: {'show': true,'location': 'right' },
        pan:true,
        panLimit:true,
        cursor:'pointer',
        responsive:true,
        zoomLimit: [0,10],
        viewBox:[420,420,1650,1650]
    });
    
    
}


function verify_captcha(response){
    var secret_key = "6LeCLhETAAAAAH8koFeWonL5g_kkYrSp8gcsrRjO";
    var data = {"secret_key": secret_key, "g-recaptcha-response": response }
}

function blog_searcher(){
    $('#site_search').keyup(function(){
        if ($('#site_search').val() == ""){
            $('#search_results_stores').html('');
            $('#search_results_events').html('');
            $('#search_results_promotions').html('');
            $('#search_results_stores').hide();
            $('#search_results_events').hide();
            $('#search_results_promotions').hide();
            $('#close_search').hide();
        }
        else{
            $('#close_search').show();
            $('#search_results_stores').html('');
            $('#search_results_events').html('');
            $('#search_results_promotions').html('');
            
            var val = $(this).val().toLowerCase();
            
            results = getSearchResults(val);
            var s_stores = results.stores;
            var s_events = results.events;
            var s_promos = results.promotions;
            var h2 = "<h2 id='open_stores' class='li_open'>(" +s_stores.length + ") Stores<i class='pull-right fa fa-chevron-down'></i></h2>";
            $('#search_results_stores').append(h2);
            $.each(s_stores, function(i, v){
                var div = "<div class='blog_search_results collapse_open_stores'>";
                div = div + "<h4><a href='/stores/" + v.slug + "'>" + v.name + "</a></h4>";
                div = div + "</div>";
                $('#search_results_stores').append(div);
                $('#search_results_stores').show();
            });
            $('.li_open').click(function(){
                var collapse = ".collapse_" + $(this).attr('id');
                var collapse_js = "collapse_" + $(this).attr('id');
                console.log(collapse)
                $(collapse).slideDown('fast');
                
            })
            
            // $('.li_open').click(function(){
            //     var collapse = "#collapse_" + $(this).attr('id');
            //     var collapse_js = "collapse_" + $(this).attr('id');
            //     if (document.getElementById(collapse_js).classList.contains("open")){
            //         $(collapse).slideUp('fast');
            //         $(collapse).removeClass('open');
            //     }
            //     else{
            //         $(collapse).addClass('open');
            //         $(collapse).slideDown('fast');
            //     }
            // });
        }
    });
}








