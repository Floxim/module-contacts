(function() {

var bl = 'floxim--contacts--contact--map-list';

Floxim.handle('.'+bl, function(index, node) {
    
    var $node = $(node),
        $map = $('.'+bl+'__map', node),
        $map_items = $node.find('[data-coords]', $node),
        map_id = $map.attr('id'),
        points = [];
        
    $map_items.each(function() {
        var coords = $(this).data('coords').split(',');
        if (coords.length === 2) {
            coords = coords.map(function(c) {
                return c*1;
            });
            
            points.push({coords:coords,title:this.innerText});
        }
    });
    
    function get_bounds(points) {
        var tl = null,
            br = null;
        
        points.forEach(function(point) {
            var cc = point.coords;
            if (tl === null || (cc[0] < tl[0] && cc[1] < tl[1])) {
                tl = cc;
            }
            if (br === null || (cc[0] > br[0] && cc[1] > br[1])) {
                br = cc;
            }
        });
        
        return [tl, br];
    }
    
    function init() {
        var map_options = {
            center: points.length ? points[0].coords : [55.76, 37.64],
            zoom: 14
        };
        if (points.length > 1) {
            var bounds = get_bounds(points),
                map_box = $map[0].getBoundingClientRect();
            
            map_options = ymaps.util.bounds.getCenterAndZoom(bounds, [map_box.width - 20, map_box.height - 20]);
        }
        var myMap = new ymaps.Map(
            map_id, 
            map_options
        );

        myMap.behaviors.disable('scrollZoom');
        
        points.forEach(
            function(point) {
                
                var myPlacemark = new ymaps.Placemark(
                    point.coords, 
                    { 
                        balloonContent: point.title
                    }
                );

                myMap.geoObjects.add(myPlacemark);
            }
        );

        if (window.$fx) {
            $node.on(
                'fx_style_tweaked', 
                function() {
                    myMap.container.fitToViewport();
                }
            );
        }
    };
    if (typeof window.ymaps === 'undefined') {
        return;
    }
    ymaps.ready(init);
});

})();