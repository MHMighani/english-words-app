create table all_words(
	id integer not null auto_increment,
    english_word varchar(30),
    meaning varchar(100),
    primary key(id)
);

create table all_categories(
	name varchar(20) not null,
    primary key(name)
);
