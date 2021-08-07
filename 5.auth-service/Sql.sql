CREATE TABLE `crm`.`Halls` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Capacity` INT(7) NULL,
  `BuisnessID` BIGINT(20) NOT NULL,
  `Price` INT(20) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `BuisnessID_idx` (`BuisnessID` ASC),
  CONSTRAINT `BuisnessID`
    FOREIGN KEY (`BuisnessID`)
    REFERENCES `crm`.`Buisnesses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
