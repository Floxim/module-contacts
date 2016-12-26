<?php
namespace Floxim\Contacts\Link;

use Floxim\Floxim\System\Fx as fx;

class Entity extends \Floxim\Contacts\Contact\Entity
{
    public function fake()
    {
        parent::fake();
        $this['description'] = 'Наш сайт';
        $this['value'] = 'http://company.com/';
    }
}