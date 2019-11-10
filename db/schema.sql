create table all_categories(
	name varchar(20) not null default "others",
    primary key(name)
);
insert into all_categories(name) values("others");


create table all_words(
	id integer not null auto_increment,
    english_word varchar(30),
    meaning varchar(100),
    full_english_meaning varchar(500) default null,
    primary key(id),
    category varchar(20) not null default "others",
    foreign key(category) 
		references all_categories(name)
        on delete cascade
);

SET foreign_key_checks = 0;
ALTER TABLE all_words CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_persian_ci;