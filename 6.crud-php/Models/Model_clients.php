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

        public function getClientByName($account_id, $fullname) {
            $sql = "SELECT * FROM $this->table_name WHERE (account_id=$account_id) AND (fullname='$fullname')";
           // var_dump($sql);
            $res = $this->getDB()->query($sql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }
        
        public function getClientDetails($account_id, $client_id) {
            $sql = "SELECT * FROM $this->table_name WHERE (account_id=$account_id) AND (id='$client_id')";
           // var_dump($sql);
            $res = $this->getDB()->query($sql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }
    }

?>