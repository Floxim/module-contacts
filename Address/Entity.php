<?php
namespace Floxim\Contacts\Address;

use Floxim\Floxim\System\Fx as fx;

class Entity extends \Floxim\Contacts\Contact\Entity
{
    public function _getCoords()
    {
        $address = $this['address'];
        if (!$address) {
            return '';
        }
        return $address['lat'].','.$address['lon'];
    }
    
    public function fake()
    {
        parent::fake();
        $this['description'] = 'Приходите к нам в офис!';
        $this['value'] = '221b Baker Street, London, NW1 6XE, UK';
        $this['icon'] = 'fa map-marker';
    }
}