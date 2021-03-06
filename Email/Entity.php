<?php
namespace Floxim\Contacts\Email;

use Floxim\Floxim\System\Fx as fx;

class Entity extends \Floxim\Contacts\Contact\Entity
{
    public function fake($level = 0)
    {
        parent::fake($level);
        $this['description'] = 'Пишите письма!';
        $this['value'] = 'mycompany@yandex.ru';
        $this['icon'] = 'fa envelope-o';
    }
    
    public function _getUrl()
    {
        $val = $this['value'];
        return 'mailto:'.$val;
    }
            
}