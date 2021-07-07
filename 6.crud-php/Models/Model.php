<?php

require_once('constants/db_constants.php');

class Model
{
    public static $db_instance = null;
    public $table;

    public function __construct()
    {
        $this->initDB();
    }

    public function initDB()
    {
        if (self::$db_instance == null) {
            self::$db_instance = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_SCHEMA);
        }
    }

    public function getDB()
    {
        return self::$db_instance;
    }

    /**
     * Creates a sql query string and make an insert query.
     * Returns the id of the new inserted item.
     */
    protected function insertItem($queryData)
    {
        $columns = join(", ", $queryData["cols"]);
        $values = join(", ", $queryData["values"]);
        return $this->insert("INSERT INTO $this->table ($columns) VALUES ($values)");
        // return "INSERT INTO $this->table ($columns) VALUES ($values)";
    }

    /**
     * Creates a sql query string and make an select query.
     * Returns all items that match the query.
     */
    protected function getAll($queryData, $allCols=false)
    {
        if($allCols){
            $columns = "*";
        } else {
            $columns = join(", ", $queryData["cols"]);
        }
        $where = $this->buildWhere($queryData);
        return $this->select("SELECT $columns FROM $this->table $where;");   
    }

    /**
     * Create string of where clause from queryData
     */
    public function buildWhere($queryData){
        if(!empty($queryData["specialCondition"])){
            $condition = $queryData["specialCondition"];
            return "WHERE $condition";
        }

        if(!empty($queryData["where"])){
            $conditions = [];
            foreach ($queryData["where"] as $col => $value){
                array_push($conditions, "$col = $value");
            }
            return 'WHERE ' . join(" AND ", $conditions);
        } 
        return "";
    }

    /**
     * Make an insert query 
     */
    public function insert ($sql){
        $result = $this->getDB()->query($sql);
        if($result){
            return $this->getDB()->insert_id;
        }
        return -1;
    }

    /**
     * Make a select query 
     */
    public function select ($sql){
        $this->getDB()->prepare($sql);
        $query = $this->getDB()->query($sql);
        if(!$query){
            return false;
        }
        $result = $query->fetch_all(MYSQLI_ASSOC);
        return $result;
    }

}
?>
