<?php

//single accommodation
$accom_url = $option1;

$sql = "SELECT a.`id`, a.`page_meta_data_id`, a.`from_price`, a.`gallery_id`, a.`slideshow_id`,
	a.`beds`,a.`sqm`,a.`pax`,
    pmd.`heading`, pmd.`title`, pmd.`meta_description`, pmd.`introduction`,pmd.`short_description`, pmd.`full_url`,
    pmd.`og_title`, pmd.`og_image`, pmd.`og_meta_description`, pmd.`photo`
    FROM `accommodation` a
    LEFT JOIN `page_meta_data` pmd
    ON(pmd.`id` = a.`page_meta_data_id`)
    WHERE pmd.`url` = '$option1'
    LIMIT 1";


$row = fetch_row($sql);
$ss_id =$row['slideshow_id'];
$hero_photo_pmd = $row['photo'];

if(!empty($row))
{
	@extract($row);

	$tags_arr['title']          	= $title;
	$tags_arr['mdescr']         	= $meta_description;
	$tags_arr['og_url']         	= $htmlroot.'/'.$full_url;
	$tags_arr['og_meta_description']= $og_meta_description;
	$tags_arr['og_image']       	= $og_image;
	$tags_arr['og_title']       	= $og_title;
	$tags_arr['heading']        	= ($heading) ? $heading : '';
	//$tags_arr['sub-heading']        = ($price) ? $price : '';
	$tags_arr['introduction']      	= ($introduction) ? $introduction : '';
	//$tags_arr['slideshow_view']     = ($slideshow_id) ? ''..'' : '';
	$tags_arr['beds']          		= $beds;
	$tags_arr['pax']         		= $pax;
	$tags_arr['sqm']         		= $sqm;
	$tags_arr['from_price']         = $from_price;
	$tags_arr['content']        = get_content($page_meta_data_id);
	if($og_image){
			$tags_arr['og_image'] = $og_image;
	}else if($ss_id){
		$slideshow_sql = fetch_all("SELECT `full_path`, `width`, `height`, `caption`, `alt_text`
		    FROM `photo`
		    WHERE `photo_group_id` = '{$ss_id}'
		    AND `full_path` != ''
		    ORDER BY `rank`");
		$tags_arr['og_image'] = $slideshow_sql[0][full_path];
	}else if($hero_photo_pmd){
		$tags_arr['og_image'] = $hero_photo_pmd;
	}else{
		$tags_arr['og_image']='';
	}





	
	$attached_ids  = fetch_value("SELECT GROUP_CONCAT(`feature_id`) FROM `accom_has_feature` WHERE `accom_id` = '$id'");

	$sql2 = "SELECT `name` FROM `accom_feature` WHERE `id` IN ($attached_ids) AND `status` = 'A' ORDER BY `rank`";
    $feat_arr = fetch_all($sql2);

    $feat_list = '';

    if(!empty($feat_arr))
    {
    	foreach ($feat_arr as $feat) {

    		$list .= '<li>'.$feat['name'].'</li>';
    	}
    }


	if(($sqm==0)||($sqm=='0')||($sqm=='')){
		$hidde='style="display:none;"';
	}
	if(($from_price==0)||($from_price=='0')||($from_price=='')){
		$hiddePrice='style="display:none;"';
	}else{
		$hiddePrice='';
	}
    $tags_arr['accommodation_view']  = <<<H
	  	<section class="section section--accom">
		  	<div class="container">
		  		<div class="accom--wrapper">
		            <div class="row accom--content">
		                <div class="col-xs-12 col-sm-6 col-md-4 col-icon">
							<span class="quicklink-icons__stats"> <i class="fa fa-bed"></i> {$beds}</span>
							<span class="quicklink-icons__stats"><i class="fa fa-user"></i> {$pax}</span>
							<span class="quicklink-icons__stats" $hidde><i></i>SQM {$sqm}</span>
		     			</div>
		     			<div class="col-xs-12 col-sm-6 col-md-4 col-price">
							<div class="price-quicklink" $hiddePrice>From {$currencyIconView} {$from_price} <span class="currency_text">$currencyText</span></div>
		     			</div>
	            	</div>
	        	</div>
		  		<div class="features--wrapper">
		            <div class="row features--content">
		                <div class="col-xs-12 col-md-2 col-heading">
		     				<h2 class="feature-heading">Amenities</h2>
		     			</div>
		     			<div class="col-xs-12 col-md-10 col-list">
							<ul class="features--list">
								{$list}
							</ul>
		     			</div>
	            	</div>
	        	</div>
	        </div>
    	</section>
H;
require_once 'views/nav.php';
require_once 'gallery.php';

}




?>
