<?php

require_once("Model.php");

class Model_clients extends Model
{
    public $table = "clients";
    public $account_id = 1;
    
    public function __construct()
    {
        parent::__construct();
    }

    public function addClient($name, $mail, $phone)
    {
        $queryData = [
            "cols" => [
                'client_name', 
                'account_id',  
                'client_mail', 
                'client_phone'
            ],
            "values" => [
                "'$name'",
                "'$this->account_id'",
                "'$mail'",
                "'$phone'"
            ],
        ];
        return $this->insertItem($queryData);
    }

    public function getAllClients()
    {   
        $queryData = [
            "where" => [
                "account_id" => $this->account_id,
            ]
        ];
        return $this->getAll($queryData, true); 
    }
}
