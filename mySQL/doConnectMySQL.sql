-- use below query to delete database if it exists

drop database doconnect;

-- run all query below this

create database doConnect;

Use doconnect;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `authorities` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `session` bit(1) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `personalinformation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` char(1) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `answer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(1000) DEFAULT NULL,
  `is_approved` bit(1) DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8frr4bcabmmeyyu60qt7iiblo` (`question_id`),
  KEY `FKsdj8jab9t00diflkysw22k7bv` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `is_approved` bit(1) DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7rnpup7eaonh2ubt922ormoij` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `image_modal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `pic_byte` blob,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `reciever_id` int DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbrg92339h3uhu40s1pmrrwdy1` (`reciever_id`),
  KEY `FKl5tt48eo95f9i8ngbdk440nml` (`sender_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


/*
-- Query: SELECT * FROM users
LIMIT 0, 1000

-- Date: 2022-08-03 20:01
*/
INSERT INTO `users` (`id`,`active`,`authorities`,`password`,`session`,`username`) VALUES (1,true,'admin','akash',true,'akash');
INSERT INTO `users` (`id`,`active`,`authorities`,`password`,`session`,`username`) VALUES (2,true,'user','adarsh',true,'adarsh');
INSERT INTO `users` (`id`,`active`,`authorities`,`password`,`session`,`username`) VALUES (3,true,'user','rakesh',true,'rakesh');
INSERT INTO `users` (`id`,`active`,`authorities`,`password`,`session`,`username`) VALUES (4,true,'user','sonaly',true,'sonaly');
INSERT INTO `users` (`id`,`active`,`authorities`,`password`,`session`,`username`) VALUES (5,true,'user','abhishek',true,'abhishek');
INSERT INTO `users` (`id`,`active`,`authorities`,`password`,`session`,`username`) VALUES (6,true,'user','adamy',true,'adamy');
INSERT INTO `users` (`id`,`active`,`authorities`,`password`,`session`,`username`) VALUES (7,true,'user','arjun',true,'arjun');
INSERT INTO `users` (`id`,`active`,`authorities`,`password`,`session`,`username`) VALUES (8,true,'user','gaurav',true,'gaurav');
INSERT INTO `users` (`id`,`active`,`authorities`,`password`,`session`,`username`) VALUES (9,true,'user','pooja',true,'pooja');
INSERT INTO `users` (`id`,`active`,`authorities`,`password`,`session`,`username`) VALUES (10,true,'user','ayush',true,'ayush');


/*
-- Query: SELECT * FROM personalinformation
LIMIT 0, 1000

-- Date: 2022-08-03 20:04
*/
INSERT INTO `personalinformation` (`id`,`address`,`date_of_birth`,`email`,`first_name`,`gender`,`last_name`,`middle_name`,`phone`) VALUES (1,'kuchaya,Deoria',NULL,'akash967049@gmail.com','Aakash','M','Verma','','7570940648');
INSERT INTO `personalinformation` (`id`,`address`,`date_of_birth`,`email`,`first_name`,`gender`,`last_name`,`middle_name`,`phone`) VALUES (2,NULL,NULL,'adarsh@gmail.com','Adarsh','M','Singh','Kumar','2334455667');
INSERT INTO `personalinformation` (`id`,`address`,`date_of_birth`,`email`,`first_name`,`gender`,`last_name`,`middle_name`,`phone`) VALUES (3,NULL,NULL,'rakesh@gmail.com','Rakesh','F','Yadav','Kumar','2334455667');
INSERT INTO `personalinformation` (`id`,`address`,`date_of_birth`,`email`,`first_name`,`gender`,`last_name`,`middle_name`,`phone`) VALUES (4,NULL,NULL,'sonaly@gmail.com','Sonaly','F','Verma','','8115409033');
INSERT INTO `personalinformation` (`id`,`address`,`date_of_birth`,`email`,`first_name`,`gender`,`last_name`,`middle_name`,`phone`) VALUES (5,NULL,NULL,'abhishek@gmail.com','Abhishek','M','Verma','','7847584758');
INSERT INTO `personalinformation` (`id`,`address`,`date_of_birth`,`email`,`first_name`,`gender`,`last_name`,`middle_name`,`phone`) VALUES (6,'kuchaya,Deoria',NULL,'adamy@gmail.com','Adamy','O','Singh','','7570940648');
INSERT INTO `personalinformation` (`id`,`address`,`date_of_birth`,`email`,`first_name`,`gender`,`last_name`,`middle_name`,`phone`) VALUES (7,NULL,NULL,'arjun@gmail.com','Arjun','M','Singh','Kumar','2334455667');
INSERT INTO `personalinformation` (`id`,`address`,`date_of_birth`,`email`,`first_name`,`gender`,`last_name`,`middle_name`,`phone`) VALUES (8,NULL,NULL,'gaurav@gmail.com','Gaurav','M','Singh','Kumar','2334455667');
INSERT INTO `personalinformation` (`id`,`address`,`date_of_birth`,`email`,`first_name`,`gender`,`last_name`,`middle_name`,`phone`) VALUES (9,NULL,NULL,'pooja@gmail.com','Pooja','F','Tomar','','8115409033');
INSERT INTO `personalinformation` (`id`,`address`,`date_of_birth`,`email`,`first_name`,`gender`,`last_name`,`middle_name`,`phone`) VALUES (10,NULL,NULL,'ayush@gmail.com','Ayush','M','Verma','','7847584758');


