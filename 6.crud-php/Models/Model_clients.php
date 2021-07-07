<?php 
    require_once("Model_crud.php");
    class Model_clients extends Model_crud
    {
       // private $table_name = "clients";
        public function __construct()
        {
            parent::__construct();
            $this->table_name= "clients";
          
        }
        
    }

?>