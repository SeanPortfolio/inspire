<?php

$gallery             = '';
$tags_arr['gallery'] = '';

if($gallery_id){


    $sql = "SELECT `full_path`,`thumb_path`,`width`,`height`,`alt_text`,`caption` FROM photo WHERE photo_group_id = '$gallery_id' ORDER BY rank ASC";

    $rows = fetch_all($sql);

    $label = fetch_value("SELECT `menu_label` FROM `photo_group` WHERE `id` = '$gallery_id'");

    $label = ($label) ? $label : 'View Photos';

    //link to gallery
    // $temp = "SELECT page_id FROM general_importantpages WHERE imppage_name = 'Gallery'";
    // $tempArray= fetch_row($temp);
    // $galleryPageID= $tempArray['page_id'];
    // $temp = "SELECT full_url FROM page_meta_data WHERE id = '$galleryPageID'";

    if(!empty($rows))
    {
        $item_index = 0;
        foreach($rows as $key => $row)
        {

            $row['w']      = $row['width'];
            $row['h']      = $row['height'];
            $row['title']  = $row['caption'];
            $rows[$key]    = $row;


            $caption       = $row['caption'];
            $photo         = $htmlroot.$row['thumb_path'];


            $gallery .= <<<HTML
                <div class="item">
                    <a href="" data-key="{$item_index}">
                        <span class="item__image" style="background-image:url({$photo})"></span>
                    </a>
                </div>
HTML;

            $item_index++;
            
        }

        $jsVars['globals']['galleryImages'] = $rows;

         $gallery = <<<HTML
            <section class="section section--warpper">
                <div class="container">
                    <div class="heading--warpper">
                        <div class="row gallery--heading">{$heading} Photo Gallery</div>
                            <div class="gallery--wrapper">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="gallery gallery-carousel" >
                                            {$gallery}
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12 hidden-lg hidden-md hidden-sm">
                                        <div class="link_gallery_page link_gallery_page--global">
                                            <!-- <a class="viewGallery" href="/gallery">View Gallery</a> -->
                                        </div>
                                    </div>
                                </div>
                             </div>
                         </div> 
                    </div>
                </div>
            </section>
HTML;


        $gallery .= <<<HTML

            <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
                <!-- Background of PhotoSwipe. 
                     It's a separate element as animating opacity is faster than rgba(). -->
                <div class="pswp__bg"></div>
                <!-- Slides wrapper with overflow:hidden. -->
                <div class="pswp__scroll-wrap">
                    <!-- Container that holds slides. 
                        PhotoSwipe keeps only 3 of them in the DOM to save memory.
                        Don't modify these 3 pswp__item elements, data is added later on. -->
                    <div class="pswp__container">
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                    </div>
                    <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
                    <div class="pswp__ui pswp__ui--hidden">
                        <div class="pswp__top-bar">
                            <!--  Controls are self-explanatory. Order can be changed. -->
                            <div class="pswp__counter"></div>
                            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                            <button class="pswp__button pswp__button--share" title="Share"></button>
                            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                            <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                            <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                            <!-- element will get class pswp__preloader--active when preloader is running -->
                            <div class="pswp__preloader">
                                <div class="pswp__preloader__icn">
                                  <div class="pswp__preloader__cut">
                                    <div class="pswp__preloader__donut"></div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                            <div class="pswp__share-tooltip"></div> 
                        </div>
                        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                        </button>
                        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                        </button>
                        <div class="pswp__caption">
                            <div class="pswp__caption__center"><p>{$caption}</p></div>
                        </div>
                    </div>
                </div>
            </div>
HTML;

$tags_arr['accommodation_view'] .= $gallery;

}

}

?>