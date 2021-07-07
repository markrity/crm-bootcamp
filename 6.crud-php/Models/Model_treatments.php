<?php 
    require_once("Model_crud.php");

    class Model_treatments extends Model_crud
    {
       
        public function __construct()
        {
            parent::__construct();
            $this->table_name= "treatments";

        }
        
    }

?>