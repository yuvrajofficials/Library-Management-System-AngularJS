CREATE TABLE `student` (
`name` varchar(50) NOT NULL,
`prn` int(11) NOT NULL,
`phone` int(11) NOT NULL,
`email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
---- Dumping data for table `student`--
INSERT INTO `student` (`name`, `prn`, `phone`, `email`) VALUES ('bbb', 2, 2222, 'C');