/*
-- Query: SELECT * FROM question
LIMIT 0, 1000

-- Date: 2022-08-03 20:04
*/
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (1,'What is JVM? Why is Java called the "Platform Independent Programming Language”?',true,'java',1);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (2,'What are the two types of Exceptions in Java? Which are the differences between them?',true,'java',1);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (3,'What is the Difference between JDK and JRE?',true,'java',2);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (4,'What is a Servlet?',true,'java',3);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (5,'What is JDBC?',false,'java',5);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (6,'What is use Service Class?',true,'angular',7);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (7,'What is use Service Class?',true,'angular',10);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (8,'What is use Service Class?',false,'angular',9);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (9,'What is use Service Class?',true,'angular',2);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (10,'What is use Service Class?',false,'python',1);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (11,'What is use Service Class?',true,'python',4);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (12,'What is use Service Class?',true,'python',6);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (13,'What is use Service Class?',true,'python',8);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (14,'What is use Service Class?',true,'database',1);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (15,'What is use Service Class?',false,'database',5);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (16,'What is use Service Class?',true,'database',1);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (17,'What is use Service Class?',true,'database',2);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (18,'What is use Service Class?',true,'javascript',7);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (19,'What is use Service Class?',false,'javascript',4);
INSERT INTO `question` (`id`,`description`,`is_approved`,`topic`,`user_id`) VALUES (20,'What is use Service Class?',true,'javascript',9);


/*
-- Query: SELECT * FROM answer
LIMIT 0, 1000

-- Date: 2022-08-03 20:05
*/
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (1,'A Java virtual machine (JVM) is a process virtual machine that can execute Java bytecode.

Each Java source file is compiled into a bytecode file, which is executed by the JVM. Java was designed to allow application programs to be built that could be run on any platform, without having to be rewritten or recompiled by the programmer for each separate platform.

A Java virtual machine makes this possible because it is aware of the specific instruction lengths and other particularities of the underlying hardware platform.',true,1,1);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (2,'Demo Answer this is to show answer content',true,1,8);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (3,'Demo Answer this is to show answer content',true,1,10);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (4,'Java has two types of exceptions: checked exceptions and unchecked exceptions.

Unchecked exceptions do not need to be declared in a method or a constructor’s throws clause if they can be thrown by the execution of the method or the constructor, and propagate outside the method or constructor boundary.

On the other hand, checked exceptions must be declared in a method or a constructor’s throws clause.',true,2,4);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (5,'The Java Runtime Environment (JRE) is basically the Java Virtual Machine (JVM) where your Java programs are being executed. It also includes browser plugins for applet execution.

The Java Development Kit (JDK) is the full-featured Software Development Kit for Java, including the JRE, the compilers, and tools (like JavaDoc, and Java Debugger), in order for a user to develop, compile and execute Java applications.',true,3,6);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (6,'Demo Answer this is to show answer content',true,3,7);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (7,'now check with image?',true,6,1);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (8,'Demo Answer this is to show answer content',true,6,5);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (9,'Demo Answer this is to show answer content',true,7,9);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (10,'Demo Answer this is to show answer content',true,11,2);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (11,'Demo Answer this is to show answer content',true,12,1);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (12,'Demo Answer this is to show answer content',true,11,5);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (13,'Demo Answer this is to show answer content',true,12,1);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (14,'Demo Answer this is to show answer content',true,11,3);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (15,'Demo Answer this is to show answer content',true,14,8);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (16,'Demo Answer this is to show answer content',true,14,10);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (17,'Demo Answer this is to show answer content',true,14,10);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (18,'Demo Answer this is to show answer content',true,18,2);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (19,'Demo Answer this is to show answer content',true,18,4);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (20,'Java is platform independent. Because the Java compiler converts the source code to bytecode, which is Intermidiate Language. Bytecode can be executed on any platform (OS) using JVM( Java Virtual Machine). ... Platform independent language means once compiled you can execute the program on any platform (OS).',false,1,6);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (21,'JRE identifies all the helpful class libraries needed for execution, while JVM is a subclass of JRE that decodes the bytecode into machine language and other minor tasks. JVM and JRE do not participate in development processes like debugging and compiling; JDK is used for them.',false,3,6);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (22,'Demo Answer this is to show answer content for approval',false,11,1);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (23,'Demo Answer this is to show answer content for approval',false,7,2);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (24,'Demo Answer this is to show answer content for approval',false,18,4);
INSERT INTO `answer` (`id`,`description`,`is_approved`,`question_id`,`user_id`) VALUES (25,'Demo Answer this is to show answer content for approval',false,4,7);

/*
-- Query: SELECT * FROM chat
LIMIT 0, 1000

-- Date: 2022-08-03 20:06
*/
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (1,'how are you',1,2);
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (2,'hello',1,3);
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (3,'hello',1,3);
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (4,'no one talks',1,4);
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (5,'hi , I am fine',1,2);
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (6,'no wories',4,1);
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (7,'ok say what you want to say, but dont be disrecpectfull',3,1);
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (8,'hi',4,1);
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (9,'so late',4,1);
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (10,'no messages why',5,1);
INSERT INTO `chat` (`id`,`message`,`reciever_id`,`sender_id`) VALUES (11,'hi ',4,3);
