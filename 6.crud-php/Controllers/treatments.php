<?php 

 
    require_once("controller.php");

    class treatments extends controller
    {
       
        public $model_class = "treatments";
        public function __construct()
        {
           parent::__construct();
           $this->field_array =["client_id", "date_time", "kind", "price", "created_at", "account_id", "user_id"];
        }




    }

?>