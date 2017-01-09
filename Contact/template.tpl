<div fx:template="map" fx:name="Карта" fx:of="map" fx:b="map" fx:styled-inline>
    
    {js}
        https://api-maps.yandex.ru/2.1/?lang=ru_RU
        map.js
    {/js}
    
    
    {set $map_id = 'map-' . $infoblock.id /}
    
    {default $data_position = 'none' /}
    
    <div fx:e="spacer"></div>
    
    <div fx:e="map" id="{$map_id}">карта загружается</div>
    <div fx:aif="$data_position != 'none'" fx:e="area" fx:area-name="Данные на карте" fx:area="$map_id">

    </div>
    
</div>

<div fx:template="map_list" fx:name="С картой" fx:of="list" fx:b="map-list" fx:styled-inline>
    {js}
        https://api-maps.yandex.ru/2.1/?lang=ru_RU
        map.js
    {/js}
    
    {set $map_id = 'map-' . $infoblock.id /}
    
    <div fx:e="map-box">
        <div fx:e="map" id="{$map_id}"></div>
    </div>
    <div fx:e="list">
        {apply floxim.ui.tiles:tiles /}
    </div>
</div>

<span fx:template="contact_value" fx:b="contact-value" fx:styled="label:Стиль значения">
    {apply contact_type_value /}
</span>
    
<a fx:template="contact_type_value[$short_type == 'email']" href="mailto:{$value}">
    {$value}
</a>

<span fx:template="contact_type_value[$short_type == 'phone']">
    {$value}
</span>

<span fx:template="contact_type_value[$short_type == 'address']" data-coords="{$item.coords}">
    {$value}
</span>

<a fx:template="contact_type_value[$short_type == 'link']" href="{$value}">
    {$value}
</a>