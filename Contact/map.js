(function() {

var bl = 'floxim--contacts--contact--map';

function handle_map(index, node) {
    
    var $node = $(node),
        $map = $('.'+bl+'__map', node),
        $map_items = $('[data-coords]'),
        map_id = $map.attr('id'),
        points = [],
        found_points = {},
        $area = $('.'+bl+'__area', node),
        map;

    $map.html('');
        
    $map_items.each(function() {
        var coords_key = $(this).data('coords'),
            coords = coords_key.split(',');
        
        if (found_points[coords_key]) {
            return;
        }
        
        if (coords.length === 2) {
            coords = coords.map(function(c) {
                return c*1;
            });
            points.push({coords:coords,title:this.innerText});
            found_points[coords_key] = true;
        }
    });
    
    function get_bounds(points) {
        if (points.length === 0) {
            points = [
                {
                    coords:[55.751406, 37.614785]
                }
            ];
        }
        if (points.length === 1) {
            var fc = points[0].coords,
                c = 0.003;
            points = [
                {coords:[fc[0] - c, fc[1] - c]},
                {coords:[fc[0] + c, fc[1] + c]}
            ];
        }
        var fp = points[0].coords,
            n = fp[0],
            s = fp[0],
            e = fp[1],
            w = fp[1];
        points.forEach(function(point) {
            var cc = point.coords;
            if (cc[0] < n) {
                n = cc[0];
            } else if (cc[0] > s) {
                s = cc[0];
            }
            if (cc[1] < w) {
                w = cc[1];
            } else if (cc[1] > e) {
                e = cc[1];
            }
        });
        
        var res =  [ [n, w], [s, e] ];
        return res;
    }
    
    function placemark(coords, color, name) {
        map.geoObjects.add(
            new ymaps.Placemark(
                coords, 
                { 
                    balloonContent: name
                },
                {
                    iconColor: color
                }
            )
        );
    }
    
     function get_options() {
         var visible = get_visible_part(),
            size = visible[0],
            margin = visible[1],
            
            bounds = get_bounds(points),
            
            map_options = ymaps.util.bounds.getCenterAndZoom(
                bounds, 
                size,
                undefined,
                {
                    margin: margin
                }
            );
        
        return map_options;
     }
    
    function init() {
        
        var map_options = get_options();
        
        
        map = new ymaps.Map(
            map_id, 
            map_options
        );

        map.behaviors.disable('scrollZoom');
        
        $map.data('map', map);
        
        points.forEach(
            function(point) {
                
                var myPlacemark = new ymaps.Placemark(
                    point.coords, 
                    { 
                        balloonContent: point.title
                    }
                );

                map.geoObjects.add(myPlacemark);
            }
        );

        var current = $.extend({}, map_options);
        
        var recount_callback = function() {
            map.container.fitToViewport();
            var options = get_options();
            if (options.zoom === current.zoom && JSON.stringify(options.center) === JSON.stringify(current.center)) {
                return;
            }
            map.setCenter(
                options.center,
                options.zoom
            );
            
            current = $.extend({}, options);
        };

        if (window.$fx) {
            $node.on(
                'fx_style_tweaked', 
                recount_callback
            );
            $('html').on(
                'fx_set_front_mode resize', 
                recount_callback
            );
        };
    };
    
    // [ [width, height], [margin, margin, margin, margin] ]
    function get_visible_part() {
        
        
        var mb = $map[0].getBoundingClientRect(),
            min_margin = 20;
        
        if ($area.length === 0) {
            return [
                [mb.width, mb.height],
                [min_margin,min_margin,min_margin,min_margin]
            ];
        }
        
        var ab = $area[0].getBoundingClientRect(),
            sides = [
                [ [mb.left, mb.top], [mb.right, ab.top] ], // top
                [ [ab.right, mb.top], [mb.right, mb.bottom] ], // right
                [ [mb.left, ab.bottom], [mb.right, mb.bottom] ], // bottom
                [ [mb.left, mb.top], [ab.left, mb.bottom] ] // left
            ],
            square = function(coords) {
                return (coords[1][0] - coords[0][0]) * (coords[1][1] - coords[0][1]);
            },
            side = sides.sort( function(a, b) {
                return square(b) - square(a);
            })[0],
            tl = side[0], // [x, y]
            br = side[1],
            size = [
                mb.width,
                mb.height
                //br[0] - tl[0],
                //br[1] - tl[1]
            ],
            margin = [
                tl[1] - mb.top,
                mb.right - br[0],
                mb.bottom - br[1],
                tl[0] - mb.left
            ].map( function(v) {
                return Math.round(Math.max(v, min_margin));
            }),
            res = [size, margin];
            
        return res;
    }
    
    if (typeof window.ymaps === 'undefined') {
        return;
    }
    ymaps.ready(init);
}

Floxim.handle('.'+bl, handle_map);

})();