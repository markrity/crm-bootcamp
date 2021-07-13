<?php 

 
    require_once("controller.php");

    class kinds extends controller
    {
       
         public $model_class = "kinds";
        // public $field_array =["fullname", "phone", "email", "account_id"];
        
        public function __construct()
        {
           parent::__construct();
           //$this->model_class = "clients";
           $this->field_array =["name", "account_id"];

        }
        
    }

?>