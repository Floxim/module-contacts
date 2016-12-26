<?php
namespace Floxim\Contacts\Contact;

use Floxim\Floxim\System\Fx as fx;

class Entity extends \Floxim\Main\Content\Entity
{
    public function getBoxFields()
    {
        $res = parent::getBoxFields();
        $res []= array(
            'keyword' => 'value',
            'name' => 'Значение',
            'template' => 'floxim.contacts.contact:contact_value'
        );
        return $res;
    }
    
    public function getDefaultBoxFields()
    {
        return array(
            array(
                array('keyword' => 'description'),
            ),
            array(
                array('keyword' => 'value', 'template' => 'floxim.contacts.contact:contact_value')
            )
        );
    }
    
    public function prepareForLivesearch($res, $term = '')
    {
        $res['name'] = $this['value'];
        return parent::prepareForLivesearch($res, $term);
    }
}