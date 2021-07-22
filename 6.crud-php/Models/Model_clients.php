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

        public function getPic($account_id, $client_id) {
            $sql = "SELECT picFileName FROM $this->table_name WHERE (account_id=$account_id) AND (id='$client_id')";
           // var_dump($sql);
            $res = $this->getDB()->query($sql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }

        public function getBigClients($account_id) {
            $sql = "SELECT clients.fullname, sum(treatments.price) as sum1
            from treatments
            inner join clients
            on clients.id = treatments.client_id
            and treatments.account_id = $account_id
            group by treatments.client_id
            limit 5 ";
           // var_dump($sql);
            $res = $this->getDB()->query($sql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }

        // public function AddClientPic($account_id, $client_id, $pic) {
        //     $sql = "UPDATE INTO $this->table_name (`picFileName`) VALUES ($pic) WHERE (account_id=$account_id) AND (id='$client_id') ";
        //     $res = $this->getDB()->query($sql)->fetch_all(MYSQLI_ASSOC);
        //     return $res;
        // }
    }

?>