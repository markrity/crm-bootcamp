<?php 
    require_once("Model_crud.php");
    class Model_tags extends Model_crud
    {
       // private $table_name = "clients";
        public function __construct()
        {
            parent::__construct();
            $this->table_name= "tags";
          
        }


        public function getTags($account_id, $client_id) {
            $sql = "SELECT * FROM $this->table_name WHERE (account_id=$account_id) AND (client_id='$client_id')";
           // var_dump($sql);
            $res = $this->getDB()->query($sql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }
    }

?>