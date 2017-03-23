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
        $this['icon'] = 'fa globe';
    }
    
    public function _getUrl()
    {
        $val = $this['value'];
        $val = trim($val);
        if (!preg_match("~^https?://~", $val)) {
            $val = 'http://'.$val;
        }
        return $val;
    }
}