<?php
namespace Floxim\Contacts\Phone;

use Floxim\Floxim\System\Fx as fx;

class Entity extends \Floxim\Contacts\Contact\Entity
{
    public function fake()
    {
        parent::fake();
        $this['description'] = 'Горячая линия';
        $this['value'] = '8 800 2000 600';
    }
}