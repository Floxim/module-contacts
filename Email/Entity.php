<?php
namespace Floxim\Contacts\Email;

use Floxim\Floxim\System\Fx as fx;

class Entity extends \Floxim\Contacts\Contact\Entity
{
    public function fake()
    {
        parent::fake();
        $this['description'] = 'Пишите письма!';
        $this['value'] = 'mycompany@yandex.ru';
    }
}